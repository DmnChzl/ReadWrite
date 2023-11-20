<script setup>
import { COLOR } from '@/constants';
import { computed, toRefs } from 'vue';

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: COLOR.LIGHT
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'Unknown'
  }
});

const { bgColor } = toRefs(props);
const isDarkBg = computed(() => bgColor.value === COLOR.DARK);
</script>

<template>
  <button
    class="rounded-full p-2 transition-colors"
    :class="[
      className,
      isDarkBg
        ? 'text-neutral-300 hover:bg-white/10 hover:text-neutral-100'
        : 'text-neutral-700 hover:bg-black/10 hover:text-neutral-900'
    ]"
    type="button"
    :disabled="disabled"
    :aria-label="label">
    <slot />
  </button>
</template>
