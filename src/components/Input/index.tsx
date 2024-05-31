import React, {ComponentProps} from "react";
interface InputProps extends ComponentProps<"input"> {}

import './styles.css'

const Input: React.FC<InputProps> = (props: InputProps) => {

    return (
        <input
            className='defaultInput'
            {...props}
        />
    )
}

export default Input