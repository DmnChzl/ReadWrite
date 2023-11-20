<script setup>
import { IconClose, IconMoon, IconNoteStackAdd, IconSearch, IconSun } from '@/components/icons';
import { COLOR, ITEM_KEY } from '@/constants';
import { onMounted, ref } from 'vue';
import RoundedButton from './RoundedButton.vue';

const emit = defineEmits(['search']);

const textField = ref('');
const theme = ref(COLOR.LIGHT);

onMounted(() => {
  const item = sessionStorage.getItem(ITEM_KEY);

  if (item) {
    const { theme: themeValue = COLOR.LIGHT } = JSON.parse(item);
    if (themeValue === COLOR.DARK) document.documentElement.classList.add('dark');
    theme.value = themeValue;
  }
});

const resetTextField = () => {
  textField.value = '';
  emit('search', '');
};

const toggleTheme = () => {
  const item = {};

  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    item.theme = COLOR.LIGHT;
    theme.value = COLOR.LIGHT;
  } else {
    document.documentElement.classList.add('dark');
    item.theme = COLOR.DARK;
    theme.value = COLOR.DARK;
  }

  sessionStorage.setItem(ITEM_KEY, JSON.stringify(item));
};
</script>

<template>
  <header
    class="sticky top-0 z-20 grid grid-cols-4 gap-4 border-b border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
    <div class="order-1 col-span-2 flex items-center space-x-2 md:col-span-1">
      <IconNoteStackAdd class="h-9 w-9 text-[#00dc82]" aria-label="Logo" />
      <h1 class="font-jetbrains-mono my-auto whitespace-nowrap text-lg text-neutral-900 dark:text-neutral-100">
        <span class="text-[#00dc82]">_</span>read <span class="text-[#00dc82]">_</span>write
      </h1>
    </div>

    <div class="relative order-3 col-span-4 flex items-center md:order-2 md:col-span-2">
      <span class="absolute left-0 top-0 flex h-[42px] w-[42px]">
        <IconSearch class="m-auto h-6 w-6 text-neutral-400 dark:text-neutral-500" />
      </span>

      <input
        class="text-field-base text-field-light text-field-dark"
        placeholder="..."
        v-model="textField"
        @input="$emit('search', $event.target.value)" />

      <button
        class="absolute right-0 top-0 flex h-[42px] w-[42px] disabled:invisible"
        @click="resetTextField"
        :disabled="textField.length === 0">
        <IconClose class="m-auto h-6 w-6 text-neutral-400 dark:text-neutral-500" />
      </button>
    </div>

    <RoundedButton
      className="col-span-2 md:col-span-1 ml-auto order-2 my-auto"
      @click="toggleTheme"
      :bgColor="theme"
      label="Toggle Theme">
      <IconMoon v-if="theme === COLOR.DARK" class="h-6 w-6" />
      <IconSun v-else class="h-6 w-6" />
    </RoundedButton>
  </header>
</template>
