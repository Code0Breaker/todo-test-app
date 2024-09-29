<template>
  <div>
    <h1>Заметки</h1>
    <button @click="createNote">Создать заметку</button>
    <div v-for="note in notes" :key="note.id">
      <NoteItem :note="note" @edit="editNote(note.id)" @delete="confirmDelete(note.id)" />
    </div>
    <ConfirmDialog v-if="showConfirmDialog" message="Вы уверены, что хотите удалить?" @confirm="remove"
      @cancel="cancelDelete" />
  </div>
</template>

<script setup lang="ts">
import { notes, deleteNote } from '../../store/notes';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NoteItem from '../../components/noteItem/NoteItem.vue';
import ConfirmDialog from '../../dialogs/ConfirmDialog.vue';

const router = useRouter();
const showConfirmDialog = ref(false);
const noteToDelete = ref<number | null>(null);

const createNote = () => {
  router.push('/note/new');
};

const editNote = (id: number) => {
  router.push(`/note/${id}`);
};

const confirmDelete = (id: number) => {
  noteToDelete.value = id;
  showConfirmDialog.value = true;
};

const remove = () => {
  if (noteToDelete.value !== null) {
    deleteNote(noteToDelete.value);
    showConfirmDialog.value = false;
  }
};

const cancelDelete = () => {
  showConfirmDialog.value = false;
};
</script>
<style scoped>
@import './style.css'
</style>
