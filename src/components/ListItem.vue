<script setup>
import { COLOR } from '@/constants';
import { computed, toRefs } from 'vue';
import { IconFormatQuote } from './icons';

const props = defineProps({
  bgColor: {
    type: String,
    default: COLOR.LIGHT
  },
  title: String,
  subTitle: String
});

const { bgColor } = toRefs(props);

const isDarkBg = computed(() => bgColor.value === COLOR.DARK);
const isLightBg = computed(() => bgColor.value === COLOR.LIGHT);
</script>

<template>
  <div
    class="relative z-10 flex flex-col space-y-2 rounded-lg border border-black/10 p-4 transition-colors hover:border-black/25"
    :class="[
      {
        'border-black/10 bg-white text-neutral-900 hover:border-black/25': isLightBg,
        'border-white/10 bg-neutral-900 text-white hover:border-white/25': isDarkBg
      },
      !isLightBg && !isDarkBg && `bg-${bgColor}-300 border-black/10 text-neutral-900 hover:border-black/25`
    ]">
    <span class="text-lg">{{ title }}</span>
    <span v-if="subTitle" class="line-clamp-5 text-sm">{{ subTitle }}</span>
    <IconFormatQuote
      class="absolute -top-4 right-0 h-[64px] w-[64px]"
      :class="isDarkBg ? 'text-white/5' : 'text-black/5'" />
  </div>
</template>
