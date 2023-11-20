import { shallowRef } from 'vue';

/*
function useSignal(value) {
  const ref = shallowRef(value);
  const signal = () => ref.value;

  signal.set = val => {
    ref.value = val;
  };

  signal.update = setter => {
    ref.value = setter(ref.value);
  };

  return signal;
}
*/

export default function useSignal(value) {
  const ref = shallowRef(value);
  const get = () => ref.value;

  const set = val => {
    ref.value = typeof val === 'function' ? val(ref.value) : val;
  };

  return [get, set];
}
