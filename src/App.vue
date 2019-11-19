<style scoped>
@media screen and (min-width: 600px) {
  .navigation {
    display: none;
  }
}

.swipe {
  display: grid;
  grid-template-columns: repeat(2, 100%);
  will-change: transform;
  align-content: center;
  overflow-x: auto;
  scroll-snap-coordinate: 0 0;
  scroll-snap-points-x: repeat(100%);
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  overflow-y: hidden;
}

@media screen and (min-width: 600px) {
  .swipe {
    grid-template-columns: repeat(2, 49%);
    grid-gap: 1rem;
    margin: 1rem;
  }
}
.swipe-page {
  scroll-snap-align: start;
}
</style>
<template>
  <div id="app">
    <Navigation
      class="navigation"
      ref="navigation"
      v-on:time-switch-clicked="showRealtime"
      v-on:nearby="nearbyClicked"
      v-on:favorite="favoriteClicked"
    >
      <Filter-nearest v-on:filter-changed="filterByLine"></Filter-nearest>
      <Notification v-if="locationError !== undefined" v-on:open-locate-prompt="openLocatePrompt">
        <div slot="header">{{ locationError.header }}</div>
        <div slot="body">{{ locationError.body }}</div>
        <div slot="button">{{ locationError.button }}</div>
      </Notification>
    </Navigation>
    <Data
      ref="data"
      :fetchFavorites="favoriteTab"
      :favoriteStops="favoriteStops"
      v-on:location-error="onLocationError"
      v-on:nearest-stops="populateStops"
      v-on:favorite-stops="populateFavorites"
      v-on:finding-location="updateStatus('paikannetaan')"
      v-on:fetching-favorites="updateStatus('haetaan *')"
      v-on:fetching-nearest="updateStatus('haetaan')"
    ></Data>
    <div ref="swipe" class="swipe">
      <Nearest
        class="swipe-page"
        :favoriteStops="favoriteStops"
        :realtime="realtime"
        :stops="nearestData"
        v-on:toggle-favorite="toggleFavorite"
        v-on:add-favorite-line="addFavoriteLine"
      ></Nearest>

      <Favorite
        class="swipe-page"
        :favoriteStops="favoriteStops"
        :realtime="realtime"
        :stops="favoriteData"
        v-on:toggle-favorite="toggleFavorite"
        v-on:add-favorite-line="addFavoriteLine"
      ></Favorite>
    </div>

    <footer>
      <div v-if="nearestData !== undefined">*=GPS-signaaliin perusteella laskettu arvio</div>
      <div class="version">
        <Version></Version>
      </div>
    </footer>
  </div>
</template>

<script>
import Vue from "vue";
import Data from "./components/Data.vue";
import Favorite from "./components/Favorite.vue";
import FilterNearest from "./components/FilterNearest.vue";
import Navigation from "./components/Navigation.vue";
import Nearest from "./components/Nearest.vue";
import Notification from "./components/Notification.vue";
import Version from "./components/Version.vue";

