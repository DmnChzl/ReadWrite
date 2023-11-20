<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import * as NoteService from '@/services/noteService';
import { useCollectionStore } from './stores/collection';

const { setNotes } = useCollectionStore();

onMounted(async () => {
  const allNotes = await NoteService.readAllNotes();
  setNotes(allNotes);
});
</script>

<template>
  <RouterView />
</template>
