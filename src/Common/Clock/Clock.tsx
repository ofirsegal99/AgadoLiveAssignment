import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import "Common/Clock/Clock.css"
import Title from 'Common/Title/Title';
import FortmattedNumber from 'Common/FormattedNumber/FortmattedNumber';
import { Context } from 'Context/Context';

interface TimerProps {
  duration: number;
  currentTime: number;
}


interface ClockProps{
    id:string;
    timersData:TimerProps;
}



const Clock:FC<ClockProps> = ({id,timersData}) => {

  const closeSvg = <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 0.666748C6.62666 0.666748 0.666656 6.62675 0.666656 14.0001C0.666656 21.3734 6.62666 27.3334 14 27.3334C21.3733 27.3334 27.3333 21.3734 27.3333 14.0001C27.3333 6.62675 21.3733 0.666748 14 0.666748ZM20.6667 18.7867L18.7867 20.6667L14 15.8801L9.21332 20.6667L7.33332 18.7867L12.12 14.0001L7.33332 9.21342L9.21332 7.33342L14 12.1201L18.7867 7.33342L20.6667 9.21342L15.88 14.0001L20.6667 18.7867Z" fill="black"></path></svg>


  const {isRunning,maxDuration} = useContext(Context)

  const {clocks,setClocks} = useContext(Context)

  const [duration,setDuration] = useState<number>(timersData.currentTime)

  const [progressEndValue,setProgressEndValue] = useState<number>(timersData.duration - 1)

  function handleDeleteClock(){
    console.log('clicked')
    const newClocks = clocks.filter((curr) => curr.id !== id)
    setClocks(newClocks)
  }


  let circularProgress = useRef<HTMLDivElement>(null);
  let progressValue = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if(isRunning){
       if(maxDuration === progressEndValue){
        setProgressEndValue(progressEndValue-1)
        setDuration((prevDuration) => prevDuration + 1);
        if(circularProgress.current){
          (circularProgress.current.style as CSSStyleDeclaration).background   = `conic-gradient(var(--main--light-blue--color) ${( (duration + 1 ) / (timersData.duration) ) * 360}deg, var(--main--dark--color) 0deg)`
        }
      }
    }
    else{
    }
  },[maxDuration])

  const [minutes,setMinutes] = useState<number>(Math.floor(timersData.currentTime / 60));
  const [seconds,setSeconds] = useState<number>(timersData.currentTime % 60);

  const defaultMinutes = Math.floor(timersData.duration / 60);

  const defaultSeconds = timersData.duration % 60;

  useEffect(() => {
    const newDurationMinutes = Math.floor(duration / 60);
    const newDurationSeconds = duration % 60;
    setMinutes(newDurationMinutes)
    setSeconds(newDurationSeconds)
  },[duration])

  return (
  <div className='clock--wrapper'>
    <button onClick={handleDeleteClock}className='clock--close--button'>
      {closeSvg}
    </button>
    <Title value={'preset time'} color={'dark'} size={'H6'}/>
      <div className='multiple-clocks-page--time--display--wrapper progress-value '>
        <FortmattedNumber number={defaultMinutes}/>
        :
        <FortmattedNumber number={defaultSeconds}/>
      </div>
    <div className='container'>
    <div ref={circularProgress} className='circular-progress'>
        <span ref={progressValue} className='progress-value'>
            <FortmattedNumber number={minutes}/>
            :
            <FortmattedNumber number={seconds}/>
        </span>
    </div>
    </div>
  </div>


  )
}

export default Clock