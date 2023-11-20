<script setup>
import { COLOR } from '@/constants';

defineProps({
  className: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: COLOR.LIGHT
  }
});
</script>

<template>
  <div
    :class="[
      className,
      {
        'bg-white text-neutral-900': bgColor === COLOR.LIGHT,
        // 'bg-red-300': bgColor === COLOR.RED,
        // 'bg-orange-300': bgColor === COLOR.ORANGE,
        // 'bg-amber-300': bgColor === COLOR.AMBER,
        // 'bg-yellow-300': bgColor === COLOR.YELLOW,
        // 'bg-lime-300': bgColor === COLOR.LIME,
        // 'bg-green-300': bgColor === COLOR.GREEN,
        // 'bg-emerald-300': bgColor === COLOR.EMERALD,
        // 'bg-teal-300': bgColor === COLOR.TEAL,
        // 'bg-cyan-300': bgColor === COLOR.CYAN,
        // 'bg-sky-300': bgColor === COLOR.SKY,
        // 'bg-blue-300': bgColor === COLOR.BLUE,
        // 'bg-indigo-300': bgColor === COLOR.INDIGO,
        // 'bg-violet-300': bgColor === COLOR.VIOLET,
        // 'bg-purple-300': bgColor === COLOR.PURPLE,
        // 'bg-fuchsia-300': bgColor === COLOR.FUCHSIA,
        // 'bg-pink-300': bgColor === COLOR.PINK,
        // 'bg-rose-300': bgColor === COLOR.ROSE,
        'bg-neutral-900 text-white': bgColor === COLOR.DARK
      },
      bgColor !== COLOR.LIGHT && bgColor !== COLOR.DARK && `bg-${bgColor}-300 text-neutral-900`
    ]">
    <slot />
  </div>
</template>
