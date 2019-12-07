<style scoped>
.accordion {
  width: 3.1rem;
  padding: var(--space-m);
  position: absolute;
  right: 0;
  top: 0;
  fill: var(--color-gray-800);
  z-index: 2;
}
.options {
  background-color: var(--color-white);
  padding-left: var(--space-s);
}
.option {
  padding: var(--space-m) 0;
}
</style>
<template>
  <s-accordion class="accordion" :noHandle="true">
    <template slot="header">
      <a>
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
    <template slot="body">
      <div class="options">
        <div class="option" v-on:click="resize($event,90)">90%</div>
        <div class="option" v-on:click="resize($event,95)">95%</div>
        <div class="option" v-on:click="resize($event,100)">100%</div>
        <div class="option" v-on:click="resize($event,105)">105%</div>
        <div class="option" v-on:click="resize($event,110)">110%</div>
        <div class="option" v-on:click="resize($event,115)">115%</div>
        <div class="option" v-on:click="resize($event,120)">120%</div>
        <div class="option" v-on:click="resize($event,125)">125%</div>
      </div>
    </template>
  </s-accordion>
</template>

<script>
import SAccordion from "./SAccordion.vue";

export default {
  name: "Text-resizer",
  components: {
    SAccordion
  },
  data: function() {
    return {
      fontSize: 100
    };
  },
  methods: {
    resize: function(event, newSize) {
      this.fontSize = newSize;

      document.querySelector("html").style.fontSize = `${this.fontSize}%`;
    }
  }
};
</script>
