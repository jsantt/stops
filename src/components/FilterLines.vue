<style scoped>
div {
  display: flex;
  flex-wrap: wrap;
}
input {
  border: none;
  box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  padding: 0.5rem;
  width: 5rem;
  border-radius: 0.5rem;

  -moz-appearance: textfield; /* Firefox */
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
a {
  display: inline-block;
  box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.05);
  border: 1px solid lightgray;

  color: #000;
  margin: 0.25rem;
  border-radius: 0.25rem;
  padding: 0.5rem 0;
  text-decoration: none;
  min-width: 2.8rem;
  text-align: center;
}
.selected {
  background-color: #0e0e0e;
  color: #fff;
}
</style>
<template>
  <div>
    <a
      href="#"
      v-on:click="filterChanged(undefined)"
      v-bind:class="{ 'selected': filterValue === undefined}"
    >kaikki</a>
    <a
      href="#"
      v-for="line in allLines"
      v-bind:key="line"
      v-bind:class="{ 'selected': line === filterValue}"
      v-on:click="filterChanged(line)"
    >{{ line }}</a>
  </div>
</template>

<script>
export default {
  name: "Filter-lines",
  props: {
    allLines: Array
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
