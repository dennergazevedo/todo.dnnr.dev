import React, {Fragment} from "react";
import './styles.css';
import Checked from "../../assets/Checked.tsx";
import { TodoList } from "../../sdk/todoContext.tsx";

interface CheckboxProps{
    task: TodoList
    toggle: (task: TodoList) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ task, toggle }: CheckboxProps) => {
    return(
        <button
            className={`checkbox ${task.completed ? 'checked' : ''}`}
            onClick={() => toggle(task)}
        >
            {task.completed ? <Checked /> : <Fragment />}
        </button>
    )
}

export default Checkbox
