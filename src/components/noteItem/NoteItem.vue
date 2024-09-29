<template>
  <div>
    <h3>{{ note.title }}</h3>
    <div v-for="todo in note.todos" :key="todo.id">
      <span>{{ todo.text }}</span>
    </div>
    <button @click="$emit('edit', note.id)">Edit</button>
    <button @click="$emit('delete', note.id)">Delete</button>
  </div>
</template>

<script setup lang="ts">
import { INote } from '../../types';

defineProps<{
  note: INote;
}>();
</script>

<style scoped>
@import './style.css'
</style>