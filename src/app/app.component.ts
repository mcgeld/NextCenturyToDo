import { Component, HostListener, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CREATE_TODO, COMPLETE_TODO, DELETE_TODO, EDIT_TODO, SAVE_TODO, UNCOMPLETE_TODO } from './todos';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('todoInput') todoInput;
    title = 'app';
    editing = false;
    todos = [];
    nextTodoId = 0;
    completedTodos = [];
    unCompletedTodos = [];

    constructor(private store: Store<any>) {
        store.select('todos').subscribe(todos => {
            this.setTodos(todos);
            setTimeout(() => {
                if(this.todoInput)
                    this.todoInput.nativeElement.focus();
            }, 0);
        });
        store.select('nextTodoId').subscribe(nextTodoId => {
            this.nextTodoId = nextTodoId;
        });
        store.select('editing').subscribe(editing => {
            this.editing = editing;
        });
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if(!this.editing){
            var id = this.nextTodoId;
            this.store.dispatch({type: CREATE_TODO, id: this.nextTodoId, name: event.key});
        }
    }

    completeTodo(todo) {
        $('#row-' + todo.id.toString()).hide(400, () => {
            this.store.dispatch({type: COMPLETE_TODO, id: todo.id});
        });
    }

    deleteTodo(todo) {
        $('#row-' + todo.id.toString()).hide(400, () => {
            this.store.dispatch({type: DELETE_TODO, id: todo.id});
        });
    }

    editTodo(todo) {
        this.store.dispatch({type: EDIT_TODO, id: todo.id});
    }

    saveTodo(todo, name) {
        if(name !== ''){
            todo.name = name;
            this.store.dispatch({type: SAVE_TODO, todo: todo});
        }
        else {
            this.deleteTodo(todo);
        }
    }

    setTodos(todos) {
        this.todos = todos;
        this.completedTodos = todos.filter(todo => todo.completed);
        this.unCompletedTodos = todos.filter(todo => !todo.completed);
    }

    unCompleteTodo(todo) {
        console.log();
        $('#completeRow-' + todo.id.toString()).hide(400, () => {
            this.store.dispatch({type: UNCOMPLETE_TODO, id: todo.id});
        });
    }
}
