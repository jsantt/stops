<style scoped>
header {
  color: var(--color-blue-800);
  display: grid;
  grid-template-columns: auto 3rem 2rem;
  align-items: baseline;
  font-weight: 600;
  padding: 0 var(--space-s);
}

header.favorite {
  color: var(--color-green-900);
}

.name {
  font-family: sans-serif;
  padding-right: var(--space-m);
}
header > div {
  margin: auto 0;
  padding: var(--space-s);
}

.secondary {
  color: var(--color-secondary);
  font-size: var(--font-size-xs);
  /*text-transform: uppercase;*/
}
.favorite,
.distance {
  margin-left: auto;
}
</style>
<template>
  <header v-bind:class="{ favorite: isFavorite }">
    <div>
      <span class="name">{{ stop.name }}</span>
      <!--wbr /-->
      <br />

      <span class="secondary">
        <span class="code">{{ stop.code }}</span>
        {{ stop.desc }}
      </span>
    </div>

    <div class="distance">{{ formatDistance(stop.distance) }}</div>
    <div class="favorite">
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
    isFavorite: Boolean,
    stop: Object
  },
  components: {
    Star
  },
  methods: {
    toggleFavorite: function(selected) {
      this.$emit("toggle-favorite", {
        stopId: this.stop.gtfsId,
        selected: selected
      });
    },
    formatDistance: function(distance) {
      if (distance < 1000) {
        return `${distance}m`;
      }

      const kilometres = Math.round(distance / 100) / 10;
      return `${kilometres}km`;
    }
  }
};
</script>
