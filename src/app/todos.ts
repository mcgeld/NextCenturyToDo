import { Action } from '@ngrx/store';
import { Todo } from './todo';

export const TodoActions = {
    COMPLETE_TODO: 'COMPLETE_TODO',
    CREATE_TODO: 'CREATE_TODO',
    DELETE_TODO: 'DELETE_TODO',
    EDIT_TODO: 'EDIT_TODO',
    SAVE_TODO: 'SAVE_TODO',
    UNCOMPLETE_TODO: 'UNCOMPLETE_TODO',
    YOU_ARE_NOT_NEW: 'NO_I_AM_NEW'
};

export function todosReducer(state = [], action) {
    switch(action.type) {
        case TodoActions.COMPLETE_TODO: {
            return state.map(todo => todo.id === action.id ? {...todo, ...{completed: true, new: true}} : todo);
        }
        case TodoActions.CREATE_TODO: {
            return [
                ...state,
                new Todo({id: action.id, name: action.name, editing: true, new: true});
            ];
        }
        case TodoActions.DELETE_TODO: {
            return state.filter(todo => todo.id !== action.id);
        }
        case TodoActions.EDIT_TODO: {
            return state.map(todo => todo.id === action.id ? {...todo, editing: true} : {...todo, editing: false});
        }
        case TodoActions.SAVE_TODO: {
            action.todo.editing = false;
            action.todo.new = false;
            return state.map(todo => todo.id === action.todo.id ? {...todo, ...action.todo} : todo);
        }
        case TodoActions.UNCOMPLETE_TODO: {
            return state.map(todo => todo.id === action.id ? {...todo, ...{completed: false, new: true}} : todo);
        }
        case TodoActions.YOU_ARE_NOT_NEW: {
            return state.map(todo => todo.id === action.id ? {...todo, new: false} : todo);
        }
        default: 
            return state;
    }
}

export function todoIdReducer(state = 1, action) {
    switch(action.type) {
        case TodoActions.CREATE_TODO: 
            return state + 1;
        default:
            return state;
    }
}

export function editingReducer(state = false, action) {
    switch(action.type) {
        case TodoActions.CREATE_TODO: 
        case TodoActions.EDIT_TODO:
            return true;
        case TodoActions.DELETE_TODO:
        case TodoActions.SAVE_TODO:
            return false;
        default:
            return state;
    }
}
