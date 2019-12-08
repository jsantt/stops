<style scoped>
.filterLines {
  margin: 0 var(--space-m) var(--space-l) var(--space-m);
}

.header-text {
  color: var(--color-red-500);
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-xs);
}

.header-value {
  margin: 0 var(--space-m);
}

svg {
  margin: 0.13rem 0 0 var(--space-l);
  padding: 0;
  vertical-align: middle;
  stroke-width: 1.5;
  stroke: var(--color-black);
}

a {
  display: inline-block;
  background-color: var(--color-gray-300);
  color: #000;
  margin: var(--space-s);
  border-radius: 2.25rem;
  padding: var(--space-m);
  text-decoration: none;
  min-width: 2.8rem;
  text-align: center;
}
.selected {
  background-color: var(--color-gray-800);
  color: var(--color-white);
}

.destination-dropdown {
  margin: var(--space-s);
}
</style>
<template>
  <div class="filterLines" v-if="allLines !== undefined && allLines.length > 0">
    <s-accordion ref="lineAccordion">
      <template slot="header">
        <div>
          <span class="header-text">LINJA</span>
          <a
            v-if="filterValue !== undefined"
            v-on:click="filterChanged(undefined)"
            class="header-value"
          >
            {{ filterValue }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <line stroke-linecap="1" y2="15.24649" x2="15.28115" y1="0.68418" x1="0.65634" />
              <line stroke-linecap="1" y2="0.68418" x2="15.34365" y1="15.24649" x1="0.59385" />
            </svg>
          </a>
        </div>
      </template>
      <template slot="body">
        <a
          href="#"
          v-for="line in allLines"
          v-bind:key="line"
          v-bind:class="{
            selected: line === filterValue && favorite !== true,
            'selected--favorite': favorite === true && line === filterValue
          }"
          v-on:click="filterChanged(line)"
        >{{ line }}</a>
      </template>
    </s-accordion>
    <s-accordion ref="directionAccordion">
      <template slot="header">
        <div class="header">
          <span class="header-text">SUUNTA</span>
          <a
            v-if="destinationFilterValue !== undefined"
            v-on:click="destinationChanged(undefined)"
            class="header-value"
          >
            {{ destinationFilterValue }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <line stroke-linecap="1" y2="15.24649" x2="15.28115" y1="0.68418" x1="0.65634" />
              <line stroke-linecap="1" y2="0.68418" x2="15.34365" y1="15.24649" x1="0.59385" />
            </svg>
          </a>
        </div>
      </template>
      <template slot="body">
        <a
          href="#"
          ref="dropdown"
          v-for="destination in destinations"
          v-bind:key="destination"
          class="destination-dropdown"
          v-bind:class="{ selected: destinationFilterValue === destination }"
          v-on:click="destinationChanged(destination)"
        >{{ destination }}</a>
      </template>
    </s-accordion>
  </div>
</template>

<script>
import SAccordion from "./SAccordion.vue";

export default {
  name: "filter-lines",
  components: {
    SAccordion
  },
  props: {
    allLines: Array,
    destinations: Array,
    favorite: Boolean
  },
  data() {
    return {
      filterValue: undefined,
      destinationFilterValue: undefined
    };
  },
  methods: {
    destinationChanged(newDestination) {
      if (this.destinationFilterValue === newDestination) {
        this.destinationFilterValue = undefined;
        this.$refs.dropdown.reset();
      } else {
        this.destinationFilterValue = newDestination;
        this.filterValue = undefined;
      }

      this.$refs.lineAccordion.close();
      this.$refs.directionAccordion.close();

      this.$emit("filter-destination", newDestination);
    },
    filterChanged: function(lineNumber) {
      if (this.filterValue === lineNumber) {
        this.reset();
      } else {
        this.filterValue = lineNumber;
        this.destinationFilterValue = undefined;
        // this.$refs.dropdown.reset();
      }

      this.$refs.lineAccordion.close();
      this.$refs.directionAccordion.close();
      this.$emit("filter-changed", this.filterValue);
    },
    reset: function() {
      this.filterValue = undefined;
      this.destinationFilterValue = undefined;
      // this.$refs.dropdown.reset();
    }
  }
};
</script>
