<style scoped>
div {
  /* text-align: center;
  position: fixed;
  bottom: 3.4rem;
  left: 50%;
  transform: translate(-50%, 0);*/
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
  padding: 0.25rem;
  /*border: 1px solid lightgray;*/
  margin: 0.25rem;
  border-radius: 0.25rem;
}
</style>
<template>
  <div>
    <!--div>
    <label>
      <input
        v-model="filterValue"
        placeholder=" etsi linja"
        v-on:keyup="filter"
        type="number"
        min="0"
        inputmode="numeric"
        pattern="[0-9]*"
      />
    </label>
    <div-->

    <div>
      <a
        href="#"
        v-for="line in nearestLines"
        v-bind:key="line"
        v-on:click="populateSearchField(line)"
        >{{ line }}</a
      >

      <a v-on:click="populateSearchField('')">X</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filter-nearest",
  props: {
    nearestLines: Array
  },
  data() {
    return {
      filterValue: undefined
    };
  },
  methods: {
    filter: function() {
      this.$emit("filter-changed", this.filterValue);
    },
    populateSearchField: function(lineNumber) {
      this.filterValue = lineNumber;
      this.filter();
    },
    reset: function() {
      this.filterValue = undefined;
    }
  }
};
</script>
