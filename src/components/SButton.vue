<style scoped>
button {
  all: unset;
  box-sizing: border-box;

  background-color: var(--color-tertiary);
  border-radius: 4px;

  color: #fff !important;
  font-weight: 700;
  font-size: var(--font-size-m);

  text-align: center;
  text-transform: uppercase;

  margin: 0.5rem 0;
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
