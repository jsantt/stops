<template>
  <nav>
    <div>
      <div>
        <TimeSwitch v-on:time-switch-clicked="$emit('time-switch-clicked')"></TimeSwitch>
      </div>
      <div>
        <Clock></Clock>
      </div>
    </div>
    <div>lähimmät</div>
    <div>suosikit</div>
  </nav>
</template>

<script>
import Clock from "./Clock.vue";
import TimeSwitch from "./TimeSwitch.vue";

export default {
  name: "Navigation",
  props: {},
  components: {
    Clock,
    TimeSwitch
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
nav {

  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #eee;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: end;
  text-align: center;
}
</style>
