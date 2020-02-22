<style scoped>
.empty-favorite {
  margin: 6rem 1rem;
  text-align: center;
}

.favorite-svg {
  fill: var(--color-red-300);
}

h3 {
  text-align: center;
  font-size: var(--font-size-m);
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
      >
        <Stop
          :isFavorite="true"
          :stop="stop"
          :favorite="isFavorite(stop.gtfsId)"
          v-on:toggle-favorite="toggleFavorite"
        ></Stop>
        <Departures
          :departures="stop.stoptimesWithoutPatterns"
          :isFavorite="true"
          :realtime="realtime"
        ></Departures>
      </section>
    </div>
    <div v-if="departureData == null || departureData.length < 1" class="empty-favorite">
      <div>
        <svg
          class="favorite-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
      <h3>Suosikkilista on tyhjä</h3>
      <div>Lisää suosikkisi lähellä näkymässä</div>
    </div>

    <div class="no-results" v-if="noResults(departureData)">Ei tuloksia</div>

    <!--Install v-if="departureData !== undefined && departureData.length > 0" :forceShow="true"></Install-->
  </div>
</template>

<script>
import Departures from "./Departures.vue";
import Install from "./Install.vue";
import Stop from "./Stop.vue";
import { filterData } from "./filterStops.js";

export default {
  name: "Favorite",
  components: {
    Departures,
    Install,
    Stop
  },
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
    toggleFavorite(details) {
      this.$emit("toggle-favorite", details);
    }
  }
};
</script>
