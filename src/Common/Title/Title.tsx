import React, { FC } from 'react'
import "Common/Title/Title.css"
interface TitleProps{
  value:string;
  color:"red" | "light-red" | "red-pale" | "pale" | "light" | "dark" | "light-blue";
  size: 'H1'| 'H2' | 'H3' | 'H4' | "H5" | 'H6';
}

const sizes: Record<TitleProps['size'],string> = {
  'H1':'5rem',
  'H2':'4rem',
  'H3':'3.2rem',
  'H4':'2.5rem',
  'H5':'1.75rem',
  'H6':'1.25rem',
}

const Title:FC<TitleProps> = ({value,color,size}) => {

  const titleWrapperStyles = {
    fontSize:sizes[size],
    color:`var(--main--${color}--color)`,
  }

  return (
    <div style={titleWrapperStyles} className='title--wrapper'>
      {value}
    </div>
  )
}

export default Title