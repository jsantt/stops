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
.all-filters {
  margin: var(--space-l) 0 var(--space-m) 0;
}
.all-filters--removing {
  background-color: var(--color-gray-300);
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
/*
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
*/
</style>
<template>
  <div class="filter-lines">
    <div class="filter-tag">
      <s-tag
        v-on:opened="toggleLine()"
        :open="lineAccordionOpen"
        ref="lineAccordion"
      >
        <template slot="header">
          <div class="add-filter">LINJA</div>
        </template>
        <template slot="body">
          <div class="all-filters--removing">
            <!-- PHASE 1 of select line + direction -->
            <div v-if="lineFilterValue === undefined" class="tag-container">
              <a
                class="tag"
                href="#"
                v-for="line in lines"
                v-bind:key="line.routeShortName + line.headsign"
                v-on:click="lineFilterChanged(line)"
                >{{ line.routeShortName }}</a
              >
            </div>
            <!-- PHASE 2 of select line + direction -->
            <div v-if="lineFilterValue !== undefined" class="tag-container">
              <div class="tag tag--selected">
                {{ lineFilterValue.routeShortName }}
              </div>
              <a
                class="tag"
                href="#"
                ref="dropdown"
                v-for="direction in filteredDirections(
                  lineFilterValue,
                  directions
                )"
                v-bind:key="direction.routeShortName + direction.headsign"
                v-on:click="directionChanged(direction)"
                >{{ direction.headsign }}</a
              >
            </div>
            <div class="tag-container">
              <div
                class="tag tag--wide"
                v-bind:class="{ 'tag--wide': lineFilterValue !== undefined }"
                @click="toggleLine()"
              >
                SULJE
              </div>
            </div>
          </div>
        </template>
      </s-tag>
      <s-tag
        v-on:opened="toggleDirection()"
        :open="directionAccordionOpen"
        ref="lineAccordion"
      >
        <template slot="header">
          <div class="add-filter">SUUNTA</div>
        </template>
        <template slot="body">
          <div class="all-filters--removing">
            <div class="tag-container">
              <a
                class="tag"
                href="#"
                ref="dropdown"
                v-for="direction in removeDirectionDuplicates(directions)"
                v-bind:key="direction.routeShortName + direction.headsign"
                v-on:click="directionChanged(direction)"
                >{{ direction.headsign }}</a
              >
            </div>
            <div class="tag-container">
              <div class="tag tag--wide" @click="toggleDirection()">SULJE</div>
            </div>
          </div>
        </template>
      </s-tag>
    </div>
    <div
      class="tag-container all-filters"
      v-bind:class="{ 'all-filters--removing': editingFilters === true }"
    >
      <a
        class="tag tag--filter"
        v-bind:class="{
          'tag--selected': filter.active,
          'tag--removable': editingFilters === true
        }"
        href="#"
        v-for="filter in hideEmptyFilters(allFilters, directions)"
        v-bind:key="filter.routeShortName + filter.headsign"
        v-on:click="toggleFilter(filter)"
      >
        {{ filter.routeShortName }}
        {{ filter.headsign }}
        <span v-if="editingFilters === true">
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
      </a>

      <a
        v-if="allFilters.length > 0 && editingFilters === false"
        @click="showAll()"
        class="tag tag--filter"
        v-bind:class="{ 'tag--selected': !hasActiveFilters() }"
        href="#"
        >Näytä kaikki</a
      >

      <div
        v-if="allFilters.length > 0 && editingFilters === false"
        class="tag tag--right"
      >
        <div class="removal" @click="removeFilters()">
          <svg
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
          MUOKKAA
        </div>
      </div>
      <div
        v-if="editingFilters === true"
        class="tag tag--wide"
        @click="reset()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
        </svg>
        VALMIS
      </div>
    </div>
  </div>
</template>

<script>
import STag from "./STag.vue";

