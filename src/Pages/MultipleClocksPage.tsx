import Button from 'Common/Button/Button'
import Clock from 'Common/Clock/Clock'
import FortmattedNumber from 'Common/FormattedNumber/FortmattedNumber'
import Logo from 'Common/Logo/Logo'
import Title from 'Common/Title/Title'
import Modal from 'Components/Modal/Modal'
import { Context } from 'Context/Context'
import React, { FC, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

interface TimerProps {
  duration: number;
  currentTime: number;
}

type clock =
  {
    theComponent:ReactNode;
    id:string;
    timersData:TimerProps;
  }

const MultipleClocksPage:FC = () => {
  const {clocks,setClocks,setMaxDuration,isRunning,setIsRunning,maxDuration} = useContext(Context);
  const [minutesValue,setMinutesValue] = useState<number>(0);
  const [secondsValue,setSecondsValue] = useState<number>(0);
  const [isPaused,setIsPaused] = useState<boolean>(false);
  const [isReset,setIsReset] = useState<boolean>(false)
  function handleSubmit(){
    setIsOpen(false);
    const newId = uuidv4();
    const newTimersData = {
      duration:(minutesValue * 60) + secondsValue,
      currentTime:0
    }
    const newComponent = <Clock timersData={newTimersData} id={newId}/>
    const newClock:clock = {
      theComponent:newComponent,
      id:newId,
      timersData:newTimersData
    } 
    setClocks([newClock,...clocks])
    setMinutesValue(0);
    setSecondsValue(0);
  }
  function handleDeleteAll(){
    setClocks([])
  }

  function handleReset(){
    setIsReset(true)
    const updatedClocks = clocks.map((clock) => ({
      ...clock,
      id:uuidv4(),
      timerData: {
        ...clock.timersData, 
        currentTime: 0, 
      }
    }));
    setClocks([...updatedClocks]);
  }


  function handleStop(){
    setIsRunning(false);
    setMaxDuration(0);
    const updatedClocks = clocks.map((clock) => ({
      ...clock,
      id:uuidv4(),
      timerData: {
        ...clock.timersData, 
        currentTime: 0, 
      }
    }));
    setClocks([...updatedClocks]);
  }

useEffect(() => {
  if((clocks.length > 0 && !isRunning ) || (clocks.length > 0 && isReset)){
    const newMaxDuration = Math.max(...clocks.map((timer) => timer.timersData.duration));
    console.log(newMaxDuration);
    setIsReset(false)
    setMaxDuration(newMaxDuration);
  }
  if(!(clocks.length > 0)){
    setIsRunning(false)
  }
},[clocks])

const initialization = useRef<boolean>(false);

useEffect(() => {
const storedClocks = localStorage.getItem('SavedClocks');
if(initialization.current === false){
  if(storedClocks === null){
    const serializedClocks = clocks.map((curr) => ({
      id: curr.id,
      timersData: curr.timersData,
    }));
    localStorage.setItem('SavedClocks', JSON.stringify(serializedClocks));
  }
  else{
    if (typeof storedClocks === 'string') {
      const parsedClocks = JSON.parse(storedClocks);
    
      const reconstructedClocks = parsedClocks.map((serializedClock:clock) => ({
        id: serializedClock.id,
        timersData: serializedClock.timersData,
        theComponent: <Clock timersData={serializedClock.timersData} id={serializedClock.id}/>,
      }));
    
      setClocks(reconstructedClocks);
    }
  }
  initialization.current = true;
}
else{
  const serializedClocks = clocks.map((curr) => ({
    id: curr.id,
    timersData: curr.timersData,
  }));

  localStorage.setItem('SavedClocks', JSON.stringify(serializedClocks));
}

},[clocks])

useEffect(() => {
  console.log(isRunning);
  console.log(maxDuration);
  console.log(isPaused);
  if(isRunning && !isPaused){
      const decrementSecond = () => {
        setMaxDuration((prevDurations) => prevDurations - 1 );
      }
    if (maxDuration > 0){
      const intervalId = setInterval(decrementSecond, 1000);
      return () => clearInterval(intervalId);
    }
  }

},[isRunning,maxDuration,isPaused])

const [isOpen,setIsOpen] = useState<boolean>(false)

  return (
    <div className='multiple-clocks-page--wrapper'>
      <div className='multiple-clocks-page--title--wrapper'>
        <Logo/>
        <Title color='red' value={'React Home Assignment'} size={'H4'}/>
      </div>
      <div className='multiple-clocks-page--button--wrapper'>
        {isRunning ? 
          <React.Fragment>
                <Button handleClick={() => {setIsPaused(!isPaused)}} color='light-red' value={isPaused ? 'resume' : 'pause'}/>
                <Button handleClick={handleStop} color='light-red' value='stop'/>
                <Button handleClick={handleReset}color='light-red' value='reset'/>
          </React.Fragment>
      :
        <React.Fragment>
               <Modal open={isOpen} onOpenChange={setIsOpen}>
                 <Modal.Button>
                  <div className='common--button special--add--button'>
                    <Title value={'Add new'} color={'light-red'} size={'H6'} />
                  </div>
                 </Modal.Button>
                 <Modal.Content title='New Clock'>
                   <label htmlFor="minutes--input">Minutes range</label>
                   <output className="range-output" htmlFor="minutes--input">{minutesValue} minutes.</output>
                   <input
                       type="range"
                       name="minutes--input"
                       id="minutes--input"
                       min="0"
                       max="99"
                       step="1"
                       onChange={(e) => {
                         const newValue = parseInt(e.target.value);
                         setMinutesValue(newValue)}
                       }
                       value={minutesValue}
                        />
                   <label htmlFor="seconds--input">Seconds range</label>
                   <output className="seconds-output" htmlFor="seconds--input">{secondsValue} seconds.</output>
                   <input
                       type="range"
                       name="seconds--input"
                       id="seconds--input"
                       min="0"
                       max="59"
                       step="1"
                       onChange={(e) => {
                         const newValue = parseInt(e.target.value);
                         setSecondsValue(newValue)}
                       }
                       value={secondsValue}
                        />
                       <Title value={'your time is set to : '} color={'red'} size={'H6'}/>
                       <div className='multiple-clocks-page--time--display--wrapper progress-value '>
                         <FortmattedNumber number={minutesValue}/>
                         :
                         <FortmattedNumber number={secondsValue}/>
                       </div>
                         <Button handleClick={handleSubmit} color='light-red' value='submit'/>
                 </Modal.Content>
               </Modal>
               <Button handleClick={handleDeleteAll} color='light-red' value='delete all'/>
               <Button handleClick={() => {setIsRunning(true)}} color='light-red' value='start'/>
        </React.Fragment>
        }

      </div>
      <div className='multiple-clocks-page--clock--wrapper'>
        {
          clocks.length === 0 ?
          <Title value={'currently there are no clocks to display.'} color={'dark'} size={'H3'}/>
          :
          clocks.map((curr) => {
            return(
              <React.Fragment key={curr.id}>
                {curr.theComponent}
              </React.Fragment>
            )
          })
        }

      </div>
    </div>
  )
}

export default MultipleClocksPage