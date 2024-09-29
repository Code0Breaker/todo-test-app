import { ref } from 'vue';
import { ITodo } from '../types';

interface NoteState {
  id: number;
  title: string;
  todos: ITodo[];
}

const history = ref<NoteState[]>([]);
const redoStack = ref<NoteState[]>([]);

const addToHistory = (note: NoteState) => {
  history.value.push({ ...note });
  redoStack.value = [];  
};

const undo = (currentState: NoteState) => {
  if (history.value.length > 0) {
    const prevState = history.value.pop();
    redoStack.value.push({ ...currentState });
    return prevState;
  }
  return null;
};

const redo = () => {
  if (redoStack.value.length > 0) {
    const nextState = redoStack.value.pop();
    return nextState;
  }
  return null;
};

// New functions to check if undo or redo is possible
const canUndo = () => history.value.length > 0;

const canRedo = () => redoStack.value.length > 0;

export { addToHistory, undo, redo, canUndo, canRedo };
