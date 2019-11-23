<style scoped>
a {
  padding: 0.5rem;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
<template>
  <a v-on:click="resize()">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <path id="a" d="M24 24H0V0h24v24z" />
      </defs>
      <clipPath id="b">
        <use xlink:href="#a" overflow="visible" />
      </clipPath>
      <path clip-path="url(#b)" d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z" />
    </svg>
  </a>
</template>

<script>
export default {
  name: "Text-resizer",
  data: function() {
    return {
      fontSize: 100
    };
  },
  methods: {
    resize: function() {
      this.fontSize += 15;
      if (this.fontSize > 166) {
        this.fontSize = 100;
      }
      document.querySelector("html").style.fontSize = `${this.fontSize}%`;
    }
  }
};
</script>
