import {ADD_TODO, UPDATE_TODO, REMOVE_TODO} from './ActionTypes';

export const AddTodo = payload => ({type: ADD_TODO, payload});

export const RemoveTodo = payload => ({type: REMOVE_TODO, payload});

export const UpdateTodo = payload => ({type: UPDATE_TODO, payload});
