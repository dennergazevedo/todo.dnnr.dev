import React, {useMemo} from "react";

import './styles.css';

import Trash from "../../assets/Trash.tsx";
import Checkbox from "../Checkbox";
import {TodoList , useTodo} from "../../sdk/todoContext.tsx";

const TodoBlock: React.FC<TodoList> = (task: TodoList) => {
    const { removeItem, toggleItem } = useTodo()

    return (
        <li
            key={task.text}
            className={`list ${task.completed ? 'completed' : ''}`}
        >
            <Checkbox task={task} toggle={toggleItem}/>
            <p>{task.text}</p>
            <div onClick={() => removeItem(task)}>
                <Trash/>
            </div>
        </li>
    )
}

const List: React.FC = () => {

    const { todoList } = useTodo()

    const completedTasks = useMemo(() => {
        return todoList.filter((task: TodoList) => task.completed) ?? []
    }, [todoList])

    const incompletedTasks = useMemo(() => {
        return todoList.filter((task: TodoList) => !task.completed) ?? []
    }, [todoList])

    return (
        <section className='listContainer'>
            <div className='listHeader'>
                <p className='listHeaderParagraph'>
                    Tarefas criadas <span className='listHeaderBadge'>{todoList?.length}</span>
                </p>
                <p className='listHeaderParagraph'>
                    Concluídas <span className='listHeaderBadge'>{completedTasks.length} de {todoList?.length}</span>
                </p>
            </div>
            <ul className='taskList'>
                {completedTasks.map((task: TodoList) => (
                    <TodoBlock {...task} />
                ))}

                {incompletedTasks.map((task: TodoList) => (
                    <TodoBlock {...task} />
                ))}
            </ul>
        </section>
    )
}

export default List;