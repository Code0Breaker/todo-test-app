import { ref } from 'vue';
import { INote } from '../types';

const notes = ref<INote[]>(JSON.parse(localStorage.getItem('notes') || '[]'));

const saveNotes = () => {
  localStorage.setItem('notes', JSON.stringify(notes.value));
};

const addNote = (note: INote) => {
  notes.value.push(note);
  saveNotes();
};

const updateNote = (updatedNote: INote) => {
  const index = notes.value.findIndex(note => note.id === updatedNote.id);
  if (index !== -1) {
    notes.value[index] = updatedNote;
    saveNotes();
  }
};

const deleteNote = (id: number) => {
  notes.value = notes.value.filter(note => note.id !== id);
  saveNotes();
};

export { notes, addNote, updateNote, deleteNote };
