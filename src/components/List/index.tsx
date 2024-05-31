import React, {useCallback, useEffect, useMemo, useState} from "react";

import './styles.css';

import Trash from "../../assets/Trash.tsx";
import Checkbox from "../Checkbox";

export interface TodoList {
    completed: boolean
    text: string
}

const List: React.FC = () => {

    const [localList, setLocalList] = useState<TodoList[]>([])

    const completedTasks = useMemo(() => {
        return localList.filter(todo => todo.completed)
    },[localList])

    const handleListEvent = useCallback((event: any) => {
        if(event.data.eventName === '@dnr|newTask'){
            setLocalList(state => [...state, event.data.task])
        }
    }, [])

    const toggle = useCallback((task: TodoList) => {
        const currentIndex = localList.findIndex(tk => tk.text === task.text)
        const auxList = [...localList]
        auxList[currentIndex].completed = !auxList[currentIndex].completed
        setLocalList(auxList)
        localStorage.setItem('@dnr|todo', JSON.stringify(auxList));
    }, [localList])

    const removeTask = useCallback((task: TodoList) => {
        const currentIndex = localList.findIndex(tk => tk.text === task.text)
        const auxList = [...localList]
        auxList.splice(currentIndex, 1);
        setLocalList(auxList)
        localStorage.setItem('@dnr|todo', JSON.stringify(auxList));
    }, [localList])

    useEffect(() => {
        const storageList = localStorage.getItem('@dnr|todo');
        if(storageList) setLocalList(JSON.parse(storageList));
        window.addEventListener('message', handleListEvent)

        return () => {
            window.removeEventListener('message', handleListEvent)
        }
    }, []);

    return (
        <section className='listContainer'>
            <div className='listHeader'>
                <p className='listHeaderParagraph'>
                    Tarefas criadas <span className='listHeaderBadge'>{localList?.length}</span>
                </p>
                <p className='listHeaderParagraph'>
                    Concluídas <span className='listHeaderBadge'>{completedTasks.length} de {localList?.length}</span>
                </p>
            </div>
            <ul className='taskList'>
                {localList.map(task => (
                    <li
                        key={task.text}
                        className={`list ${task.completed ? 'completed' : ''}`}
                    >
                        <Checkbox task={task} toggle={toggle}/>
                        <p>{task.text}</p>
                        <div onClick={() => removeTask(task)}>
                            <Trash />
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default List;