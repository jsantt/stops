<style scoped>
@media screen and (max-width: 599px) {
  h2 {
    display: none;
  }
}
.nearest-svg {
  fill: var(--color-blue-700);
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
          v-on:add-favorite-line="addFavoriteLine"
        ></Departures>
      </section>
    </div>
    <div v-if="stops === undefined || stops.length < 1">
      <loader-spinner class="spinner"></loader-spinner>
    </div>
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
    addFavoriteLine(details) {
      this.$emit("add-favorite-line", details);
    },
    toggleFavorite: function(details) {
      this.$emit("toggle-favorite", details);
    },
    isFavorite(stopId) {
      return this.favoriteStops.includes(stopId);
    }
  }
};
</script>
