import React, {ComponentProps} from "react";

interface ButtonProps extends ComponentProps<"button"> {}

import './styles.css'

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <button
            className='defaultButton'
            {...props}
        />
    )
}

export default Button