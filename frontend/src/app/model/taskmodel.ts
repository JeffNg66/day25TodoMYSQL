export interface Tasks {
    id?: number;
    name: string;
    imageurl: string;
    priority: string;
    due_date: Date;
    count: number;
}

export interface TodoList {
    name: string;
    priority: string;
    due_date: Date;
    todoname: string;
    status: boolean;
}