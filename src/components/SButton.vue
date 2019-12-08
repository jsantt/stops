<style scoped>
button {
  all: unset;
  box-sizing: border-box;

  background-color: var(--color-blue-700);
  border-radius: 4px;

  color: var(--color-black) !important;
  font-weight: 700;
  font-size: var(--font-size-m);

  text-align: center;
  text-transform: uppercase;

  margin: var(--space-m) 0;
  padding: 1rem;
  width: 100%;
}
</style>
<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "s-button"
};
</script>
