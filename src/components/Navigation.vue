<style scoped>
.bottom-sheet {
  box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.05);
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;

  max-width: var(--main-width);
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
[selected] {
  border-bottom: 3px solid black;
}
</style>

<template>
  <div class="bottom-sheet">
    <slot></slot>
    <nav>
      <div class="tab">
        <TimeSwitch
          v-on:time-switch-clicked="$emit('time-switch-clicked')"
        ></TimeSwitch>
        <Clock></Clock>
      </div>
      <div
        class="tab"
        :selected="selectedTab === 'nearby'"
        v-on:click="clickNearby"
      >
        <svg
          class="icon"
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
      <div
        class="tab"
        :selected="selectedTab === 'favorite'"
        v-on:click="clickFavorite"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
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
      selectedTab: "nearby"
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
