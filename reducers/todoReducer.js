import {ADD_TODO, UPDATE_TODO, REMOVE_TODO} from '../actions/todoAction/ActionTypes';

const INITIAL_STATE = {todos: []};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {todos: [...state.todos, action.payload]};
    case REMOVE_TODO:
      return {todos: handleRemoveTodo(action.payload, state.todos)};
    case UPDATE_TODO:
      return {todos: action.payload};
    default:
      return state;
  }
};

const handleRemoveTodo = (item, todos) => {
  const todoIndex = todos.indexOf(item);
  todos.splice(todoIndex, 1);
  return todos;
};

export default todoReducer;
