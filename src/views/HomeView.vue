<script setup>
import ListItem from '@/components/ListItem.vue';
import StickyHeader from '@/components/StickyHeader.vue';
import { IconNoteStack } from '@/components/icons';
import useComputed from '@/composables/useComputed';
import useSignal from '@/composables/useSignal';
import useWindowSize from '@/composables/useWindowSize';
import { DEFAULT_NOTE } from '@/constants';
import { useCollectionStore } from '@/stores/collection';
import { getWidthRatio } from '@/utils';
import { RouterLink } from 'vue-router';

const { width } = useWindowSize();
const store = useCollectionStore();

const [filter, setFilter] = useSignal('');

const filteredNotes = useComputed(() => {
  return store.notes.filter(note => {
    const re = new RegExp(filter(), 'i'); // Case Insensitive
    return re.test(note.currentVersion.shortText) || re.test(note.currentVersion.longText);
  });
});

const allNotes = useComputed(() => {
  const widthRatio = getWidthRatio(width.value);

  return [DEFAULT_NOTE, ...filteredNotes()].reduce((acc, note, noteIdx) => {
    const idx = noteIdx % widthRatio;
    const prevNotes = acc[idx] || [];
    acc[idx] = [...prevNotes, note];

    return acc;
  }, []);
});
</script>

<template>
  <StickyHeader @search="value => setFilter(value)" />

  <main class="relative h-[calc(100vh-128px)] px-4 md:h-[calc(100vh-75px)]">
    <ul class="flex space-x-4">
      <li class="z-10 w-1/2 md:w-1/3 lg:w-1/4" v-for="(notes, rowIdx) in allNotes()" :key="'row-' + rowIdx">
        <ul class="flex h-full flex-col space-y-4 py-4">
          <li v-for="(note, colIdx) in notes" :key="'col-' + colIdx">
            <RouterLink v-if="rowIdx === 0 && colIdx === 0" to="/new">
              <div class="card-view-base card-view-light card-view-dark">
                <span class="text-lg">Write Note</span>
                <span class="line-clamp-5 text-sm">Lorem Ipsum Dolor Sit Amet...</span>
              </div>
            </RouterLink>

            <RouterLink v-else :to="'/edit/' + note.id">
              <ListItem
                :bgColor="note.bgColor"
                :title="note.currentVersion.shortText"
                :subTitle="note.currentVersion.longText" />
            </RouterLink>
          </li>
        </ul>
      </li>
    </ul>

    <IconNoteStack class="z-5 fixed bottom-0 right-0 h-[128px] w-[128px] text-neutral-100" />
  </main>
</template>
