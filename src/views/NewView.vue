<script setup>
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import { IconAdd, IconArrowBack } from '@/components/icons';
import useSignal from '@/composables/useSignal';
import * as NoteService from '@/services/noteService';
import { useCollectionStore } from '@/stores/collection';
import { onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
const { addNote } = useCollectionStore();

const [shortText, setShortText] = useSignal('');
const [longText, setLongText] = useSignal('');

onMounted(() => {
  const element = document.getElementById('focusable');
  if (element) element.focus();
});

const createNote = async () => {
  try {
    const newNote = await NoteService.createNote({
      shortText: shortText(),
      longText: longText()
    });

    addNote(newNote);
    router.push('/');
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
};
</script>

<template>
  <form
    className="relative h-screen w-full space-y-4 p-4 flex flex-col bg-white dark:bg-neutral-900"
    @submit.prevent="createNote">
    <RouterLink
      to="/"
      class="mr-auto rounded-full p-2 text-neutral-700 transition-colors hover:bg-black/10 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-neutral-100">
      <IconArrowBack class="h-6 w-6" />
    </RouterLink>

    <input
      id="focusable"
      class="mx-4 h-[32px] bg-transparent text-[20px] text-neutral-900 outline-none dark:text-neutral-100"
      placeholder="Short Text"
      :value="shortText()"
      @input="$event => setShortText($event.target.value)" />

    <textarea
      class="mx-4 flex-grow bg-transparent text-neutral-900 outline-none dark:text-neutral-100"
      placeholder="Looonnng Teeexxxt"
      :value="longText()"
      @input="$event => setLongText($event.target.value)"
      style="resize: none" />

    <FloatingActionButton type="submit" :disabled="!shortText() || !longText()" :style="'background-color: #00dc82;'">
      <IconAdd class="m-auto h-6 w-6" />
    </FloatingActionButton>
  </form>
</template>
