<style scoped>
select {
  display: block;
  border: 0 solid #fff;

  font-family: var(--font-family);
  font-size: var(--font-size-m);
  line-height: 1;
  height: 2.2rem;
  margin-top: 0.15rem;
  padding: 0 1.4rem 0 0.8rem;
  max-width: 100%;
  box-sizing: border-box;
  border-radius: 3rem;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--color-lightgray);
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.4rem auto, 100%;
}
select:focus {
  outline: none;
}
option {
  outline: none;
  border: none;
}
</style>
<template>
  <!-- check https://github.com/shentao/vue-multiselect example https://vue-multiselect.js.org/ as alternative -->
  <select
    v-if="items !== undefined"
    v-model="selected"
    v-on:change="changed"
    ref="selectDestination"
  >
    <option hidden>Päätepysäkki</option>
    <option v-for="item in items" v-bind:key="item">{{item}}</option>
  </select>
</template>

<script>
export default {
  name: "s-dropdown",
  props: {
    items: Array
  },
  data: function() {
    return {
      selected: "Päätepysäkki"
    };
  },
  methods: {
    changed: function() {
      this.$emit("new-value", this.selected);
    },
    reset: function() {
      this.$refs.selectDestination.selectedIndex = 0;
    }
  }
};
</script>