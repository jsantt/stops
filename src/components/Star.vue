<style scoped>
svg {
  transition: all ease-out 0.1s;
}

svg.animate {
  animation: stretch-bounce 0.5s ease-in-out;
}
@keyframes stretch-bounce {
  0% {
    -webkit-transform: scale(1);
  }
  25% {
    -webkit-transform: scale(1.3);
  }
  50% {
    -webkit-transform: scale(0.95);
  }
  75% {
    -webkit-transform: scale(1.05);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
</style>

<template>
  <a v-on:click="toggle()">
    <svg
      v-bind:class="{ animate : selected }"
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
    >
      <path
        v-show="!selected"
        fill="#a9a9a9"
        d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
      />

      <path
        v-show="selected"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  </a>
</template>

<script>
export default {
  name: "Star",
  props: {
    selected: Boolean
  },
  mounted: function() {
    //this._select = selected;
  },
  methods: {
    toggle: function() {
      this.$emit("toggle", !this.selected);
    }
  }
};
</script>
