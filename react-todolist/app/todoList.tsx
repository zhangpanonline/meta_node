import type { Route } from './+types/todoList'
import { useState } from 'react'

import { useAppSelector, useAppDispatch } from './store/hook'

import { addTodo, deleteTodo, doneTodo, todoList, type TodoState } from './todoListSlice'

export function Meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

enum Tab {
    ALL = 'all',
    DONE = 'done',
    NO = 'no'
}

let idx = 0
export default function TodoList() {
    const todos = useAppSelector(todoList)
    const dispatch = useAppDispatch()
    const [ inputValue, setInputValue] = useState('')
    const [ selectTab, setSelectTab ] = useState<Tab>(Tab.ALL)

    // 添加待办事项
    function handleAddTodo() {
        if (inputValue) {
            dispatch(addTodo({ id: todos.length, title: inputValue, done: false }))
        }
        setInputValue('')
    }

    // 设置已完成待办事项
    function handleCheck(idx: TodoState["id"]): void {
        dispatch(doneTodo(idx))
    }

    // 删除待办事项
    function handleDelete(idx: TodoState['id']): void {
        dispatch(deleteTodo(idx))
    }

    // 过滤要展示的待办事项
    const visibleTodoList = todos.filter(v => {
        if (selectTab === Tab.DONE) {
            return v.done
        } else if (selectTab === Tab.NO) {
            return !v.done
        } else {
            return v
        }
    })

    return (
        <div className='flex flex-col w-xl m-auto mt-10' >
            <div className='flex gap-4' >
                <input className="border border-gray-300 px-2 rounded-md w-full" type="text" placeholder='请输入待办事项' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button className="btn btn-primary" onClick={handleAddTodo} >添加</button>
            </div>
            <div role="tablist" className="tabs tabs-border mt-4">
                <a role="tab" className={['tab', selectTab === Tab.ALL && 'tab-active'].join(' ')} onClick={() => setSelectTab(Tab.ALL)}>全部</a>
                <a role="tab" className={['tab', selectTab === Tab.NO && 'tab-active'].join(' ')} onClick={() => setSelectTab(Tab.NO)}>未完成</a>
                <a role="tab" className={['tab', selectTab === Tab.DONE && 'tab-active'].join(' ')} onClick={() => setSelectTab(Tab.DONE)}>已完成</a>
            </div>
            <ul className='border m-0 border-primary h-[500px] overflow-y-auto rounded-md p-4' >
                { visibleTodoList.length ? visibleTodoList.map(v => <TodoItem todo={v} key={v.id} handleCheck={handleCheck} handleDelete={handleDelete} ></TodoItem>) : <div className="text-stone-400 text-center mt-[35%]" >请在上方添加待办事项</div> }
            </ul>
        </div>
    )
}

function TodoItem({ todo, handleCheck, handleDelete }: { todo: TodoState, handleCheck: Function, handleDelete: Function }) {
    return (
        <li className="mb-4 bg-stone-100 p-1 flex justify-between items-center" onClick={() => handleCheck(todo.id)} >
            <input type="checkbox" defaultChecked={todo.done} className="checkbox checkbox-primary" />
            <span className={['ml-4 flex-1 text-ellipsis overflow-hidden ', todo.done && 'line-through'].join(' ')} >{ todo.title }</span>
            <button className="btn btn-error btn-sm btn-dash" onClick={ (e) => {
                e.stopPropagation()
                handleDelete(todo.id)
            } } >DELETE</button>
        </li>
    )
}