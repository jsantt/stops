<style scoped>

.notification {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 4rem;

  padding: 0rem 1rem 1rem 1rem;
  max-width: var(--main-width);
}

main {
  padding: var(--space-m) 0;
  text-align: center;
}

footer {
  padding: 0;
}
</style>

<template>
  <div class="notification" role="dialog" aria-modal="true">
    <h2>
      <div>
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
          />
        </svg>
      </div>
      {{ texts.header }}
    </h2>
    <main>{{ texts.body }}</main>
    <footer v-on:click="$emit('open-locate-prompt')">
      <s-button>{{ texts.button }}</s-button>
    </footer>
  </div>
</template>

<script>
import SButton from "./SButton.vue";

export default {
  name: "Notification",
  props: {
    texts: Object
  },
  components: {
    SButton
  },
  data: function() {
    return {
      showUpdatedText: false
    };
  }
};
</script>
