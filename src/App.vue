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
    <Text-resizer></Text-resizer>
    <Navigation
      class="navigation"
      ref="navigation"
      v-on:time-switch-clicked="showRealtime"
      v-on:nearby="nearbyClicked"
      v-on:favorite="favoriteClicked"
    >
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
      v-on:nearest-stops="nearestDataReceived
"
      v-on:favorite-stops="favoriteDataReceived"
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
      >
        <Filter-lines :allLines="nearestLines" v-on:filter-changed="filterNearest"></Filter-lines>
      </Nearest>

      <Favorite
        class="swipe-page"
        :favoriteStops="favoriteStops"
        :realtime="realtime"
        :stops="favoriteData"
        v-on:toggle-favorite="toggleFavorite"
        v-on:add-favorite-line="addFavoriteLine"
      >
        <Filter-lines
          :allLines="favoriteLines"
          :favorite="true"
          v-on:filter-changed="filterFavorite"
        ></Filter-lines>
      </Favorite>
    </div>

    <footer>
      <div
        v-if="nearestData !== undefined && favoriteTab !== false"
      >*=GPS-signaaliin perusteella laskettu arvio</div>
      <div class="version">
        <Version></Version>
      </div>
    </footer>
  </div>
</template>

<script>
import Data from "./components/Data.vue";
import Favorite from "./components/Favorite.vue";
import FilterLines from "./components/FilterLines.vue";
import Navigation from "./components/Navigation.vue";
import Nearest from "./components/Nearest.vue";
import Notification from "./components/Notification.vue";
import TextResizer from "./components/TextResizer.vue";
import Version from "./components/Version.vue";
import {
  filterData,
  markFavoriteLines,
  parseLines
} from "./components/parseData.js";

export default {
  name: "app",
  components: {
    Data,
    Favorite,
    FilterLines,
    Navigation,
    Nearest,
    Notification,
    TextResizer,
    Version
  },
  data: function() {
    return {
      favoriteData: [],
      favoriteFilter: undefined,
      favoriteLines: [],
      favoriteStops: [],
      favoriteTab: false,
      locationError: undefined,
      nearestData: [],
      nearestFilter: undefined,
      nearestLines: [],
      previousScrollPosition: 0,
      realtime: true
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
    addFavoriteLine() {
      const favoriteLinesString = localStorage.getItem("favoriteLines");
      const favoriteLines = JSON.parse(favoriteLinesString);

      //markFavoriteLines(this.nearestData, favoriteLines);
      //markFavoriteLines(this.favoriteData, favoriteLines);
    },
    addFavorite: function(stopId) {
      this.favoriteStops.push(stopId);
      window.localStorage.setItem(
        "favoriteStops",
        JSON.stringify(this.favoriteStops)
      );
    },
    favoriteClicked: function() {
      this.$refs.swipe.scrollTo(this.$refs.swipe.scrollWidth, 0);
      document.querySelector("html").scrollTop = 0;
      this.favoriteTab = true;
      this.$refs.data.startPolling();
      this.locationError = undefined;
    },
    favoriteDataReceived: function(result) {
      this.updateStatus("päivitetty");
      this.favoriteLines = parseLines(result);
      this.favoriteData = filterData(result, this.favoriteFilter);
    },
    filterFavorite: function(filter) {
      this.favoriteFilter = filter;
      this.favoriteData = filterData(this.favoriteData, filter);
    },
    filterNearest: function(filter) {
      this.nearestFilter = filter;
      this.nearestData = filterData(this.nearestData, filter);
    },
    nearbyClicked: function() {
      this.$refs.swipe.scrollTo(0, 0);
      document.querySelector("html").scrollTop = 0;
      this.favoriteTab = false;
      this.$refs.data.startPolling();
      this.locationError = undefined;
    },
    nearestDataReceived: function(result) {
      this.nearestLines = parseLines(result);

      // this.addFavoriteLine();
      this.nearestData = filterData(result, this.nearestFilter);
    },
    onLocationError: function(error) {
      this.locationError = error;
    },
    openLocatePrompt: function() {
      this.$refs.data.startPolling();
      this.locationError = undefined;
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
    },
    setAllowLocationNotification: function() {
      this.locationError = {
        header: "Tarvitsemme sijaintisi",
        body:
          "Jotta voimme näyttää lähimmät pysäkit. Sijaintiasi ei tallenneta mihinkään",
        button: "salli sijainti"
      };
    },
    showRealtime: function() {
      this.realtime = !this.realtime;
    },
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
    toggleFavorite: function(details) {
      details.selected === true
        ? this.addFavorite(details.stopId)
        : this.removeFavorite(details.stopId);
      this.$refs.data.startPolling();
    },
    updateStatus: function(text) {
      this.$refs.navigation.dataUpdated(text);
    }
  }
};
</script>
