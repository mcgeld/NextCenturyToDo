import { Action } from '@ngrx/store';
import { Todo } from './todo';

export const COMPLETE_TODO = 'COMPLETE_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const SAVE_TODO = 'SAVE_TODO';
export const UNCOMPLETE_TODO = 'UNCOMPLETE_TODO';

export function todosReducer(state = [], action) {
    switch(action.type) {
        case COMPLETE_TODO: {
            return state.map(todo => todo.id === action.id ? {...todo, completed: true} : todo);
        }
        case CREATE_TODO: {
            return [
                ...state,
                new Todo({id: action.id, name: action.name, editing: true, new: true});
            ];
        }
        case DELETE_TODO: {
            return state.filter(todo => todo.id !== action.id);
        }
        case EDIT_TODO: {
            return state.map(todo => todo.id === action.id ? {...todo, editing: true} : {...todo, editing: false});
        }
        case SAVE_TODO: {
            action.todo.editing = false;
            return state.map(todo => todo.id === action.todo.id ? {...todo, ...action.todo} : todo);
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
            return state + 1;
        default:
            return state;
    }
}

export function editingReducer(state = false, action) {
    switch(action.type) {
        case CREATE_TODO: 
        case EDIT_TODO:
            return true;
        case DELETE_TODO:
        case SAVE_TODO:
            return false;
        default:
            return state;
    }
}
