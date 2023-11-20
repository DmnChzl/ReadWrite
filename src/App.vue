<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import * as NoteService from '@/services/noteService';
import { useCollectionStore } from './stores/collection';
import ErrorBoundary from './components/ErrorBoundary.vue';

const { setNotes } = useCollectionStore();

onMounted(async () => {
  const allNotes = await NoteService.readAllNotes();
  setNotes(allNotes);
});
</script>

<template>
  <ErrorBoundary :stopPropagation="true">
    <RouterView />
  </ErrorBoundary>
</template>
