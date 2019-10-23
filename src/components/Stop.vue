<style scoped>
header {
  background-color: #faebd7;
  display: grid;
  grid-template-columns: auto 3rem 2rem;
  align-items: baseline;
  padding: 0 0.25rem;
}

.name {
  font-size: 24px;
  padding-right: 0.5rem;
}
header > div {
  margin: auto 0;
  padding: 0.25rem;
}

.secondary {
  color: var(--color-secondary);
  font-size: 20px;
}
.favorite,
.distance {
  margin-left: auto;
}
.code {
  font-size: 17px;
}
</style>
<template>
  <header>
    <div>
      <span class="name">{{ stop.name }}</span>
      <wbr />

      <span class="secondary">
        <span class="code">{{ stop.code }}</span>
        {{ stop.desc }}
      </span>
    </div>

    <div class="distance secondary">{{ formatDistance(stop.distance) }}</div>
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
