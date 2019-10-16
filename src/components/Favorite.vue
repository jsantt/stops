<template>
  <div>
    <Data :favoriteStops="favoriteStops" v-on:nearest-stops="populateStops"></Data>favorites
    <div v-for="stop in stops">
      <section>
        <Stop :stop="stop" :favorite="true" v-on:toggle-favorite="removeFavorite"></Stop>
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
      stops: [],
      timeNow: new Date()
    };
  },
  methods: {
    populateStops(result) {
      this.stops = result;
    },
    removeFavorite(stopId) {
      this.$emit("remove-favorite", stopId);
    }
  }
};
</script>
