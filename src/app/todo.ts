export class Todo {
    name: string = "";
    completed: boolean = false;
    constructor(options: Object) {
        Object.assign(this, options);
    }
}
