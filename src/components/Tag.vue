<style scoped>
.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
  border: 0.14rem solid var(--color-gray-500);
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
  border: 0.14rem solid var(--color-blue-700);
  background-color: var(--color-white);
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
  color: var(--color-blue-800);
  fill: var(--color-blue-800);
  border: none;
  width: 100%;
}
.subway {
  fill: #ff6319;
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
      'tag--wide': type === 'wide'
    }"
    href="#"
  >
    <!-- TODO: use icons.js -->
    <svg
      v-if="type === 'SUBWAY'"
      viewBox="0 0 1024 1024"
      width="20"
      height="20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path
        class="subway"
        d="M871.036 993.287H154.225c-67.864 0-122.883-55.015-122.883-122.883V153.593c0-67.864 55.015-122.883 122.883-122.883h716.811c67.864 0 122.883 55.015 122.883 122.883v716.811c0 67.868-55.018 122.883-122.883 122.883z"
      />
      <path
        d="M732.237 401.243v-21.037c0-1.252 2.505-2.473 5.009-2.473v504.921h156.056V141.347h-230.28L518.296 647.521l-2.504 34.655h-3.788l-3.788-34.655-144.692-506.174H131.96v741.307h158.56V377.733c1.253 0 3.789 1.22 3.789 2.473v21.037l140.936 481.411h154.773l142.22-481.411z"
        fill="#fff"
      />
    </svg>

    <!--use xlink:href="#icon-subway"></use-->
    <slot></slot>
    <span v-if="tagRemovable === true">
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
    </span>

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
    type: String,
    tagRemovable: Boolean,
    tagSelected: Boolean,
    textValue: String
  }
};
</script>
