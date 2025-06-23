import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './store'

export interface TodoState {
    id: string,
    title: string,
    done: boolean
}

const initialState: Array<TodoState> = []

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<TodoState>) {
            state.push(action.payload)
        },
        deleteTodo(state, action: PayloadAction<TodoState['id']>) {
            return state.filter(v => v.id !== action.payload)
        },
        doneTodo(state, action: PayloadAction<TodoState['id']>) {
            state.forEach(v => {
                if (v.id === action.payload) {
                    v.done = !v.done
                }
            })
        }
    }
})

export const { addTodo, deleteTodo, doneTodo } = todoListSlice.actions
export const todoList = (state: RootState) => state.todoList
export default todoListSlice.reducer