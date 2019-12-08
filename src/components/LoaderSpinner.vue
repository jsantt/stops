<style scoped>
.loader {
  text-align: center;
}
.circular {
  animation: rotate 2s linear infinite;
  height: 100px;
  position: relative;
  width: 100px;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes rotate {
  100% {
    transform: rotate(359deg);
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -140;
  }
}
@keyframes color {
  100%,
  0% {
    stroke: var(--color-red-500);
  }
  40% {
    stroke: var(--color-blue-500);
  }
  66% {
    stroke: var(--color-green-500);
  }
  80%,
  90% {
    stroke: #ccc;
  }
}
</style>

<template>
  <div class="loader">
    <svg class="circular">
      <circle
        class="path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke-width="4"
        stroke-miterlimit="10"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "loader-spinner"
};
</script>
