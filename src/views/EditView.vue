<script setup>
import ColorPicker from '@/components/ColorPicker.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import RoundedButton from '@/components/RoundedButton.vue';
import StyledDiv from '@/components/StyledDiv.vue';
import {
  IconArrowBack,
  IconChevronLeft,
  IconChevronRight,
  IconColors,
  IconNewWindow,
  IconTrash
} from '@/components/icons';
import useComputed from '@/composables/useComputed';
import useSignal from '@/composables/useSignal';
import { COLOR } from '@/constants';
import * as NoteService from '@/services/noteService';
import { useCollectionStore } from '@/stores/collection';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const { getNote, setNote: setNoteById, delNote } = useCollectionStore();

// ! FIXME
const defaultNote = getNote(route.params.id);
const setNote = setNoteById(route.params.id);

const [shortText, setShortText] = useSignal(defaultNote.currentVersion.shortText);
const [longText, setLongText] = useSignal(defaultNote.currentVersion.longText);

const [versionId, setVersionId] = useSignal(defaultNote.currentVersion.id);
const [allVersions, setAllVersions] = useSignal([]);
const versionIndex = useComputed(() => allVersions().findIndex(v => v.id === versionId()));

const shortTextHasChanged = useComputed(() => {
  const currentVersion = allVersions()[versionIndex()];
  if (currentVersion) return shortText() !== currentVersion.shortText;
  return shortText() !== defaultNote.currentVersion.shortText;
});

const longTextHasChanged = useComputed(() => {
  const currentVersion = allVersions()[versionIndex()];
  if (currentVersion) return longText() !== currentVersion.longText;
  return longText() !== defaultNote.currentVersion.longText;
});

const [bgColor, setBgColor] = useSignal(defaultNote.bgColor);
const isDarkBg = useComputed(() => bgColor() === COLOR.DARK);
const isLightBg = useComputed(() => bgColor() === COLOR.LIGHT);

const [colorPickerVisibility, setColorPickerVisibility] = useSignal(false);
// const colorPickerVisibilityOn = () => setColorPickerVisibility(true);
const colorPickerVisibilityOff = () => setColorPickerVisibility(false);

onMounted(async () => {
  const element = document.getElementById('focusable');
  if (element) element.focus();

  try {
    const { versions } = await NoteService.readNote(route.params.id);
    setAllVersions(versions);
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
});

const goBack = async () => {
  let updatedNote = {};

  if (shortTextHasChanged()) {
    updatedNote = {
      ...updatedNote,
      shortText: shortText()
    };
  }

  if (longTextHasChanged()) {
    updatedNote = {
      ...updatedNote,
      longText: longText()
    };
  }

  if (Object.entries(updatedNote).length > 0) {
    try {
      await NoteService.updateNote(route.params.id, updatedNote);
      setNote(updatedNote);
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
    }
  }

  router.push('/');
};

const updateNoteVersion = async index => {
  const version = allVersions()[index];

  // ? Set Local Data
  setVersionId(version.id);
  setShortText(version.shortText);
  setLongText(version.longText);

  try {
    await NoteService.updateNote(route.params.id, {
      currentVersion: version.id
    });

    // ? Set Store Data
    setNote({
      versionId: version.id,
      shortText: version.shortText,
      longText: version.longText
    });
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
};

const createVersion = async () => {
  try {
    const newVersion = await NoteService.createVersion(route.params.id, {
      shortText: shortText(),
      longText: longText()
    });

    setNote({
      versionId: newVersion.id,
      shortText: shortText(),
      longText: longText()
    });

    router.push('/');
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
};

const updateNoteBgColor = async newBgColor => {
  setBgColor(newBgColor);
  colorPickerVisibilityOff();

  try {
    await NoteService.updateNote(route.params.id, { bgColor: newBgColor });

    setNote({ bgColor: newBgColor });
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
};

const deleteNote = async () => {
  try {
    await NoteService.deleteNote(route.params.id);

    delNote(route.params.id);
    router.push('/');
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
};
</script>

<template>
  <StyledDiv className="relative h-screen w-full space-y-4 p-4 flex flex-col" :bgColor="bgColor()">
    <div class="grid grid-cols-4">
      <RoundedButton className="mr-auto" @click="goBack" :bgColor="bgColor()" label="Go Back">
        <IconArrowBack class="h-6 w-6" />
      </RoundedButton>

      <div class="col-span-2 mx-auto flex space-x-2">
        <RoundedButton
          className="disabled:invisible"
          @click="() => updateNoteVersion(versionIndex() - 1)"
          :bgColor="bgColor()"
          :disabled="versionIndex() === 0"
          label="Previous Version">
          <IconChevronLeft class="h-6 w-6" />
        </RoundedButton>

        <span
          class="font-jetbrains-mono my-auto whitespace-nowrap text-sm"
          :class="isDarkBg() ? 'text-neutral-300' : 'text-neutral-700'">
          <span :class="(isLightBg() || isDarkBg()) && 'text-[#00dc82]'">_</span>version
          <span :class="(isLightBg() || isDarkBg()) && 'text-[#00dc82]'">_</span>{{ versionIndex() + 1 }}
        </span>

        <RoundedButton
          className="disabled:invisible"
          @click="() => updateNoteVersion(versionIndex() + 1)"
          :bgColor="bgColor()"
          :disabled="versionIndex() === allVersions().length - 1"
          label="Next Version">
          <IconChevronRight class="h-6 w-6" />
        </RoundedButton>
      </div>

      <div class="ml-auto flex space-x-2">
        <RoundedButton
          @click="() => setColorPickerVisibility(!colorPickerVisibility())"
          :bgColor="bgColor()"
          label="Toggle Color Picker">
          <IconColors class="h-6 w-6" />
        </RoundedButton>

        <RoundedButton @click="deleteNote" :bgColor="bgColor()" label="Delete Note">
          <IconTrash class="h-6 w-6" />
        </RoundedButton>
      </div>
    </div>

    <ColorPicker v-if="colorPickerVisibility()" className="ml-auto" @pick="color => updateNoteBgColor(color)" />

    <input
      class="mx-4 h-[32px] bg-transparent text-[20px] outline-none"
      :class="isDarkBg() ? 'text-neutral-100' : 'text-neutral-900'"
      placeholder="Short Text"
      :value="shortText()"
      @input="$event => setShortText($event.target.value)" />

    <textarea
      id="focusable"
      class="mx-4 mt-4 flex-grow resize-none bg-transparent outline-none"
      :class="isDarkBg() ? 'text-neutral-100' : 'text-neutral-900'"
      placeholder="Looonnng Teeexxxt"
      :value="longText()"
      @input="$event => setLongText($event.target.value)" />

    <FloatingActionButton
      @click="createVersion"
      :disabled="!shortTextHasChanged() && !longTextHasChanged()"
      :style="(isLightBg() || isDarkBg()) && 'background-color: #00dc82;'">
      <IconNewWindow class="m-auto h-6 w-6" />
    </FloatingActionButton>
  </StyledDiv>
</template>
