<style scoped>
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
.swipe-page {
  scroll-snap-align: start;
}
</style>
<template>
  <div id="app">
    <Data
      ref="data"
      :fetchFavorites="favoriteTab"
      :favoriteStops="favoriteStops"
      v-on:location-error="onLocationError"
      v-on:nearest-stops="populateStops"
      v-on:favorite-stops="populateFavorites"
    ></Data>
    <div ref="swipe" class="swipe">
      <Nearest
        class="swipe-page"
        :favoriteStops="favoriteStops"
        :realtime="realtime"
        :stops="nearestData"
        v-on:toggle-favorite="toggleFavorite"
      ></Nearest>
      <Favorite
        class="swipe-page"
        :favoriteStops="favoriteStops"
        :realtime="realtime"
        :stops="favoriteData"
        v-on:toggle-favorite="toggleFavorite"
      ></Favorite>
    </div>

    <Navigation
      ref="navigation"
      v-on:time-switch-clicked="showRealtime"
      v-on:nearby="nearbyClicked"
      v-on:favorite="favoriteClicked"
    >
      <Notification
        v-if="locationError !== undefined"
        v-on:open-locate-prompt="openLocatePrompt"
      >
        <div slot="header">{{ locationError.header }}</div>
        <div slot="body">{{ locationError.body }}</div>
        <div slot="button">{{ locationError.button }}</div>
      </Notification>
    </Navigation>
    <footer>
      *=GPS-signaaliin perusteella laskettu arvio
      <div class="version">
        <Version></Version>
      </div>
    </footer>
  </div>
</template>

<script>
import Data from "./components/Data.vue";
import Favorite from "./components/Favorite.vue";
import Navigation from "./components/Navigation.vue";
import Nearest from "./components/Nearest.vue";
import Notification from "./components/Notification.vue";
import Version from "./components/Version.vue";

export default {
  name: "app",
  components: {
    Data,
    Favorite,
    Navigation,
    Nearest,
    Notification,
    Version
  },
  data: function() {
    return {
      favoriteStops: [],
      favoriteTab: false,
      locationError: undefined,
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
      setTimeout(() => {
        let position = document.querySelector(".swipe").scrollLeft;
        if (position < 200 && this.favoriteTab === true) {
          this.nearbyClicked();
          this.$refs.navigation.setSelectedTab("nearby");
        } else if (position >= 200 && this.favoriteTab === false) {
          this.favoriteClicked();
          this.$refs.navigation.setSelectedTab("favorite");
        }
      }, 800);
    },
    openLocatePrompt: function() {
      this.$refs.data.startPolling();
    },
    toggleFavorite: function(details) {
      details.selected === true
        ? this.addFavorite(details.stopId)
        : this.removeFavorite(details.stopId);
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
    },
    favoriteClicked: function() {
      this.$refs.swipe.scrollTo(this.$refs.swipe.scrollWidth, 0);
      document.querySelector("html").scrollTop = 0;
      this.favoriteTab = true;
      this.$refs.data.startPolling();
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
      this.locationError = undefined;
    },
    populateFavorites: function(result) {
      this.$refs.navigation.dataUpdated();
      this.favoriteData = result;
      this.locationError = undefined;
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
    }
  }
};
</script>
