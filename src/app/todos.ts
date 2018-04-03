import { Action } from '@ngrx/store';
import { Todo } from './todo';

export const SAVE_TODO = 'SAVE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const UNCOMPLETE_TODO = 'UNCOMPLETE_TODO';

export function todosReducer(state = [], action) {
    switch(action.type) {
        case SAVE_TODO: {
            return state.map(todo => todo.id === action.todo.id ? {...todo, ...action.todo} : todo);
        }
        case DELETE_TODO: {
            return state.filter(todo => todo.id !== action.todo.id);
        }
        case CREATE_TODO: {
            return [
                ...state,
                new Todo({id: action.id}),
            ];
        }
        case COMPLETE_TODO: {
            return state.map(todo => todo.id === action.id ? {...todo, completed: true} : todo);
        }
        case UNCOMPLETE_TODO: {
            return state.map(todo => todo.id === action.id ? {...todo, completed: false} : todo);
        }
        default: 
            return state;
    }
}

export function todoIdReducer(state = 1, action) {
    switch(action.type) {
        case CREATE_TODO: 
            return state++;
        default:
            return state;
    }
}

export function editingReducer(state = false, action) {
    switch(action.type) {
        case CREATE_TODO: 
            return true;
        default:
            return state;
    }
}
