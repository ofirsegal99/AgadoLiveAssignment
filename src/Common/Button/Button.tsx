import React, { FC } from 'react'
import "Common/Button/Button.css"
interface ButtonProps{
    value:string;
    color:"red" | "light-red" | "red-pale" | "pale" | "light" | "dark" | "light-blue";
    handleClick?: () => void;
}

const Button:FC<ButtonProps> = ({value,color,handleClick}) => {

    const buttonStyles = {
        border:`0.1rem solid var(--main--${color}--color)`,
    }

  return (
    <button onClick={handleClick} style={buttonStyles} className='common--button'>
        {value}
    </button>
  )
}

export default Button