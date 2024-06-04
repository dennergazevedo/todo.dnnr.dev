import React, {useCallback, useState} from "react";

import './styles.css';

import Input from "../Input";
import Button from "../Button";
import Plus from "../../assets/Plus.tsx";

import {useTodo} from "../../sdk/todoContext.tsx";

const Form: React.FC = () => {
    const { addItem } = useTodo()
    const [value, setValue] = useState<string>('');

    const handleAddTask = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setValue('')
        addItem({
            text: value,
            completed: false
        })
    }, [value, addItem])

    return (
        <form className="defaultForm" onSubmit={handleAddTask}>
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