<template>
  <div id="app">
    <Data
      ref="data"
      :fetchFavorites="favoriteTab"
      :favoriteStops="favoriteStops"
      v-on:location-error="onLocationError"
      v-on:nearest-stops="populateStops"
    ></Data>
    <Nearest
      v-if="!favoriteTab"
      :favoriteStops="favoriteStops"
      :realtime="realtime"
      :stops="stops"
      v-on:toggle-favorite="toggleFavorite"
    ></Nearest>
    <Favorite
      v-if="favoriteTab"
      :favoriteStops="favoriteStops"
      :realtime="realtime"
      :stops="stops"
      v-on:toggle-favorite="toggleFavorite"
    ></Favorite>

    <Navigation
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
      stops: []
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
  },
  methods: {
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
      this.favoriteTab = false;
      this.$refs.data.startPolling();
    },
    favoriteClicked: function() {
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
      this.$refs.navigation.dataUpdated();
      this.stops = result;
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
