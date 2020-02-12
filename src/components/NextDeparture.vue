<style scoped>
section {
  color: var(--color-gray-800);
  fill: var(--color-gray-800);

  font-family: var(--font-family-secondary);
  font-size: 20px;
  font-weight: 700;

  display: flex;
  justify-content: space-around;
  align-items: center;

  margin: var(--space-m) 0;
  padding: var(--space-m);
}
.minutes {
  font-size: 32px;
}
.direction {
  color: var(--color-gray-600);
  font-size: var(--font-size-m);
}
.transport-type {
  margin-right: var(--space-m);
}

.remove-icon {
  fill: var(--color-gray-600);
}
</style>

<template>
  <section>
    <div class="minutes">2-9*</div>
    <div>
      <svg
        class="transport-type"
        viewBox="0 0 1024 1024"
        width="16"
        height="16"
      >
        <use xlink:href="#icon-bus" />
        <!--use v-if="type === 'RAIL'" xlink:href="#icon-rail" />
        <use v-if="type === 'SUBWAY'" xlink:href="#icon-subway" />
        <use v-if="type === 'TRAM'" xlink:href="#icon-tram" /-->
      </svg>
      <span class="line">{{ routeShortName }}</span>
      <div class="direction">{{ headsign }}</div>
    </div>
    <div>
      <svg
        class="remove-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
      >
        <path
          d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  name: "NextDeparture",
  props: {
    headsign: String,
    routeShortName: String
  }
};
</script>