export default {
  name: "filter-lines",
  components: {
    STag
  },
  props: {
    lines: Array,
    directions: Array,
    favorite: Boolean
  },
  data() {
    return {
      directionAccordionOpen: false,
      lineAccordionOpen: false,
      lineFilterValue: undefined,
      /**
       * [
       *  {
       *    headsign: direction.headsign,
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
      //TODO: FIX sorting
      sortByRouteShortName: (previous, current) => {
        if (previous.routeShortName !== current.routeShortName) {
          return previous.routeShortName < current.routeShortName ? -1 : 1;
        }

        return previous.headsign < current.headsign ? -1 : 1;
      },
      editingFilters: false
    };
  },
  mounted() {
    this.allFilters = this.restoreFilters();
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
    hasActiveFilters() {
      return this.allFilters.some(filter => {
        return filter.active === true;
      });
    },
    hideEmptyFilters(allFilters, directions) {
      if (this.editingFilters) {
        return allFilters;
      }

      return allFilters.filter(filter => {
        return directions.some(direction => {
          if (filter.type === "direction") {
            return filter.headsign === direction.headsign;
          } else {
            return (
              filter.routeShortName === direction.routeShortName &&
              filter.headsign === direction.headsign
            );
          }
        });
      });
    },
    toggleLine() {
      if (this.lineAccordionOpen === false) {
        this.lineAccordionOpen = true;
        this.directionAccordionOpen = false;
        this.editingFilters = false;
      } else {
        this.reset();
      }
    },
    toggleDirection() {
      if (this.directionAccordionOpen === false) {
        this.directionAccordionOpen = true;
        this.lineAccordionOpen = false;
        this.editingFilters = false;
      } else {
        this.reset();
      }
    },
    directionChanged(newDirection) {
      this.lineAccordionOpen = false;
      this.allFilters = this.addFilter(this.lineFilterValue, newDirection);

      this.storeFiltersAndNotify();
      this.reset();
    },
    removeDirectionDuplicates(directions) {
      if (directions === undefined) {
        return undefined;
      }

      let newDirections = [];

      directions.forEach(item => {
        if (
          !newDirections.some(direction => {
            return direction.headsign === item.headsign;
          })
        ) {
          newDirections.push({
            headsign: item.headsign
          });
        }
      });

      return newDirections;
    },
    filteredDirections(line, directions) {
      let newDirections = [];

      if (
        line === undefined ||
        directions === undefined ||
        directions.length < 1
      ) {
        return;
      }

      directions.forEach(item => {
        if (line.routeShortName === item.routeShortName) {
          newDirections.push({
            headsign: item.headsign
          });
        }
      });

      return newDirections;
    },
    lineFilterChanged: function(line) {
      this.lineFilterValue = line;
    },
    removeFilters() {
      this.editingFilters = true;
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
    reset() {
      this.lineFilterValue = undefined;
      this.editingFilters = false;

      this.lineAccordionOpen = false;
      this.directionAccordionOpen = false;
    },
    showAll() {
      this.reset();
      this.allFilters = this.allFilters.map(filter => {
        let copy = { ...filter };
        copy.active = false;
        return copy;
      });
      this.storeFiltersAndNotify();
    },
    toggleFilter(filter) {
      if (this.editingFilters === true) {
        this.allFilters = this.removeFilter(filter);
        if (this.allFilters.length < 1) {
          this.editingFilters = false;
        }
        this.storeFiltersAndNotify();
        return;
      }

      filter.active = !filter.active;
      this.storeFiltersAndNotify();
    },
    restoreFilters() {
      const key = this.favorite === true ? "favoriteFilters" : "nearestFilters";

      let allFiltersString = window.localStorage.getItem(key);
      if (allFiltersString == null) {
        allFiltersString = "[]";
      }
      return JSON.parse(allFiltersString);
    },
    storeFiltersAndNotify() {
      const key = this.favorite === true ? "favoriteFilters" : "nearestFilters";
      window.localStorage.setItem(key, JSON.stringify(this.allFilters));

      this.$emit("new-filter-value", this.allFilters);
    }
  }
};
</script>
