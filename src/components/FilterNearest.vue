<style scoped>
div {
  text-align: center;
  position: fixed;
  bottom: 3.4rem;
  left: 50%;
  transform: translate(-50%, 0);
}
input {
  border: none;
  box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  padding: 0.5rem;
  width: 5rem;
  border-radius: 0.5rem;
}
</style>
<template>
  <div>
    <label>
      <input v-model="filterValue" placeholder=" etsi linja" v-on:keyup="filter" type="text" />
    </label>
  </div>
</template>

<script>
export default {
  name: "Filter-nearest",
  data() {
    return {
      filterValue: undefined
    };
  },
  methods: {
    filter: function(event) {
      //this.$forceUpdate();
      this.$emit("filter-changed", this.filterValue);
    }
  }
};
</script>
