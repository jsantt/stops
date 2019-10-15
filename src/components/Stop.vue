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
      <Star v-on:click="$emit('stop-selected', stop.node.place.gtfsId)"></Star>
    </div>
  </header>
</template>

<script>
import Star from "./Star.vue";
export default {
  name: "Stop",
  props: {
    stop: Object
  },
  components: {
    Star
  }
};
</script>
