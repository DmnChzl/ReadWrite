import { computed } from 'vue';

export default function useComputed(getter) {
  const ref = computed(getter);
  const get = () => ref.value;
  return get;
}
