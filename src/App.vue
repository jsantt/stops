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

/* DARK MODE */
@media (prefers-color-scheme: dark) {
  .instructions {
    color: var(--color-white);
  }
}
</style>

<template>
  <div id="app">
    <Data
      ref="data"
      :favoriteStops="favoriteStops"
      v-on:location-error="onLocationError"
      v-on:nearest-stops="nearestDataReceived"
      v-on:favorite-stops="favoriteDataReceived"
      v-on:finding-location="updateStatus('paikannetaan')"
      v-on:fetching-favorites="updateStatus('haetaan *')"
      v-on:fetching-nearest="updateStatus('haetaan')"
    ></Data>
    <Navigation
      class="navigation"
      ref="navigation"
      v-on:time-switch-clicked="showRealtime"
      v-on:nearby="nearbyClicked"
      v-on:favorite="favoriteClicked"
    >
      <Notification
        v-if="locationError !== undefined"
        :texts="locationError"
        v-on:open-locate-prompt="openLocatePrompt"
      ></Notification>
    </Navigation>
    <div ref="swipe" class="swipe">
      <Nearest
        class="swipe-page"
        :favoriteStops="favoriteStops"
        :realtime="realtime"
        :stops="nearestData"
        v-on:toggle-favorite="toggleFavorite"
      >
        <Filter-lines
          :allLines="nearestLines"
          :destinations="nearestDestinations"
          v-on:new-filter-value="filterNearest"
        ></Filter-lines>
      </Nearest>

      <Favorite
        class="swipe-page"
        :favoriteStops="favoriteStops"
        :realtime="realtime"
        :stops="favoriteData"
        v-on:toggle-favorite="toggleFavorite"
      >
        <Filter-lines
          :allLines="favoriteLines"
          :destinations="favoriteDestinations"
          :favorite="true"
          v-on:new-filter-value="filterFavorite"
        ></Filter-lines>
      </Favorite>
    </div>

    <footer
      v-if="
        nearestData !== undefined &&
          nearestData.length > 0 &&
          favoriteTab !== true
      "
    >
      <div class="instructions">
        <svg width="16" height="16" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" stroke="#d7fae1" stroke-width="25" fill="#94e0a9" />
        </svg>
        GPS signaaliin perustuva arvio merkitty tähdelle&nbsp;(*)
      </div>
      <div class="version">
        <Version></Version>
        <div>
          Katso myös
          <a href="https://saaennuste.fi">päivän sää</a>
          <br />
          <br />
          <br />
          <br />
        </div>
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
import Notification from "./components/Notification.vue";
import TextResizer from "./components/TextResizer.vue";
import Version from "./components/Version.vue";
import {
  filterData,
  parseDirections,
  parseLines
} from "./components/data/parseData.js";

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
      favoriteDestinations: undefined,
      favoriteLines: [],
      favoriteStops: [],
      favoriteTab: false,
      locationError: undefined,
      nearestData: [],
      nearestFilter: [],
      nearestDestinations: undefined,
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
      this.$refs.data.startPolling();
      this.locationError = undefined;
    },
    favoriteDataReceived(result) {
      this.updateStatus("päivitetty");
      this.favoriteLines = parseLines(result);
      this.favoriteDestinations = parseDirections(result);
      this.favoriteData = filterData(result, this.favoriteFilter);
    },
    filterFavorite(filter) {
      this.favoriteFilter = filter;
      this.favoriteData = filterData(this.favoriteData, filter);
    },
    filterNearest(filter) {
      this.nearestFilter = filter;
      this.nearestData = filterData(this.nearestData, filter);
    },
    nearbyClicked() {
      this.$refs.swipe.scrollTo(0, 0);
      document.querySelector("html").scrollTop = 0;
      this.favoriteTab = false;
      this.$refs.data.startPolling();
      this.locationError = undefined;
    },
    nearestDataReceived(result) {
      this.nearestLines = parseLines(result);
      this.nearestDestinations = parseDirections(result);

      this.nearestData = filterData(result, this.nearestFilter);
    },
    onLocationError(error) {
      this.locationError = error;
    },
    openLocatePrompt() {
      this.$refs.data.startPolling();
      this.locationError = undefined;
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
      this.locationError = {
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
      this.$refs.data.startPolling();
    },
    updateStatus(text) {
      this.$refs.navigation.dataUpdated(text);
    }
  }
};
</script>
