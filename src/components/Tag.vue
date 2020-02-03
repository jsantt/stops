<style scoped>
.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  /*background-color: var(--color-white);*/
  /*border: 0.14rem solid var(--color-gray-500);*/
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
  background-color: var(--color-white);
  color: var(--color-blue-800);
  fill: var(--color-blue-800);
  border: none;
  width: 100%;
}
.transport-type {
  margin-right: var(--space-m);
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
      class="transport-type"
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

    <svg
      v-if="type === 'BUS'"
      class="transport-type"
      viewBox="0 0 1024 1024"
      width="20"
      height="20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path
        fill="rgb(255, 255, 255)"
        class="path1 fill-color14"
        d="M874.388 993.287h-716.811c-67.864 0-122.883-55.015-122.883-122.883v-716.811c0-67.864 55.015-122.883 122.883-122.883h716.811c67.864 0 122.883 55.015 122.883 122.883v716.811c0 67.868-55.018 122.883-122.883 122.883z"
      />
      <path
        fill="rgb(0, 122, 201)"
        class="path2 fill-color8"
        d="M0.033 126.799c0-69.114 57.594-126.709 126.709-126.709h767.931c71.676 0 129.27 57.594 129.27 126.709v767.931c0 71.672-57.594 129.27-129.27 129.27h-767.928c-69.114 0-126.709-57.594-126.709-129.27v-767.931zM513.268 110.16c-106.229 0-198.384 5.119-299.491 19.197-30.717 3.84-48.635 21.758-48.635 48.635v598.985c0 19.197 14.078 31.996 26.877 35.836l38.397 6.398v80.631c0 8.959 7.68 15.36 17.918 15.36h61.434c7.68 0 15.357-6.398 15.357-15.36v-71.672c49.914 6.398 117.75 8.959 185.585 8.959 69.114 0 139.508-2.558 188.146-8.959v71.672c0 8.959 8.959 15.36 16.636 15.36h61.434c10.238 0 17.918-6.398 17.918-15.36v-80.631l38.397-6.398c14.078-3.84 26.877-15.357 26.877-35.836v-598.982c0-26.877-17.918-44.795-48.635-48.635-102.393-12.799-195.823-19.2-298.216-19.2zM778.205 620.834c-72.951 12.799-168.946 25.598-262.376 25.598-98.553 0-191.983-11.517-266.216-28.156-20.476-3.84-28.156-11.52-28.156-28.156v-373.731c0-16.636 7.68-28.156 28.156-28.156l528.592 2.558c20.479 0 26.877 11.52 26.877 28.159v373.728c0 16.639-6.398 25.598-26.877 28.156zM241.933 723.227c1.279-16.636 16.636-31.996 34.557-31.996 17.918 0 33.275 15.357 33.275 31.996 0 19.197-15.357 34.557-33.275 34.557-19.197-1.279-34.557-16.639-34.557-34.557zM710.373 723.227c1.279-16.636 16.639-31.996 33.275-31.996 17.918 0 33.278 15.357 33.278 31.996 0 19.197-15.357 34.557-33.278 34.557-17.918-1.279-33.275-16.639-33.275-34.557z"
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
