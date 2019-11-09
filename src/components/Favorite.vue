<style scoped>
.add-favorite {
  margin: 6rem 0;
  text-align: center;
}
</style>
<template>
  <div>
    <div v-for="stop in stops" v-bind:key="stop.gtfsId">
      <section>
        <Stop
          :isFavorite="true"
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
    <div class="add-favorite">Lisää suosikkisi lähellä näkymässä</div>
    <Install></Install>
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
    toggleFavorite(details) {
      this.$emit("toggle-favorite", details);
    }
  }
};
</script>
