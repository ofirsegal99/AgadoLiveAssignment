import React, { FC } from 'react'

interface FortmattedNumberProps {
    number:number;
  }
  

const FortmattedNumber:FC<FortmattedNumberProps> = ({number}) => {
    const displayedNumber = number.toString().padStart(2,'0');

  return (
    <span className='progress-value'>{displayedNumber}</span>
    )
}

export default FortmattedNumber