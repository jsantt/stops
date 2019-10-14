<template>
  <header>
    <h2>
      {{ stop.node.place.name }}
      <span class="secondary">
        ({{ stop.node.place.code }}) {{ stop.node.place.desc }}
      </span>
    </h2>
    <div>{{ stop.node.distance }}m</div>
    <div>
      <!--{{favorite(stop.node.place.gtfsId)}}-->
    </div>
  </header>
</template>

<script>
export default {
  name: "Stop",
  props: {
    stop: Object
  }
};
</script>
