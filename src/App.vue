<template>
  <div id="app">
    <Nearest v-if="!favoriteTab" :realtime="realtime" v-on:add-favorite="addFavorite"></Nearest>
    <Favorite
      v-if="favoriteTab"
      :realtime="realtime"
      :favoriteStops="favoriteStops"
      v-on:remove-favorite="removeFavorite"
    ></Favorite>
    <Navigation
      v-on:time-switch-clicked="showRealtime"
      v-on:nearby="favoriteTab = false"
      v-on:favorite="favoriteTab = true"
    ></Navigation>
  </div>
</template>

<script>
import Favorite from "./components/Favorite.vue";
import Navigation from "./components/Navigation.vue";
import Nearest from "./components/Nearest.vue";

export default {
  name: "app",
  components: {
    Favorite,
    Navigation,
    Nearest
  },
  data() {
    return {
      realtime: false,
      favoriteStops: [],
      favoriteTab: false
    };
  },
  mounted: function() {
    const favoritesString = window.localStorage.getItem("favoriteStops");
    if (favoritesString === null) {
      window.localStorage.setItem("favoriteStops", JSON.stringify([]));
    } else {
      this.favoriteStops = JSON.parse(favoritesString);
    }
  },
  methods: {
    addFavorite: function(stopId) {
      this.favoriteStops.push(stopId);
      window.localStorage.setItem(
        "favoriteStops",
        JSON.stringify(this.favoriteStops)
      );
    },
    removeFavorite: function(stopId) {
      this.favoriteStops = this.favoriteStops.filter(item => {
        return item === stopId;
      });
      window.localStorage.setItem(
        "favoriteStops",
        JSON.stringify(this.favoriteStops)
      );
    },
    showRealtime: function() {
      this.realtime = !this.realtime;
    }
  }
};
</script>
