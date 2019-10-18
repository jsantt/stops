<template>
  <div>
    <Data :favoriteStops="favoriteStops" v-on:nearest-stops="populateStops"></Data>
    <div v-for="stop in stops">
      <section>
        <Stop
          :stop="stop"
          :favorite="isFavorite(stop.node.place.gtfsId)"
          v-on:toggle-favorite="toggleFavorite"
        ></Stop>
        <Departures :departures="stop.node.place.stoptimesWithoutPatterns" :realtime="realtime"></Departures>
      </section>
      <br />
      <br />
    </div>Vain lähistöllä olevat suosikit näkyvät
    <br />
    <br />Kaikki suosikit:
    <div v-for="favorite in favoriteStops">{{favorite}}</div>
  </div>
</template>

<script>
import { geolocate } from "./Geolocate.js";
import Data from "./Data.vue";
import Departures from "./Departures.vue";
import Stop from "./Stop.vue";

export default {
  name: "Favorite",
  props: {
    favoriteStops: Array,
    realtime: Boolean
  },
  components: {
    Data,
    Departures,
    Stop
  },
  data() {
    return {
      stops: []
    };
  },
  methods: {
    isFavorite(stopId) {
      return this.favoriteStops.includes(stopId);
    },
    populateStops(result) {
      this.stops = result;
    },
    toggleFavorite(details) {
      this.$emit("toggle-favorite", details);
    }
  }
};
</script>
