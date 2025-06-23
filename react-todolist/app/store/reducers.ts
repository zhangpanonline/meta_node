import { combineReducers } from '@reduxjs/toolkit';
import todoList from '../todoListSlice';

const rootReducer = combineReducers({
  todoList
});

export default rootReducer;
