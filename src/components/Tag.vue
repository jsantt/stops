<style scoped>
.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2.25rem;
  cursor: pointer;

  font-size: var(--font-size-s);
  font-weight: 200;

  color: var(--color-gray-800);
  fill: var(--color-blue-700);
  margin: var(--space-s);
  padding: var(--space-m);

  text-decoration: none;
}

.tag--header {
  flex: 33.333% 1 1;
  display: flex;
  justify-content: center;

  color: var(--color-red-500);
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-xs);

  transition: 0.4s ease all;
  will-change: width;
}
.tag--filter {
  border: 0.14rem solid var(--color-gray-500);
  background-color: var(--color-white);
}

.tag--selected {
  background-color: var(--color-gray-300);
  border-radius: 0.15rem;
  font-weight: 800;
}

.tag-symbol {
  margin-right: var(--space-m);
}

.tag--hidden {
  max-width: 0;
  opacity: 0;
}

.all-filters .remove-icon:nth-child(2n) {
  animation-name: wobble1;
  animation-iteration-count: infinite;
  transform-origin: 50% 10%;
  animation-delay: -0.5s;
  animation-duration: 0.6s;
}

.all-filters .remove-icon:nth-child(2n-1) {
  animation-name: wobble2;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  transform-origin: 30% 5%;
  animation-delay: -0.2s;
  animation-duration: 0.5s;
}

.tag--right {
  color: var(--color-blue-800);
  fill: var(--color-blue-800);
  border: none;
  margin-left: auto;
}

.tag--wide {
  background-color: var(--color-white);
  color: var(--color-blue-800);
  fill: var(--color-blue-800);
  border: none;
  width: 100%;
}
.tag--wide-left {
  width: 100%;
  justify-content: start;
  margin: 0;
}

.transport-type {
  margin-right: var(--space-s);
}

.remove {
  margin-left: auto;
}

@keyframes wobble1 {
  0% {
    transform: rotate(-4deg);
    animation-timing-function: ease-in;
  }
  50% {
    transform: rotate(6deg);
    animation-timing-function: ease-out;
  }
}

@keyframes wobble2 {
  0% {
    transform: rotate(4deg);
    animation-timing-function: ease-in;
  }
  50% {
    transform: rotate(-6deg);
    animation-timing-function: ease-out;
  }
}
</style>

<template>
  <a
    class="tag"
    v-bind:class="{
      'tag--selected': tagSelected,
      'tag--removable': tagRemovable === true,
      'tag--filter': type === 'filter',
      'tag--right': type === 'edit',
      'tag--wide': type === 'wide',
      'tag--wide-left': type === 'wide-left'
    }"
    href="#"
  >
    <svg class="transport-type" viewBox="0 0 1024 1024" width="18" height="18">
      <use v-if="icon === 'BUS'" xlink:href="#icon-bus" />
      <use v-if="icon === 'RAIL'" xlink:href="#icon-rail" />
      <use v-if="icon === 'SUBWAY'" xlink:href="#icon-subway" />
      <use v-if="icon === 'TRAM'" xlink:href="#icon-tram" />
      <use v-if="icon === 'direction'" xlink:href="#icon-direction" />
    </svg>

    <slot></slot>

    <!-- remove icon -->
    <div class="remove" v-if="tagRemovable === true">
      <svg
        class="remove-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <path
          d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
      </svg>
    </div>

    <svg
      v-if="type === 'edit'"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
    >
      <path
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
      />
      <path fill="none" d="M0 0h24v24H0z" />
    </svg>
  </a>
</template>

<script>
export default {
  name: "tag",
  props: {
    icon: String,
    type: String,
    tagRemovable: Boolean,
    tagSelected: Boolean,
    textValue: String
  }
};
</script>
