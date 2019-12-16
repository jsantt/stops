<style scoped>
section {
  --border: 1px solid lightgray;
  border-top: var(--border);
  border-bottom: var(--border);

  margin: 8rem 1rem 1rem 1rem;
  padding: var(--space-l) var(--space-m);

  text-align: center;
}

/* DARK MODE */
@media (prefers-color-scheme: dark) {
  section {
    color: var(--color-white);
  }
}

.ios-share-icon {
  stroke: #000;
  width: 32px;
  height: 32px;
  margin-bottom: -0.6rem;
}
.body {
  padding: var(--space-m) 0;
}
.body--instructions {
  text-align: left;
}

ol {
  counter-reset: counter;
  list-style: none;
  padding-left: var(--space-l);
}
ol li {
  counter-increment: counter;
}
ol li::before {
  content: counter(counter);

  display: inline-flex;
  justify-content: center;
  align-items: center;

  background-color: lightgray;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;

  line-height: 1.5;
  color: #000;

  margin-right: var(--space-m);
  position: relative;
  top: 3px;
}
.install-now-icon {
  fill: var(--color-white);
  stroke-width: 0;
  margin-bottom: -0.4rem;
}
</style>
<template>
  <section v-if="showPrompt()" id="install-prompt">
    <h2>Asenna sovellus</h2>
    <div v-if="!showInstructions" v-on:click="onInstructionClick">
      <div class="body">
        Näet pysäkkiaikataulut ja reaaliaikaiset saapumisajat entistä nopeammin
      </div>
      <s-button>
        <svg
          class="install-now-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
        <span style="color: #fff">Asenna nyt</span>
      </s-button>
    </div>
    <div v-if="showInstructions">
      <div class="body--instructions">
        <ol>
          <li>
            <!-- -->
            valitse
            <svg
              class="ios-share-icon"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              <g id="iosShare">
                <polyline
                  class="arrow"
                  stroke-width="3"
                  points="40,12 50,2 60,12"
                  fill="none"
                />
                <line
                  class="arrow-line"
                  stroke-width="3"
                  x1="50"
                  y1="2"
                  x2="50"
                  y2="45"
                />
                <polyline
                  class="rectangle"
                  stroke-width="3"
                  points="45,20 27,20 27,70 73,70 73,20 55,20"
                  fill="none"
                />
              </g>
            </svg>
            kuvake alhaalta,
          </li>
          <li>skrollaa alaspäin ja</li>
          <li>lisää kotivalikkoon</li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script>
import SButton from "./SButton.vue";

export default {
  name: "Install",
  components: {
    SButton
  },
  mounted: function() {},
  data() {
    return {
      showInstructions: false
    };
  },
  methods: {
    showPrompt: function() {
      // if launched as app
      if (navigator.standalone) {
        // eslint-disable-next-line no-undef
        firebase.analytics().setUserProperties({ "standalone-app": "true" });
        return false;
      }

      const isApple = ["iPhone", "iPad", "iPod"].includes(navigator.platform);
      const show = localStorage.getItem("prompt-install") === null;

      //localStorage.setItem("prompt-install", true);

      return isApple && show;
    },
    onInstructionClick: function() {
      this.showInstructions = true;
      window.location.href = "#install-prompt";
    }
  }
};
</script>
