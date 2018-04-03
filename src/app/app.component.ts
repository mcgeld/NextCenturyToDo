import { Component, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CREATE_TODO, COMPLETE_TODO, UNCOMPLETE_TODO, SAVE_TODO, DELETE_TODO } from './todos';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  todos = [];
  completedTodos = [];
  unCompletedTodos = [];


    constructor(private store: Store<any>) {
        store.select('todos').subscribe(todos => {
            this.setTodos(todos);
            this.angular.element('.edit').focus();
        });
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if(!this.store.select('editing')){
            this.store.dispatch({type: CREATE_TODO, id: this.store.select('nextTodoId')});
        }
    }

    setTodos(todos) {
        this.todos = todos;
        this.completedTodos = todos.filter(todo => todo.completed);
        this.unCompletedTodos = todos.filter(todo => !todo.completed);
    }

    completeTodo(todo) {
        this.store.dispatch({type: COMPLETE_TODO, id: todo.id});
    }

    saveTodo(todo) {
        var name = angular.element('#input-' + todo.id.toString()).text();
        if(name !== ''){
            this.store.dispatch({type: SAVE_TODO, todo: todo});
        }
        else {
            this.deleteTodo(todo);
        }
    }

    deleteTodo(todo) {
        this.store.dispatch({type: DELETE_TODO, id: todo.id});
    }

    unCompleteTodo(todo) {
        this.store.dispatch({type: UNCOMPLETE_TODO, id: todo.id});
    }
}
