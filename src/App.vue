<template>
  <div id="app">
    <Data
      ref="data"
      :fetchFavorites="favoriteTab"
      :favoriteStops="favoriteStops"
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
      v-on:time-switch-clicked="showRealtime"
      v-on:nearby="nearbyClicked"
      v-on:favorite="favoriteClicked"
    >
      <Notification v-if="!locationSuccesful" v-on:open-locate-prompt="openLocatePrompt"></Notification>
    </Navigation>
  </div>
</template>

<script>
import Data from "./components/Data.vue";
import Favorite from "./components/Favorite.vue";
import Navigation from "./components/Navigation.vue";
import Nearest from "./components/Nearest.vue";
import Notification from "./components/Notification.vue";

export default {
  name: "app",
  components: {
    Data,
    Favorite,
    Navigation,
    Nearest,
    Notification
  },
  data: function() {
    return {
      favoriteStops: [],
      favoriteTab: false,
      locationSuccesful: true,
      realtime: true,
      stops: []
    };
  },
  mounted: function() {
    const favoritesString = window.localStorage.getItem("favoriteStops");
    if (favoritesString === null) {
      window.localStorage.setItem("favoriteStops", JSON.stringify([]));
      this.locationSuccesful = false;
    } else {
      this.favoriteStops = JSON.parse(favoritesString);
      this.locationSuccesful = false;
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
      this.$refs.data.locateAndfetch();
    },
    favoriteClicked: function() {
      this.favoriteTab = true;
      this.$refs.data.locateAndfetch();
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
      this.stops = result;
      this.locationSuccesful = true;
    },
    showRealtime: function() {
      this.realtime = !this.realtime;
    }
  }
};
</script>
