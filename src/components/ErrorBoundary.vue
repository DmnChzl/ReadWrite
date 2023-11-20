<script setup>
import { onErrorCaptured, toRefs } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  stopPropagation: {
    type: Boolean,
    default: false
  }
});

const { stopPropagation } = toRefs(props);

const router = useRouter();

onErrorCaptured(err => {
  // eslint-disable-next-line
  console.log(err);

  if (stopPropagation.value) router.push('/');
  return !stopPropagation.value;
});
</script>

<template>
  <slot />
</template>
