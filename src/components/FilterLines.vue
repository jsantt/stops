<style scoped>
.filter-lines {
  margin-bottom: var(--space-l);
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  background-color: var(--color-gray-300);
  /*border: 0.14rem dashed var(--color-gray-500);*/
  border-radius: 2.25rem;
  cursor: pointer;

  color: var(--color-black);
  margin: var(--space-s);
  padding: var(--space-m);

  text-decoration: none;
}

.tag--header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--color-white);
  border: 0.14rem dashed var(--color-red-500);
  font-family: var(--font-secondary);
}

.tag--selected {
  border: 0.14rem solid var(--color-blue-700);
  background-color: var(--color-white);
}
</style>
<template>
  <div class="filter-lines">
    <div class="filter-tag">
      <s-tag ref="lineAccordion">
        <template slot="header">
          <div class="tag tag--header">
            <div>LINJA</div>
            <div>
              <b>+</b>&nbsp;
            </div>
          </div>
        </template>
        <template slot="body">
          <div>
            <div v-if="lineFilterValue !== undefined" class="tag-container">
              <div class="tag tag--selected">{{lineFilterValue.routeShortName}}</div>
              <a
                class="tag"
                href="#"
                ref="dropdown"
                v-for="destination in destinations"
                v-bind:key="destination.routeShortName + destination.headsign"
                v-on:click="destinationChanged(destination)"
              >{{ destination.headsign }}</a>
            </div>
            <div v-if="lineFilterValue === undefined" class="tag-container">
              <a
                class="tag"
                href="#"
                v-for="line in allLines"
                v-bind:key="line.routeShortName + line.headsign"
                v-on:click="lineFilterChanged(line)"
              >{{ line.routeShortName }}</a>
            </div>
          </div>
        </template>
      </s-tag>
    </div>
    <!--div class="filter-tag">
      <s-tag ref="directionAccordion">
        <template slot="header">
          <div class="tag tag--header">
            <div>SUUNTA</div>
            <div>
              <b>+</b>&nbsp;
            </div>
          </div>
        </template>
        <template slot="body"></template>
      </s-tag>
    </div-->
    <div v-if="lineFilterValue === undefined" class="tag-container">
      <a
        class="tag"
        v-bind:class="{ 'tag--selected': filter.active }"
        href="#"
        v-for="filter in allFilters"
        v-bind:key="filter.routeShortName + filter.headsign"
        v-on:click="toggleFilter(filter)"
      >
        {{filter.routeShortName}}
        {{filter.headsign}}
      </a>
    </div>
    <!--{{lineFilterValue}}
    <br />
    <br />
    {{destinationFilterValue}}
    <br />
    <br />
    {{allFilters}}-->
  </div>
</template>

<script>
import SAccordion from "./SAccordion.vue";
import STag from "./STag.vue";

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
      lineFilterValue: undefined,
      destinationFilterValue: undefined,
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
      allFilters: []
    };
  },
  methods: {
    addFilter(line, destination) {
      const copy = [...this.allFilters];
      copy.push({
        headsign: destination.headsign,
        lat: line.lat,
        lon: line.lot,
        routeShortName: line.routeShortName,
        active: true
      });
      return copy;
    },
    destinationChanged(newDestination) {
      // this.destinationFilterValue = newDestination;
      this.$refs.lineAccordion.close();
      //this.$refs.directionAccordion.close();

      this.allFilters = this.addFilter(this.lineFilterValue, newDestination);
      this.$emit("new-filter-value", this.allFilters);
      this.reset();
    },
    lineFilterChanged: function(line) {
      if (this.lineFilterValue === line) {
      } else {
        this.lineFilterValue = line;
        //this.destinationFilterValue = undefined;
        this.destinationFilterValue = line.headsign;
      }

      //this.$refs.lineAccordion.close();
      //this.$refs.directionAccordion.close();
      this.$emit("filter-changed", this.lineFilterValue.routeShortName);
    },
    reset: function() {
      this.lineFilterValue = undefined;
      this.destinationFilterValue = undefined;
    },
    toggleFilter(line) {
      line.active = !line.active;
      this.$emit("new-filter-value", this.allFilters);
    }
  }
};
</script>
