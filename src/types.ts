interface ITodo {
    id: number;
    text: string;
    completed: boolean;
}

interface INote {
    id: number;
    title: string;
    todos: ITodo[];
}

export type { ITodo, INote }