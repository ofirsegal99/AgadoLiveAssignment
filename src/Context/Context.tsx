import React, { ReactNode, useState } from "react";


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

  


interface ContextProviderProps {
    children: ReactNode;
}

export interface ContextProps{
    clocks:clock[];
    setClocks:React.Dispatch<React.SetStateAction<clock[]>>;
    maxDuration:number,
    setMaxDuration:React.Dispatch<React.SetStateAction<number>>;
    isRunning:boolean,
    setIsRunning:React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = React.createContext<ContextProps>({
    clocks:[],
    setClocks: () => {},
    maxDuration:0,
    setMaxDuration: () => {},
    isRunning:false,
    setIsRunning:() => {}
})

export const ContextProvider = ( {children}:ContextProviderProps) => {
        const [clocks,setClocks] = useState<clock[]>([])
        const [maxDuration,setMaxDuration] = useState<number>(0)
        const [isRunning, setIsRunning] = useState<boolean>(false);
    return(
        <Context.Provider value={{
            clocks,
            setClocks,
            maxDuration,
            setMaxDuration,
            isRunning,
            setIsRunning
        }}>
            {children}
        </Context.Provider>
    )
}