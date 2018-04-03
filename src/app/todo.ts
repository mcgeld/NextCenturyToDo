export class Todo {
    id: number;
    name: string = "";
    completed: boolean = false;
    constructor(options: Object) {
        Object.assign(this, options);
    }
}
