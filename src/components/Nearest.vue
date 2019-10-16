<template>
  <div>
    <Data v-on:nearest-stops="populateStops"></Data>nearest
    <div v-for="stop in stops">
      <section>
        <Stop :stop="stop" v-on:toggle-favorite="addFavorite"></Stop>
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
    addFavorite: function(stopId) {
      this.$emit("add-favorite", stopId);
    },
    populateStops: function(result) {
      this.stops = result;
    }
  }
};
</script>
