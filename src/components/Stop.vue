<style scoped>
header {
  background-color: #faebd7;
}
</style>
<template>
  <header>
    <h2>
      {{ stop.node.place.name }}
      <span
        class="secondary"
      >({{ stop.node.place.code }}) {{ stop.node.place.desc }}</span>
    </h2>
    <div>{{ stop.node.distance }}m</div>
    <div>
      <Star :selected="favorite" v-on:toggle="toggleFavorite"></Star>
    </div>
  </header>
</template>

<script>
import Star from "./Star.vue";

export default {
  name: "Stop",
  props: {
    favorite: Boolean,
    stop: Object
  },
  components: {
    Star
  },
  methods: {
    toggleFavorite: function(selected) {
      this.$emit("toggle-favorite", {
        stopId: this.stop.node.place.gtfsId,
        selected: selected
      });
    }
  }
};
</script>
