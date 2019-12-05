<style scoped>
@media screen and (max-width: 599px) {
  h2 {
    display: none;
  }
}

.empty-favorite {
  margin: 6rem 1rem;
  text-align: center;
}
</style>
<template>
  <div>
    <h2>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
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
          v-on:add-favorite-line="addFavoriteLine"
        ></Departures>
      </section>
    </div>
    <div v-if="stops == null || stops.length < 1" class="empty-favorite">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
      <h3>Suosikkilista on tyhjä</h3>
      <div>Lisää suosikkisi lähellä näkymässä merkitsemällä pysäkki tähdellä</div>
    </div>
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
    addFavoriteLine(details) {
      this.$emit("add-favorite-line", details);
    },
    isFavorite(stopId) {
      return this.favoriteStops.includes(stopId);
    },
    toggleFavorite(details) {
      this.$emit("toggle-favorite", details);
    }
  }
};
</script>
