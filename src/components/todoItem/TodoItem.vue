<template>
    <div>
        <input type="checkbox" :checked="todo.completed" @change="toggleComplete" />
        <input v-model="todo.text" @input="updateTitle" placeholder="Задача" />
        <button @click="$emit('remove')">Удалить</button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { ITodo } from '../../types';

const props = defineProps<{
    todo: ITodo;
}>();

const emit = defineEmits(['remove', 'update']);

const toggleComplete = () => {
    const updatedTodo = { ...props.todo, completed: !props.todo.completed };
    emit('update', updatedTodo);
};

const updateTitle = () => {
    emit('update', { ...props.todo });
};
</script>

<style scoped>
@import './style.css'
</style>