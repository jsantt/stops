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

.empty-favorite {
  margin: 6rem 1rem;
  text-align: center;
}

/* DARK MODE */
@media (prefers-color-scheme: dark) {
  .empty-favorite {
    color: var(--color-white);
  }
}

.favorite-svg {
  fill: var(--color-red-300);
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
        class="favorite-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
      <div>Suosikit</div>
    </h2>
    <slot></slot>
    <div v-for="stop in stops" v-bind:key="stop.gtfsId">
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
    <div v-if="stops == null || stops.length < 1" class="empty-favorite">
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
      <div>Lisää suosikkisi lähellä näkymässä merkitsemällä pysäkki tähdellä</div>
    </div>

    <div class="no-results" v-if="noResults(stops)">Ei tuloksia</div>

    <Install v-if="stops !== undefined && stops.length > 0"></Install>
  </div>
</template>

<script>
import Departures from "./Departures.vue";
import Install from "./Install.vue";
import Stop from "./Stop.vue";

export default {
  name: "Favorite",
  props: {
    favoriteStops: Array,
    realtime: Boolean,
    stops: Array
  },
  components: {
    Departures,
    Install,
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
    toggleFavorite(details) {
      this.$emit("toggle-favorite", details);
    }
  }
};
</script>
