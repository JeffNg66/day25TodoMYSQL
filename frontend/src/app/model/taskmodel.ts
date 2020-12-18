export interface Tasks {
    task_id?: number;
    name: string;
    imageurl?: string;
    priority: string;
    due_date: Date;
    count?: number;
}

export interface Todos {
    // name: string;
    // priority: string;
    // due_date: Date;
    todoid: number;
    todoname: string;
    status: boolean;
}