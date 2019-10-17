<template>
  <div>
    <Data v-on:nearest-stops="populateStops"></Data>
    <div v-for="stop in stops">
      <section>
        <Stop
          :stop="stop"
          :favorite="isFavorite(stop.node.place.gtfsId)"
          v-on:toggle-favorite="toggleFavorite"
        ></Stop>
        <Departures
          :departures="stop.node.place.stoptimesWithoutPatterns"
          :timeNow="timeNow"
          :realtime="realtime"
        ></Departures>
      </section>
    </div>
  </div>
</template>

<script>
import { geolocate } from "./Geolocate.js";
import Data from "./Data.vue";
import Departures from "./Departures.vue";
import Stop from "./Stop.vue";

export default {
  name: "Nearest",
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
      stops: [],
      timeNow: new Date()
    };
  },
  methods: {
    toggleFavorite: function(details) {
      this.$emit("toggle-favorite", details);
    },
    isFavorite(stopId) {
      return this.favoriteStops.includes(stopId);
    },
    populateStops: function(result) {
      this.stops = result;
    }
  }
};
</script>
