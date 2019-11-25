<style scoped>
div {
  display: flex;
  flex-wrap: wrap;
}
a {
  display: inline-block;
  background-color: var(--color-lightgray);
  box-shadow: var(--box-shadow-s);
  color: #000;
  margin: var(--space-s);
  border-radius: 2.25rem;
  padding: var(--space-m) 0;
  text-decoration: none;
  min-width: 2.8rem;
  text-align: center;
}
.selected--nearest {
  background-color: var(--color-main);
}
.selected--favorite {
  background-color: var(--color-main-favorite);
}
</style>
<template>
  <div v-if="allLines !== undefined && allLines.length > 0">
    <a
      href="#"
      v-on:click="filterChanged(undefined)"
      v-bind:class="{ 'selected--nearest': filterValue === undefined && favorite !== true,'selected--favorite': filterValue === undefined && favorite === true }"
    >kaikki</a>
    <a
      href="#"
      v-for="line in allLines"
      v-bind:key="line"
      v-bind:class="{ 'selected--nearest': line === filterValue && favorite !== true, 'selected--favorite': favorite === true && line === filterValue}"
      v-on:click="filterChanged(line)"
    >{{ line }}</a>
  </div>
</template>

<script>
export default {
  name: "Filter-lines",
  props: {
    allLines: Array,
    favorite: Boolean
  },
  data() {
    return {
      filterValue: undefined
    };
  },
  methods: {
    filterChanged: function(lineNumber) {
      if (this.filterValue === lineNumber) {
        this.filterValue = undefined;
      } else {
        this.filterValue = lineNumber;
      }
      this.$emit("filter-changed", this.filterValue);
    },
    reset: function() {
      this.filterValue = undefined;
    }
  }
};
</script>
