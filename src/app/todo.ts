export class Todo {
    id: number;
    name: string = "New Todo";
    completed: boolean = false;
    constructor(options: Object) {
        Object.assign(this, options);
    }
}
