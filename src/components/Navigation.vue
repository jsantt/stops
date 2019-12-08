<style scoped>
.above-notification {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  padding: 0.15rem 1rem;
  opacity: 1;
  transition: opacity 0.6s ease-in-out;
}
.above-notification--hidden {
  opacity: 0;
}

.bottom-sheet {
  background-color: var(--color-white);
  border: 1px solid #fff;
  box-shadow: var(--box-shadow-m);

  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;

  position: fixed;
  left: var(--space-m);
  bottom: 0;
  right: var(--space-m);

  z-index: 1;
}

nav {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: end;
  text-align: center;
}
.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  height: 100%;
  padding: 4px 0 2px 0;
}
.nearby-svg {
  fill: var(--color-blue-700);
}
.favorite-svg {
  fill: var(--color-red-500);
}
/*
@media screen and (min-width: 600px) {
  .favorite,
  .nearby {
    visibility: hidden;
  }
}*/

[selected] {
  border-bottom: 3px solid black;
}
</style>

<template>
  <div class="bottom-sheet">
    <div
      v-bind:class="{ 'above-notification--hidden': statusText === undefined }"
      class="above-notification"
    >{{ statusText }}</div>
    <slot></slot>
    <nav>
      <div class="tab">
        <TimeSwitch v-on:time-switch-clicked="$emit('time-switch-clicked')"></TimeSwitch>
        <Clock></Clock>
      </div>
      <div class="tab nearby" :selected="selectedTab === 'nearby'" v-on:click="clickNearby">
        <svg
          class="nearby-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
          />
        </svg>
        <div>lähellä</div>
      </div>
      <div class="tab favorite" :selected="selectedTab === 'favorite'" v-on:click="clickFavorite">
        <svg
          class="favorite-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
        <div>suosikit</div>
      </div>
    </nav>
  </div>
</template>

<script>
import Clock from "./Clock.vue";
import TimeSwitch from "./TimeSwitch.vue";

export default {
  name: "Navigation",
  components: {
    Clock,
    TimeSwitch
  },
  data() {
    return {
      TAB: {
        NEARBY: "nearby",
        FAVORITE: "favorite",
        STORAGE_NAME: "selectedTab"
      },
      selectedTab: "nearby",
      statusText: undefined
    };
  },
  mounted: function() {
    const tab = this.getSelectedTab();
    if (tab === this.TAB.FAVORITE) {
      this.clickFavorite();
    }
  },
  methods: {
    clickNearby: function() {
      this.$emit(this.TAB.NEARBY);
      this.setSelectedTab(this.TAB.NEARBY);
    },
    clickFavorite: function() {
      this.$emit(this.TAB.FAVORITE);
      this.setSelectedTab(this.TAB.FAVORITE);
    },
    dataUpdated: function(text) {
      this.statusText = text;
      setTimeout(() => {
        this.statusText = undefined;
      }, 3000);
    },
    getSelectedTab: function() {
      return window.localStorage.getItem(this.TAB.STORAGE_NAME);
    },
    setSelectedTab: function(name) {
      this.selectedTab = name || "nearby";
      window.localStorage.setItem(this.TAB.STORAGE_NAME, name);
    }
  }
};
</script>
