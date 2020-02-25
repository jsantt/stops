<style scoped>
.tag-container {
  display: flex;
  flex-wrap: wrap;
  padding: var(--space-s) 0;
  width: 100%;
}
.tag-container__footer {
  justify-content: space-evenly;
}

.right {
  margin-left: auto;
}
.wide {
  width: 100%;
}

.add-filter {
  color: var(--color-red-500);
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-xs);
}

.gray-background {
  background-color: var(--color-gray-300);
}

.all-filters {
  margin: var(--space-m) 0 var(--space-m) 0;
}

.route {
  color: var(--color-blue-800);
}

.coordinates {
  color: var(--color-gray-500);
  font-size: var(--font-size-s);
}
.edit-info {
  font-size: var(--font-size-s);
  padding: var(--space-l) 0;
  text-align: center;
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
.wide {
  width: 100%;
}
</style>
<template>
  <div class="filter-lines">
    <Icons></Icons>
    <div class="filter-tag">
      <tag-accordion
        v-on:opened="toggleLineAccordion()"
        :open="lineAccordionOpen"
        ref="lineAccordion"
      >
        <template slot="header">
          <div class="add-filter">LINJA</div>
        </template>

        <template slot="body">
          <div class="gray-background">
            <!-- PHASE 1 of select line + direction-->
            <div v-if="lineFilterValue === undefined" class="tag-container">
              <div
                v-for="line in allLineTags"
                v-bind:key="line.routeShortName + line.headsign"
                v-on:click="lineSelected(line)"
              >
                <tag :icon="line.mode">{{ line.routeShortName }}</tag>
              </div>
            </div>

            <!-- PHASE 2 of select line + direction -->
            <div v-if="lineFilterValue !== undefined" class="tag-container">
              <tag
                :tagSelected="true"
                :icon="lineFilterValue.mode"
              >{{ lineFilterValue.routeShortName }}</tag>
              <div
                v-for="direction in filteredDirections(
                  lineFilterValue,
                  allDirectionTags
                )"
                v-bind:key="direction.routeShortName + direction.headsign"
                v-on:click="addLineOrDirection(direction)"
              >
                <tag>{{ direction.headsign }}</tag>
              </div>
            </div>
            <div class="tag-container" @click="toggleLineAccordion()">
              <tag type="wide">SULJE</tag>
            </div>
          </div>
        </template>
      </tag-accordion>
      <tag-accordion
        v-on:opened="toggleDirectionAccordion()"
        :open="directionAccordionOpen"
        ref="lineAccordion"
      >
        <template slot="header">
          <div class="add-filter">SUUNTA</div>
        </template>
        <template slot="body">
          <div class="gray-background">
            <div class="tag-container">
              <tag
                v-for="direction in removeDirectionDuplicates(allDirectionTags)"
                v-bind:key="direction.routeShortName + direction.headsign"
                v-on:click="addLineOrDirection(direction)"
                type="wide-left"
                icon="direction"
              >
                <span v-on:click="addLineOrDirection(direction)">
                  {{
                  direction.headsign
                  }}
                </span>
              </tag>
            </div>
            <div class="tag-container" @click="toggleDirectionAccordion()">
              <tag type="wide">SULJE</tag>
            </div>
          </div>
        </template>
      </tag-accordion>
    </div>
    <div
      v-if="allDirectionTags !== undefined"
      class="tag-container all-filters"
      v-bind:class="{ 'gray-background': editingFilters === true }"
    >
      <tag
        v-for="filter in hideEmptyFilters(allFilters, allDirectionTags)"
        v-bind:key="filter.routeShortName + filter.headsign"
        v-on:click.native="toggleFilter(filter)"
        :icon="filter.mode"
        :tagSelected="filter.active === true"
        :tagRemovable="editingFilters === true"
        :type="editingFilters === true ? 'wide-left' : undefined"
      >
        <span class="route">
          {{ filter.routeShortName }}
          {{ filter.headsign }}
        </span>
        <span
          v-if="editingFilters === true"
          class="coordinates"
        >| {{round(filter.lat)}}, {{round(filter.lon)}}</span>
      </tag>

      <div class="tag-container tag-container__footer">
        <div v-if="allFilters.length > 0 && editingFilters === false" @click="showAll()">
          <tag :tagSelected="!hasActiveFilters()">Näytä kaikki</tag>
        </div>

        <div v-if="allFilters.length > 0 && editingFilters === false" @click="removeFilters()">
          <tag>Muokkaa</tag>
        </div>
      </div>
      <div v-if="editingFilters === true" @click="reset()" class="wide">
        <div class="edit-info">Suodattimet näkyvät 2km säteellä lisätystä paikasta</div>

        <tag type="wide">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>
          VALMIS
        </tag>
      </div>
    </div>
  </div>
