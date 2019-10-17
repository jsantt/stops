<style scoped>
/* switch */
input:checked::before {
  transform: translateX(10px);
}

input:not(:checked)::before {
  right: 10px;
  transform: translateX(-10px);
}

input::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: -0.25rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.2),
    0 -1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.225s cubic-bezier(0.66, 0.04, 0, 1.005),
    background-color 0.1s ease-in;
  background: white;
}

input:checked::after {
  background: mediumseagreen;
}

input::after {
  content: "";
  display: block;
  width: 1rem;
  height: 0.5rem;
  background-color: grey;
  border-radius: 5px;
}

input {
  -moz-appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  position: relative;
  margin: 0 1rem;
  padding-bottom: 0.3rem;
}

input:disabled::before {
  background-color: darkgrey;
}
</style>

<template>
  <label class="switch">
    <input type="checkbox" @change="checkboxChanged()" />
  </label>
</template>

<script>
export default {
  name: "TimeSwitch",
  methods: {
    checkboxChanged() {
      this.$emit("time-switch-clicked");
    }
  }
};
</script>
