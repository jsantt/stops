<style scoped>
.message-header {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-m) 0;
  width: 100%;
}

.message-header--underline {
  border-bottom: 1px solid var(--color-gray-500);
}

.message {
  padding: 0 var(--space-m);
}

.message-body {
  max-height: 40rem;
  overflow: hidden;
  transition: 0.4s ease all;
  will-change: height;
}

.is-closed .message-body {
  max-height: 0;
}

svg {
  margin-top: 0.4rem;
}
.svg--open {
  transform: rotateX(180deg);
}
</style>
<template>
  <section class="section container">
    <article class="message" :class="accordionClasses">
      <div @click="$emit('opened')" class="message-header message-header--underline">
        <slot name="header"></slot>
        <svg
          v-bind:class="{ 'svg--open': open }"
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="6"
          viewBox="0 0 292.4 292.4"
        >
          <path
            fill="#000"
            d="M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-12.9 5.4A17.6 17.6 0 0 0 0 82.2c0 5 1.8 9.3 5.4 12.9l128 127.9c3.6 3.6 7.8 5.4 12.8 5.4s9.2-1.8 12.8-5.4L287 95c3.5-3.5 5.4-7.8 5.4-12.8 0-5-1.9-9.2-5.5-12.8z"
          />
        </svg>
      </div>
      <div class="message-body">
        <div class="message-content">
          <slot name="body"></slot>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "s-tag",
  props: {
    open: Boolean
  },
  mounted() {
    this.open = false;
  },
  computed: {
    accordionClasses: function() {
      return {
        "is-closed": !this.open,
        "is-primary": this.open
      };
    }
  }
};
</script>
