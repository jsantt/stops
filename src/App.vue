<template>
  <div id="app">
    <Schedule :realtime="realtime" />
    <Navigation v-on:time-switch-clicked="showRealtime"></Navigation>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Schedule from "./components/Schedule.vue";

export default {
  name: "app",
  components: {
    Navigation,
    Schedule
  },
  data() {
    return {
      realtime: false
    };
  },
  methods: {
    showRealtime: function() {
      console.log("clicked!!");
      this.realtime = !this.realtime;
    }
  }
};
</script>
