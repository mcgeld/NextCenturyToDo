import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { INIT_TODOS, COMPLETE_TODO, UNCOMPLETE_TODO } from './todos';

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


    constructor(private store: Store<AppState>) {
        store.select('todos').subscribe(todos => {
            this.setTodos(todos);
        });
    }

    testingClick() {
        this.store.dispatch({type: INIT_TODOS});
    }

    setTodos(todos) {
        this.todos = todos;
        this.completedTodos = todos.filter(todo => todo.completed);
        this.unCompletedTodos = todos.filter(todo => !todo.completed);
    }

    completeTodo(todo) {
        this.store.dispatch({type: COMPLETE_TODO, id: todo.id});
    }

    unCompleteTodo(todo) {
        this.store.dispatch({type: UNCOMPLETE_TODO, id: todo.id});
    }
}
