<style scoped>
div {
  top: 0;
  position: fixed;
  left: 0;
  background-color: #e2e1e1;
  padding: 0.5rem 1rem;
}
</style>
<template>
  <div>{{time}}</div>
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
