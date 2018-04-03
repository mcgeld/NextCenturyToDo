import { Action } from '@ngrx/store';
import { Todo } from './todo';

export const INIT_TODOS = 'INIT_TODOS';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const UNCOMPLETE_TODO = 'UNCOMPLETE_TODO';

export function todosReducer(state = [], action) {
    switch(action.type) {
        case INIT_TODOS: {
            return [
                new Todo({id: 1, name: "First"}),
                new Todo({id: 2, name: "Second"}),
                new Todo({id: 3, name: "Third"}),
                new Todo({id: 4, name: "Fourth"}),
                new Todo({id: 5, name: "Fifth"})
            ]
        }
        case COMPLETE_TODO: {
            return state.map(todo => todo.id === action.id ? {...todo, completed: true} : todo);
        }
        case UNCOMPLETE_TODO: {
            return state.map(todo => todo.id === action.id ? {...todo, completed: false} : todo);
        }
        }
        default: 
            return state;
    }
}
