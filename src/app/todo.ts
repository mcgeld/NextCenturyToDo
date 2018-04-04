export class Todo {
    id: number;
    name: string = "";
    completed: boolean = false;
    editing: boolean = false;
    new: boolean = false;

    constructor(options: Object) {
        Object.assign(this, options);
    }
}
