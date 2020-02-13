<style scoped>
.swipe {
  display: grid;
  grid-template-columns: repeat(2, 100%);
  will-change: transform;
  align-content: center;

  margin: 0 var(--space-m);

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
  }
}

.swipe-page {
  scroll-snap-align: start;
}

footer {
  margin-top: var(--space-l);
  text-align: center;
}

.version {
  margin-bottom: 4rem;
}
</style>

<template>
  <div id="app">
    <Data
      ref="data"
      :favoriteStops="favoriteStops"
      v-on:departure-data="departureDataReceived"
      v-on:new-message="onNewMessage"
      v-on:finding-location="updateStatus('paikannetaan...')"
      v-on:fetching-data="updateStatus('haetaan...')"
    ></Data>
    <Navigation
      class="navigation"
      ref="navigation"
      v-on:time-switch-clicked="showRealtime"
      v-on:nearby="nearbyClicked"
      v-on:favorite="favoriteClicked"
    >
      <Notification
        v-if="message !== undefined"
        :texts="message"
        v-on:notification-button-clicked="allowLocationClicked"
      ></Notification>

      <!--Next-departure
        v-if="selectedDeparture !== undefined"
        :routeShortName="selectedDeparture.routeShortName"
        :headsign="selectedDeparture.headsign"
      ></Next-departure-->
    </Navigation>
    <div ref="swipe" class="swipe">
      <Nearest
        class="swipe-page"
        :filter="nearestFilter"
        :favoriteStops="favoriteStops"
        :lat="departureData.lan"
        :lon="departureData.lon"
        :realtime="realtime"
        :departureData="departureData.nearest"
        v-on:departure-clicked="departureClicked"
        v-on:toggle-favorite="toggleFavorite"
      >
        <Filter-lines
          :departureData="departureData.nearest"
          :lat="departureData.lat"
          :lon="departureData.lon"
          v-on:new-filter-value="filterNearest"
        ></Filter-lines>
      </Nearest>

      <Favorite
        class="swipe-page"
        :filter="favoriteFilter"
        :favoriteStops="favoriteStops"
        :lat="departureData.lan"
        :lon="departureData.lon"
        :realtime="realtime"
        :departureData="departureData.favorite"
        v-on:toggle-favorite="toggleFavorite"
      >
        <!--Filter-lines
          :favorite="true"
          :lat="departureData.lat"
          :lon="departureData.lon"
          :departureData="departureData.favorite"
          v-on:new-filter-value="filterFavorite"
        ></Filter-lines-->
      </Favorite>
    </div>

    <footer
      v-if="
        departureData.nearest !== undefined &&
          departureData.nearest.length > 0 &&
          favoriteTab === false
      "
    >
      <div class="instructions">
        <svg width="16" height="16" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" stroke="#d7fae1" stroke-width="25" fill="#94e0a9" />
        </svg>
        GPS signaaliin perustuva arvio merkitty tähdelle&nbsp;(*)
      </div>
      <div class="version">
        <Version></Version>Suunnittele reitti
        <a
          href="https://itunes.apple.com/fi/app/apple-store/id1340229182?pt=118087532&amp;ct=download-link&amp;mt=8&amp;l=fi"
        >HSL:n sovelluksessa</a>
        <br />
        <br />
      </div>
    </footer>
    <Text-resizer></Text-resizer>
  </div>
</template>

<script>
import Data from "./components/data/Data.vue";
import Favorite from "./components/Favorite.vue";
import FilterLines from "./components/FilterLines.vue";

import Navigation from "./components/Navigation.vue";
import Nearest from "./components/Nearest.vue";
import NextDeparture from "./components/NextDeparture.vue";

import Notification from "./components/Notification.vue";
import TextResizer from "./components/TextResizer.vue";
import Version from "./components/Version.vue";

export default {
  name: "app",
  components: {
    Data,
    Favorite,
    FilterLines,
    Navigation,
    Nearest,
    NextDeparture,
    Notification,
    TextResizer,
    Version
  },
  data: function() {
    return {
      departureData: [],
      favoriteFilter: undefined,
      favoriteStops: [],
      favoriteTab: false,
      message: undefined,
      nearestFilter: [],
      previousScrollPosition: 0,
      realtime: true,
      selectedDeparture: undefined
    };
  },
  mounted: function() {
    if (window.localStorage.getItem("locationAllowed") === null) {
      this.setAllowLocationNotification();
      this.$refs.data.startPollingDefault();
    } else {
      this.$refs.data.startPolling();
    }

    const favoritesString = window.localStorage.getItem("favoriteStops");
    if (favoritesString === null) {
      window.localStorage.setItem("favoriteStops", JSON.stringify([]));
    } else {
      this.favoriteStops = JSON.parse(favoritesString);
    }

    document
      .querySelector(".swipe")
      .addEventListener("touchend", this.swipeListener);
  },
  methods: {
    addFavorite(stopId) {
      this.favoriteStops.push(stopId);
      window.localStorage.setItem(
        "favoriteStops",
        JSON.stringify(this.favoriteStops)
      );
    },
    favoriteClicked() {
      this.$refs.swipe.scrollTo(this.$refs.swipe.scrollWidth, 0);
      document.querySelector("html").scrollTop = 0;
      this.favoriteTab = true;
      this.$refs.data.fetch();
    },
    departureClicked(event) {
      this.selectedDeparture = event;
    },
    departureDataReceived(result) {
      this.updateStatus("päivitetty");
      this.departureData = result;
    },
    filterFavorite(filter) {
      this.favoriteFilter = filter;
    },
    filterNearest(filter) {
      this.nearestFilter = filter;
    },
    nearbyClicked() {
      this.$refs.swipe.scrollTo(0, 0);
      document.querySelector("html").scrollTop = 0;
      this.favoriteTab = false;
      this.$refs.data.fetch();
    },
    onNewMessage(message) {
      this.message = message;
    },
    allowLocationClicked() {
      window.localStorage.setItem("locationAllowed", "");
      this.$refs.data.startPolling();
      this.message = undefined;
    },
    removeFavorite(stopId) {
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
    scrollEnded() {
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
    setAllowLocationNotification() {
      this.message = {
        header: "Tarvitsemme sijaintisi",
        body:
          "Jotta voimme näyttää lähimmät pysäkit. Sijaintiasi ei tallenneta mihinkään",
        button: "salli sijainti"
      };
    },
    showRealtime() {
      this.realtime = !this.realtime;
    },
    /**
     * Listen until swipe ends and select nearest / favorite tab
     */
    swipeListener() {
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
    toggleFavorite(details) {
      details.selected === true
        ? this.addFavorite(details.stopId)
        : this.removeFavorite(details.stopId);
      this.$refs.data.fetch();
    },
    updateStatus(text) {
      this.$refs.navigation.dataUpdated(text);
    }
  }
};
</script>
