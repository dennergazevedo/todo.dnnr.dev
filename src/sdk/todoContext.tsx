import React, {createContext, ReactNode, useCallback, useContext, useState} from 'react'
import { isNil } from 'ramda'

export interface TodoList {
    completed: boolean
    text: string
}

interface TodoContext {
    todoList: TodoList[]
    addItem: (task: TodoList) => void
    removeItem: (task: TodoList) => void
    toggleItem: (task: TodoList) => void
}

interface TodoProvider {
    children: ReactNode
}

const TodoContext = createContext<TodoContext>({} as TodoContext)

function getTodoListFromLocalStorage() {
    const storageList = localStorage.getItem('@dnr|todo');
    if (storageList) return JSON.parse(storageList)
    return []
}

export const TodoProvider: React.FC<TodoProvider> = ({children}) => {

    const [todoList, setTodoList] = useState<TodoList[]>(getTodoListFromLocalStorage())

    const addItemToTodoList = useCallback((task: TodoList) => {
        const newTaskList = [...todoList];
        const taskExists = newTaskList.findIndex((tk) => tk.text === task.text);
        if (taskExists === -1) {
            newTaskList.push(task);
            localStorage.setItem('@dnr|todo', JSON.stringify(newTaskList));
            setTodoList(newTaskList);
        }
    }, [todoList, setTodoList]);

    const removeItemToTodoList = useCallback((task: TodoList) => {
        const newTaskList = [...todoList];
        const currentIndex = newTaskList.findIndex((tk) => tk.text === task.text);
        const auxList = [...newTaskList];
        auxList.splice(currentIndex, 1);
        localStorage.setItem('@dnr|todo', JSON.stringify(auxList));
        setTodoList(auxList);
    }, [todoList, setTodoList]);

    const toggleTaskFromTodoList = useCallback((task: TodoList) => {
        const newTaskList = [...todoList];
        const currentIndex = newTaskList.findIndex((tk) => tk.text === task.text);
        const auxList = [...newTaskList];
        auxList[currentIndex].completed = !auxList[currentIndex].completed;
        localStorage.setItem('@dnr|todo', JSON.stringify(auxList));
        setTodoList(auxList);
    }, [todoList, setTodoList]);

    return (
        <TodoContext.Provider
            value={{
                todoList,
                addItem: addItemToTodoList,
                removeItem: removeItemToTodoList,
                toggleItem: toggleTaskFromTodoList,
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => {
    const context = useContext(TodoContext)

    if (isNil(context)) {
        throw new Error('todoContext must be used inside a TodoProvider')
    }

    return context
}