</template>

<script>
import Icons from "./Icons.vue";
import TagAccordion from "./TagAccordion.vue";
import Tag from "./Tag.vue";
import { calculateDistance, formatDistance } from "./data/calculateDistance.js";
import { parseLines, parseDirections } from "./data/parseData.js";

export default {
  name: "filter-lines",
  components: {
    Icons,
    Tag,
    TagAccordion
  },
  props: {
    favorite: Boolean,
    lat: Number,
    lon: Number,
    departureData: Array
  },
  computed: {
    allLineTags: function() {
      if (this.departureData === undefined) {
        return;
      }
      return parseLines(this.departureData);
    },
    allDirectionTags: function() {
      if (this.departureData === undefined) {
        return;
      }
      return parseDirections(this.departureData);
    }
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
    this.notify();
  },
  methods: {
    addFilter(line, direction) {
      const copy = [...this.allFilters];
      const item =
        line === undefined
          ? {
              type: "direction",
              active: true,
              headsign: direction.headsign,
              lat: this.lat,
              lon: this.lon,
              mode: "direction"
            }
          : {
              type: "line",
              active: true,
              headsign: direction.headsign,
              lat: line.lat,
              lon: line.lon,
              routeShortName: line.routeShortName,
              mode: line.mode
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
      const filterLimit = 2000; //2000m

      if (this.editingFilters || directions === undefined) {
        return allFilters;
      }

      return allFilters.filter(filter => {
        return directions.some(direction => {
          const distance = formatDistance(
            calculateDistance(filter.lat, filter.lon, this.lat, this.lon)
          );

          if (filter.type === "direction") {
            return (
              filter.headsign === direction.headsign && distance < filterLimit
            );
          } else {
            return (
              filter.routeShortName === direction.routeShortName &&
              filter.headsign === direction.headsign &&
              distance < filterLimit
            );
          }
        });
      });
    },
    toggleLineAccordion() {
      if (this.lineAccordionOpen === false) {
        this.lineAccordionOpen = true;
        this.directionAccordionOpen = false;
        this.editingFilters = false;
      } else {
        this.reset();
      }
    },
    toggleDirectionAccordion() {
      if (this.directionAccordionOpen === false) {
        this.directionAccordionOpen = true;
        this.lineAccordionOpen = false;
        this.editingFilters = false;
      } else {
        this.reset();
      }
    },
    addLineOrDirection(newDirection) {
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
    lineSelected: function(line) {
      this.lineFilterValue = line;
    },
    removeFilters() {
      this.reset();
      this.editingFilters = true;
    },
    removeFilter(filter) {
      const copy = [...this.allFilters];
      return copy.filter(original => {
        return (
          original.headsign !== filter.headsign ||
          original.routeShortName !== filter.routeShortName ||
          original.lat !== filter.lat ||
          original.lon !== filter.lon
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

      this.notify();
    },
    notify() {
      this.$emit(
        "new-filter-value",
        this.hideEmptyFilters(this.allFilters, this.allDirectionTags)
      );
    },
    round(coordinate) {
      return Math.round(coordinate * 1000) / 1000;
    }
  }
};
</script>
