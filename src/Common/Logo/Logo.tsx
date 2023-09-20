import React, { FC } from 'react'
import AgadoImage from "Styles/Assets/AgadoImage.png"
import "Common/Logo/Logo.css"

const Logo:FC = () => {
  return (
    <img className='agado--logo' src={AgadoImage} alt='agado-logo'/>
  )
}

export default Logo