<style scoped>
div {
  display: flex;
  flex-wrap: wrap;
}
a {
  display: inline-block;
  background-color: var(--color-lightgray);
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
.destination-dropdown {
  margin: var(--space-s);
}
</style>
<template>
  <div v-if="allLines !== undefined && allLines.length > 0">
    <s-dropdown
      :items="destinations"
      ref="dropdown"
      v-on:new-value="destinationChanged"
      class="destination-dropdown"
      v-bind:class="{ 'selected--nearest': destinationFilterValue !== undefined && favorite !== true, 'selected--favorite': favorite === true && destinationFilterValue !== undefined }"
    ></s-dropdown>
    <a
      href="#"
      v-for="line in allLines"
      v-bind:key="line"
      v-bind:class="{ 'selected--nearest': line === filterValue && favorite !== true, 'selected--favorite': favorite === true && line === filterValue}"
      v-on:click="filterChanged(line)"
    >{{ line }}</a>
    <a
      href="#"
      v-on:click="filterChanged(undefined)"
      v-bind:class="{ 'selected--nearest': filterValue === undefined && destinationFilterValue === undefined && favorite !== true,'selected--favorite': filterValue === undefined && destinationFilterValue === undefined && favorite === true }"
    >kaikki</a>
  </div>
</template>

<script>
import SDropdown from "./SDropdown.vue";

export default {
  name: "Filter-lines",
  components: {
    SDropdown
  },
  props: {
    allLines: Array,
    destinations: Array,
    favorite: Boolean
  },
  data() {
    return {
      filterValue: undefined,
      destinationFilterValue: undefined
    };
  },
  methods: {
    destinationChanged(newDestination) {
      if (this.destinationFilterValue === newDestination) {
        this.destinationFilterValue = undefined;
        this.$refs.dropdown.reset();
      } else {
        this.destinationFilterValue = newDestination;
        this.filterValue = undefined;
      }

      this.$emit("filter-destination", newDestination);
    },
    filterChanged: function(lineNumber) {
      if (this.filterValue === lineNumber) {
        this.reset();
      } else {
        this.filterValue = lineNumber;
        this.destinationFilterValue = undefined;
        this.$refs.dropdown.reset();
      }
      this.$emit("filter-changed", this.filterValue);
    },
    reset: function() {
      this.filterValue = undefined;
      this.destinationFilterValue = undefined;
      this.$refs.dropdown.reset();
    }
  }
};
</script>
