<style scoped></style>
<template>
  <div>{{ time }}</div>
</template>

<script>
export default {
  name: "Clock",
  props: {
    stop: Object
  },
  data() {
    return {
      time: ""
    };
  },
  mounted: function() {
    this.startClock();
  },
  methods: {
    startClock: function() {
      setInterval(() => {
        const now = new Date();
        this.time = now.toLocaleTimeString("fi-FI");
      }, 1000);
    }
  }
};
</script>
