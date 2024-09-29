<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
  if (!localStorage.getItem('notes')) {
    localStorage.setItem('notes', JSON.stringify([]));
  }
});
</script>
<template>
  <router-view />
</template>
