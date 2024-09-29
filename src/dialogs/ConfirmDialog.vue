<template>
    <div class="dialog">
        <p>{{ message }}</p>
        <button @click="$emit('confirm')">Да</button>
        <button @click="$emit('cancel')">Нет</button>
    </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>();
</script>

<style scoped>
@import './style.css'
</style>