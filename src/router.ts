import { createRouter, createWebHistory } from 'vue-router';
import NoteList from './pages/noteList/NoteList.vue';
import NoteEdit from './pages/noteEdit/NoteEdit.vue';

const routes = [
    { path: '/', component: NoteList },
    { path: '/note/new', component: NoteEdit },
    { path: '/note/:id', component: NoteEdit }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;