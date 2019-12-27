<style scoped>
.tag-container {
  display: flex;
  flex-wrap: wrap;

  padding: var(--space-s) 0;
}

.add-filter {
  color: var(--color-red-500);
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-xs);
}

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
  border: 0.14rem solid var(--color-red-300);
  background-color: var(--color-white);
}

.tag-symbol {
  margin-right: var(--space-m);
}

.tag--hidden {
  max-width: 0;
  opacity: 0;
}
.all-filters {
  margin: var(--space-m) 0;
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

.tag--removal {
  margin-left: auto;
  color: var(--color-blue-800);
  fill: var(--color-blue-800);
  border: none;
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
  <div class="filter-lines">
    <div class="filter-tag">
      <s-tag v-on:opened="addLine()" :open="lineAccordionOpen" ref="lineAccordion">
        <template slot="header">
          <div class="add-filter">LINJA / SUUNTA</div>
        </template>
        <template slot="body">
          <div>
            <!-- PHASE 1 of select line + direction -->
            <div v-if="lineFilterValue === undefined" class="tag-container">
              <a
                class="tag"
                href="#"
                v-for="line in allLines"
                v-bind:key="line.routeShortName + line.headsign"
                v-on:click="lineFilterChanged(line)"
              >{{ line.routeShortName }}</a>
            </div>
            <!-- PHASE 2 of select line + direction -->
            <div v-if="lineFilterValue !== undefined" class="tag-container">
              <div class="tag tag--selected">{{lineFilterValue.routeShortName}}</div>
              <a
                class="tag"
                href="#"
                ref="dropdown"
                v-for="destination in filteredDirections(lineFilterValue)"
                v-bind:key="destination.routeShortName + destination.headsign"
                v-on:click="directionChanged(destination)"
              >{{ destination.headsign }}</a>
            </div>
          </div>
        </template>
      </s-tag>
      <s-tag v-on:opened="addDirection()" :open="directionAccordionOpen" ref="lineAccordion">
        <template slot="header">
          <div class="add-filter">SUUNTA</div>
        </template>
        <template slot="body">
          <div>
            <div class="tag-container">
              <a
                class="tag"
                href="#"
                ref="dropdown"
                v-for="destination in destinations"
                v-bind:key="destination.routeShortName + destination.headsign"
                v-on:click="directionChanged(destination)"
              >{{ destination.headsign }}</a>
            </div>
          </div>
        </template>
      </s-tag>
    </div>
    <div class="tag-container all-filters">
      <a
        class="tag tag--filter"
        v-bind:class="{ 'tag--selected': filter.active, 'tag--removable': removingFilters === true }"
        href="#"
        v-for="filter in allFilters"
        v-bind:key="filter.routeShortName + filter.headsign"
        v-on:click="toggleFilter(filter)"
      >
        <span v-if="removingFilters">
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
        {{filter.routeShortName}}
        {{filter.headsign}}
      </a>

      <div v-if="allFilters.length > 0" class="tag tag--removal">
        <div v-if="removingFilters === false" class="removal" @click="removeFilters()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
            />
            <path fill="none" d="M0 0h24v24H0z" />
          </svg>
          MUOKKAA
        </div>
        <div v-if="removingFilters === true" class="removal removal-ready" @click="removeFilters()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>
          VALMIS
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SAccordion from "./SAccordion.vue";
import STag from "./STag.vue";
import { fileURLToPath } from "url";

export default {
  name: "filter-lines",
  components: {
    SAccordion,
    STag
  },
  props: {
    allLines: Array,
    destinations: Array,
    favorite: Boolean
  },
  data() {
    return {
      directionAccordionOpen: false,
      lineAccordionOpen: false,
      lineFilterValue: undefined,
      directionFilterValue: undefined,
      /**
       * [
       *  {
       *    headsign: destination.headsign,
       *    lat: line.lat,
       *    lon: line.lot,
       *    routeShortName: line.routeShortName,
       *    active: true
       *  },
       *  {
       *    ...
       *  }
       * ]
       */
      allFilters: [],
      //TODO: FIX filter
      sortByRouteShortName: (previous, current) => {
        if (previous.routeShortName !== current.routeShortName) {
          return previous.routeShortName < current.routeShortName ? -1 : 1;
        }

        return previous.headsign < current.headsign ? -1 : 1;
      },
      removingFilters: false
    };
  },
  mounted() {
    let allFiltersString = window.localStorage.getItem("allFilters");
    if (allFiltersString == null) {
      allFiltersString = "[]";
    }
    this.allFilters = JSON.parse(allFiltersString);
  },
  methods: {
    addFilter(line, direction) {
      const copy = [...this.allFilters];

      const item =
        line === undefined
          ? {
              headsign: direction.headsign,
              active: true,
              type: "direction"
            }
          : {
              headsign: direction.headsign,
              lat: line.lat,
              lon: line.lot,
              routeShortName: line.routeShortName,
              active: true,
              type: "line"
            };

      copy.push(item);
      return copy.sort(this.sortByRouteShortName);
    },
    addLine() {
      this.lineAccordionOpen = !this.lineAccordionOpen;
      this.directionAccordionOpen = false;
    },
    addDirection() {
      this.directionAccordionOpen = !this.directionAccordionOpen;
      this.lineAccordionOpen = false;
    },
    directionChanged(newDestination) {
      // this.directionFilterValue = newDestination;
      this.lineAccordionOpen = false;
      this.allFilters = this.addFilter(this.lineFilterValue, newDestination);

      window.localStorage.setItem(
        "allFilters",
        JSON.stringify(this.allFilters)
      );
      this.$emit("new-filter-value", this.allFilters);
      this.directionAccordionOpen = false;
      this.reset();
    },
    filteredDirections(line) {
      console.log(line);
      let directions = [];

      if (
        line === undefined ||
        this.destinations === undefined ||
        this.destinations.length < 1
      ) {
        return;
      }

      this.destinations.forEach(item => {
        if (line.routeShortName === item.routeShortName) {
          directions.push({
            headsign: item.headsign
          });
        }
      });

      return directions;
    },
    lineFilterChanged: function(line) {
      if (this.lineFilterValue === line) {
      } else {
        this.lineFilterValue = line;
        this.directionFilterValue = line.headsign;
      }
    },
    removeFilters() {
      this.removingFilters = !this.removingFilters;
    },
    removeFilter(filter) {
      const copy = [...this.allFilters];
      return copy.filter(original => {
        return (
          original.headsign !== filter.headsign ||
          original.lat !== filter.lat ||
          original.lon !== filter.lot ||
          original.routeShortName !== filter.routeShortName
        );
      });
    },
    reset: function() {
      this.lineFilterValue = undefined;
      this.directionFilterValue = undefined;
    },
    toggleFilter(filter) {
      if (this.removingFilters === true) {
        this.allFilters = this.removeFilter(filter);
        if (this.allFilters.length < 1) {
          this.removingFilters = false;
        }
        window.localStorage.setItem(
          "allFilters",
          JSON.stringify(this.allFilters)
        );
        this.$emit("new-filter-value", this.allFilters);
        return;
      }

      filter.active = !filter.active;

      window.localStorage.setItem(
        "allFilters",
        JSON.stringify(this.allFilters)
      );
      this.$emit("new-filter-value", this.allFilters);
    }
  }
};
</script>
