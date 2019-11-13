<style scoped>
section {
  border: 3px solid lightgray;
  border-radius: 0.5rem;

  margin: 8rem 1rem 1rem 1rem;
  padding: 0.5rem;
  background-color: #d7fae1;
  text-align: center;
}
svg {
  stroke: #000;
  width: 32px;
  height: 32px;
  margin-bottom: -0.6rem;
}
.body {
  color: #002424;
  padding: 0.5rem 0;
}
.body--instructions {
  text-align: left;
}

ol {
  counter-reset: counter;
  list-style: none;
  padding-left: 1rem;
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

  margin-right: 0.5rem;
  position: relative;
  top: 3px;
}
</style>
<template>
  <section v-if="showPrompt()" id="install-prompt">
    <h2>Asenna sovellus</h2>
    <div v-if="!showInstructions">
      <div class="body">Aloitusnäytöltä näet lähtöajat kolmessa sekunnissa</div>
      <button v-on:click="onInstructionClick">Asenna nyt</button>
    </div>
    <div v-if="showInstructions">
      <div class="body--instructions">
        <ol>
          <li>
            <!-- -->
            valitse
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              <g id="iosShare">
                <polyline class="arrow" stroke-width="3" points="40,12 50,2 60,12" fill="none" />
                <line class="arrow-line" stroke-width="3" x1="50" y1="2" x2="50" y2="45" />
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
export default {
  name: "Install",
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
        return false;
      }

      const isApple = true; //["iPhone", "iPad", "iPod"].includes(navigator.platform);
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
