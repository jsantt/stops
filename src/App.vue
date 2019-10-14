<template>
  <div id="app">
    <Clock></Clock>
    <TimeSwitch v-on:time-switch-clicked="showRealtime"></TimeSwitch>
    <Schedule :realtime="realtime" />
  </div>
</template>

<script>
import Clock from "./components/Clock.vue";
import TimeSwitch from "./components/TimeSwitch.vue";
import Schedule from "./components/Schedule.vue";

export default {
  name: "app",
  components: {
    Clock,
    Schedule,
    TimeSwitch
  },
  data() {
    return {
      realtime: false
    };
  },
  methods: {
    showRealtime: function() {
      this.realtime = !this.realtime;
    }
  }
};
</script>
