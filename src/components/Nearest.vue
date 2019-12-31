<style scoped>
@media screen and (max-width: 599px) {
  h2 {
    display: none;
  }
}

/* DARK MODE */
@media (prefers-color-scheme: dark) {
  h2 {
    color: var(--color-white);
  }
}

.nearest-svg {
  fill: var(--color-blue-700);
}

.no-results {
  text-align: center;
  margin-top: var(--space-xl);
}
</style>
<template>
  <div>
    <h2>
      <svg
        class="nearest-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        />
      </svg>
      <div>Lähimmät</div>
    </h2>
    <slot></slot>
    <div v-for="stop in stops" v-bind:key="stop.gtfsId">
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
        ></Departures>
      </section>
    </div>
    <div v-if="stops === undefined || stops.length < 1">
      <loader-spinner class="spinner"></loader-spinner>
    </div>
    <div class="no-results" v-if="noResults(stops)">Ei tuloksia</div>
  </div>
</template>

<script>
import Departures from "./Departures.vue";
import LoaderSpinner from "./LoaderSpinner.vue";
import Stop from "./Stop.vue";

export default {
  name: "Nearest",
  props: {
    favoriteStops: Array,
    realtime: Boolean,
    stops: Array
  },
  components: {
    Departures,
    LoaderSpinner,
    Stop
  },
  methods: {
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
