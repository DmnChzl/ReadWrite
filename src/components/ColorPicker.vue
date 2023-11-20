<script setup>
import { COLOR } from '@/constants';

defineProps({
  className: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <ul
    class="scrollbar-none z-10 flex max-w-full items-center space-x-2 overflow-auto rounded-full bg-white p-2 shadow"
    :class="className">
    <li class="flex h-6 w-6" v-for="[key, value] in Object.entries(COLOR)" :key="value">
      <button
        class="my-auto h-6 w-6 rounded-full border border-black/10 hover:border-black/25"
        :class="[
          {
            'bg-white': value === COLOR.LIGHT,
            'bg-neutral-900': value === COLOR.DARK
          },
          value !== COLOR.LIGHT && value !== COLOR.DARK && `bg-${value}-300`
        ]"
        type="button"
        @click="$emit('pick', value)"
        :aria-label="key" />
    </li>
  </ul>
</template>
