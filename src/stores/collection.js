import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCollectionStore = defineStore('collection', () => {
  const notes = ref([]);
  const setNotes = newValue => (notes.value = newValue);

  const addNote = newNote => setNotes([...notes.value, newNote]);
  const getNote = noteId => notes.value.find(n => n.id === noteId);

  // prettier-ignore
  const setNote = noteId => ({ versionId, shortText, longText, bgColor }) => {
    const now = Date.now();
  
    setNotes(
      notes.value.map(n => {
        if (n.id === noteId) {
          return {
            ...n,
            currentVersion: {
              ...n.currentVersion,
              id: versionId || n.currentVersion.id, 
              shortText: shortText || n.currentVersion.shortText,
              longText: longText || n.currentVersion.longText,
              updatedAt: now
            },
            bgColor: bgColor || n.bgColor
          };
        }
  
        return n;
      })
    );
  };

  const delNote = noteId => setNotes(notes.value.filter(n => n.id !== noteId));

  return {
    notes,
    setNotes,
    addNote,
    getNote,
    setNote,
    delNote
  };
});