export default {
  name: "app",
  components: {
    Data,
    Favorite,
    FilterNearest,
    Navigation,
    Nearest,
    Notification,
    Version
  },
  data: function() {
    return {
      favoriteStops: [],
      favoriteTab: false,
      filter: undefined,
      locationError: undefined,
      previousScrollPosition: 0,
      realtime: true,
      nearestData: [],
      favoriteData: []
    };
  },
  mounted: function() {
    const favoritesString = window.localStorage.getItem("favoriteStops");
    if (favoritesString === null) {
      window.localStorage.setItem("favoriteStops", JSON.stringify([]));
      this.setAllowLocationNotification();

      this.$refs.data.startPollingDefault({
        lat: 60.16704004097834,
        lon: 24.946832000000086
      });
    } else {
      this.favoriteStops = JSON.parse(favoritesString);
      this.openLocatePrompt();
    }

    document
      .querySelector(".swipe")
      .addEventListener("touchend", this.swipeListener);
  },
  methods: {
    /**
     * Listen until swipe ends and select nearest / favorite tab
     */
    swipeListener: function() {
      setTimeout(async () => {
        let position = document.querySelector(".swipe").scrollLeft;
        if (position < 200 && this.favoriteTab === true) {
          await this.scrollEnded();
          this.nearbyClicked();
          this.$refs.navigation.setSelectedTab("nearby");
        } else if (position >= 200 && this.favoriteTab === false) {
          await this.scrollEnded();

          this.favoriteClicked();
          this.$refs.navigation.setSelectedTab("favorite");
        }
      }, 500);
    },
    addFavoriteLine() {
      const favoriteLinesString = localStorage.getItem("favoriteLines");
      const favoriteLines = JSON.parse(favoriteLinesString);

      this.markAsFavorite(this.nearestData, favoriteLines);
      this.markAsFavorite(this.favoriteData, favoriteLines);
    },
    /**
     * data: [{stoptimesWithoutPatterns: [{headsign: 'Kivenlahti', trip: {routeShortName: '147'}}]}]
     */
    markAsFavorite(data, favoriteLines) {
      if (data === undefined) {
        return;
      }

      //const copy = { ...data };

      data.forEach(item => {
        if (item.stoptimesWithoutPatterns !== undefined) {
          item.stoptimesWithoutPatterns.forEach(departure => {
            if (favoriteLines.includes(departure.trip.routeShortName)) {
              // use Vue.set to let Vue know the change and re-render departures
              Vue.set(departure, "favorite", true);
            } else {
              Vue.set(departure, "favorite", false);
            }
          });
        }
      });
    },
    openLocatePrompt: function() {
      this.$refs.data.startPolling();
      this.locationError = undefined;
    },
    toggleFavorite: function(details) {
      details.selected === true
        ? this.addFavorite(details.stopId)
        : this.removeFavorite(details.stopId);

      this.$refs.data.startPolling();
    },
    addFavorite: function(stopId) {
      this.favoriteStops.push(stopId);
      window.localStorage.setItem(
        "favoriteStops",
        JSON.stringify(this.favoriteStops)
      );
    },
    nearbyClicked: function() {
      this.$refs.swipe.scrollTo(0, 0);
      document.querySelector("html").scrollTop = 0;
      this.favoriteTab = false;
      this.$refs.data.startPolling();
      this.locationError = undefined;
    },
    favoriteClicked: function() {
      this.$refs.swipe.scrollTo(this.$refs.swipe.scrollWidth, 0);
      document.querySelector("html").scrollTop = 0;
      this.favoriteTab = true;
      this.$refs.data.startPolling();
      this.locationError = undefined;
    },
    filterByLine: function(filter) {
      this.filter = filter;
      this.filterData(this.nearestData, filter);
    },
    filterData(data, lineNumber) {
      if (lineNumber === undefined) {
        return;
      }
      const lineLowerCase = lineNumber.toLowerCase();
      let departuresVisible;

      data.forEach(item => {
        departuresVisible = false;

        if (item.stoptimesWithoutPatterns !== undefined) {
          item.stoptimesWithoutPatterns.forEach(departure => {
            const routeLowerCase = departure.trip.routeShortName.toLowerCase();
            if (routeLowerCase.includes(lineLowerCase)) {
              // use Vue.set to let Vue know the change and re-render departures
              Vue.set(departure, "hidden", false);
              departuresVisible = true;
            } else {
              Vue.set(departure, "hidden", true);
            }
          });

          Vue.set(item, "hidden", !departuresVisible);
        }
      });
    },
    removeFavorite: function(stopId) {
      this.favoriteStops = this.favoriteStops.filter(item => {
        return item !== stopId;
      });
      window.localStorage.setItem(
        "favoriteStops",
        JSON.stringify(this.favoriteStops)
      );
    },
    populateStops: function(result) {
      this.nearestData = result;
      this.addFavoriteLine();
      this.filterData(this.nearestData, this.filter);
    },
    updateStatus: function(text) {
      this.$refs.navigation.dataUpdated(text);
    },
    populateFavorites: function(result) {
      this.updateStatus("päivitetty");
      this.favoriteData = result;
      this.addFavoriteLine();
    },
    onLocationError: function(error) {
      this.locationError = error;
    },
    showRealtime: function() {
      this.realtime = !this.realtime;
    },
    setAllowLocationNotification: function() {
      this.locationError = {
        header: "Tarvitsemme sijaintisi",
        body:
          "Jotta voimme näyttää lähimmät pysäkit. Sijaintiasi ei tallenneta mihinkään",
        button: "salli sijainti"
      };
    },
    /**
     * @returns Promise - Promise is resolved when scrolling stops
     */
    scrollEnded: function() {
      return new Promise(resolve => {
        let previousPosition = -99;
        const interval = setInterval(() => {
          let currentPosition = document.querySelector(".swipe").scrollLeft;
          if (previousPosition === currentPosition) {
            clearInterval(interval);
            resolve();
          }
          previousPosition = currentPosition;
        }, 10);
      });
    }
  }
};
</script>
