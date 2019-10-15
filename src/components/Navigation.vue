<template>
  <nav>
    <div>
      <TimeSwitch v-on:time-switch-clicked="$emit('time-switch-clicked')"></TimeSwitch>
    </div>
    <div>
      <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        />
      </svg>
    </div>
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
    <div>
      <Clock></Clock>
    </div>
    <div>lähellä</div>
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
  grid-template-rows: 1.6fr 1fr;
  align-items: end;
  text-align: center;
}
</style>
