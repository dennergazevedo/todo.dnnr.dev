import React, {useCallback, useState} from "react";

import './styles.css';

import Input from "../Input";
import Button from "../Button";
import Plus from "../../assets/Plus.tsx";
import {TodoList} from "../List";

const Form: React.FC = () => {

    const [value, setValue] = useState<string>('');

    const addTask = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (value.length) {
            const currentTaskList = localStorage.getItem('@dnr|todo');
            const newTaskList = currentTaskList ? JSON.parse(currentTaskList) : [];
            const taskExists = newTaskList.findIndex((task:TodoList) => task.text === value);
            if(taskExists === -1){
                const newTask = {
                    completed: false,
                    text: value
                }
                newTaskList.push(newTask)
                window.postMessage({
                    eventName: '@dnr|newTask',
                    task: newTask
                })
                localStorage.setItem('@dnr|todo', JSON.stringify(newTaskList))
                setValue('');
            }
        }
    }, [value])

    return (
        <form className="defaultForm" onSubmit={addTask}>
            <Input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Adicione uma nova tarefa"
            />
            <Button type="submit">
                Criar <Plus/>
            </Button>
        </form>
    )
}

export default Form;