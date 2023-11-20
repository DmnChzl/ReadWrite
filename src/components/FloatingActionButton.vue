<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  style: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <button
    class="absolute bottom-4 right-4 z-10 scale-100 rounded-full bg-white p-4 text-neutral-900 shadow transition-transform duration-[250ms] disabled:scale-0"
    :type="type"
    :disabled="disabled"
    :style="style"
    aria-label="FAB">
    <slot />
  </button>
</template>
