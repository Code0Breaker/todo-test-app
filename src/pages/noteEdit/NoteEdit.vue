<template>
    <div>
        <h1>{{ isEditMode ? 'Редактировать заметку' : 'Создать заметку' }}</h1>
        <input v-model="note.title" placeholder="Название заметки" />
        <div v-for="(todo, index) in note.todos" :key="todo.id">
            <TodoItem :todo="todo" @update="updateTodo(index, $event)" @remove="removeTodo(index)" />
        </div>
        <button @click="addTodo">Добавить задачу</button>

        <button @click="saveNote" :disabled="!isValidNote">Сохранить</button>
        <button @click="cancelEdit">Отменить</button>
        <button @click="undoEdit" :disabled="!canUndo">Отменить последнее</button>
        <button @click="redoEdit" :disabled="!canRedo">Повторить последнее</button>

        <ConfirmDialog v-if="showConfirmDialog" message="Вы уверены, что хотите удалить?" @confirm="remove" @cancel="cancelDelete" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { notes, addNote, updateNote, deleteNote } from '../../store/notes';
import { addToHistory, undo, redo, canUndo as checkCanUndo, canRedo as checkCanRedo } from '../../store/undoRedo';
import TodoItem from '../../components/todoItem/TodoItem.vue';

const route = useRoute();
const router = useRouter();

const isEditMode = ref(false);
const note = ref({
    id: Date.now(),
    title: '',
    todos: [] as { id: number; text: string; completed: boolean }[]
});

const originalState = ref(note.value);
const showConfirmDialog = ref(false);

const isValidNote = computed(() => {
    return note.value.title.trim() !== '' && note.value.todos.length > 0;
});

const canUndo = computed(() => {
    return checkCanUndo();
});

const canRedo = computed(() => {
    return checkCanRedo();
});

onMounted(() => {
    const savedNote = localStorage.getItem('note');
    if (savedNote) {
        note.value = JSON.parse(savedNote);
    }

    if (route.params.id) {
        isEditMode.value = true;
        const existingNote = notes.value.find(n => n.id === Number(route.params.id));
        if (existingNote) {
            note.value = { ...existingNote };
            originalState.value = { ...existingNote };
            addToHistory(note.value);
        }
    }
});

watch(note, (newNote) => {
    localStorage.setItem('note', JSON.stringify(newNote));
}, { deep: true });

const addTodo = () => {
    note.value.todos.push({ id: Date.now(), text: '', completed: false });
    addToHistory(note.value);
};

const updateTodo = (index: number, updatedTodo: { id: number; text: string; completed: boolean }) => {
    note.value.todos[index] = updatedTodo;
    addToHistory(note.value);
};

const removeTodo = (index: number) => {
    note.value.todos.splice(index, 1);
    addToHistory(note.value);
};

const saveNote = () => {
    if (isEditMode.value) {
        updateNote(note.value);
    } else {
        addNote(note.value);
    }
    localStorage.removeItem('note');
    router.push('/');
};

const cancelEdit = () => {
    showConfirmDialog.value = true;
};

const undoEdit = () => {
    const prevState = undo(note.value);
    if (prevState) {
        note.value = prevState;
    }
};

const redoEdit = () => {
    const nextState = redo();
    if (nextState) {
        note.value = nextState;
    }
};

const remove = () => {
    if (isEditMode.value) {
        deleteNote(note.value.id);
    }
    router.push('/');
};

const cancelDelete = () => {
    showConfirmDialog.value = false;
};
</script>

<style scoped>
@import './style.css';
</style>
