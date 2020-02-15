<style scoped>
.nearest-svg {
  fill: var(--color-blue-700);
}

h2 {
  text-align: center;
  font-size: var(--font-size-l);
}

.no-results {
  text-align: center;
  margin-top: var(--space-xl);
}
</style>
<template>
  <div>
    <slot></slot>

    <div v-for="stop in filteredDepartures" v-bind:key="stop.gtfsId">
      <section
        v-if="
          stop.stoptimesWithoutPatterns !== undefined && stop.hidden !== true
        "
        v-bind:class="{ 'stop--hidden': stop.hidden === true }"
      >
        <Stop
          :stop="stop"
          :favorite="isFavorite(stop.gtfsId)"
          v-on:toggle-favorite="toggleFavorite"
        ></Stop>
        <Departures
          :departures="stop.stoptimesWithoutPatterns"
          :realtime="realtime"
          v-on:departure-clicked="departureClicked"
        ></Departures>
      </section>
    </div>
    <div v-if="departureData === undefined || departureData.length < 1">
      <loader-spinner class="spinner"></loader-spinner>
    </div>
    <div class="no-results" v-if="noResults(departureData)">Ei tuloksia</div>
  </div>
</template>

<script>
import Departures from "./Departures.vue";
import LoaderSpinner from "./LoaderSpinner.vue";
import Stop from "./Stop.vue";
import { filterData } from "./filterStops.js";

export default {
  name: "Nearest",
  props: {
    favoriteStops: Array,
    filter: Array,
    realtime: Boolean,
    departureData: Array
  },
  computed: {
    filteredDepartures: function() {
      return filterData(this.departureData, this.filter);
    }
  },
  components: {
    Departures,
    LoaderSpinner,
    Stop
  },
  methods: {
    departureClicked(event) {
      this.$emit("departure-clicked", event);
    },
    isFavorite(stopId) {
      return this.favoriteStops.includes(stopId);
    },
    noResults(stops) {
      return (
        stops !== undefined &&
        stops.length > 0 &&
        stops.every(stop => {
          return stop.hidden === true;
        })
      );
    },
    toggleFavorite: function(details) {
      this.$emit("toggle-favorite", details);
    }
  }
};
</script>
