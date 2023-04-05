/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from "react";

interface GlobalState {
  count: number;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  timer: number;
  setCount: (count: number) => void;
  setPosition: (position: "top-left" | "top-right" | "bottom-left" | "bottom-right") => void;
  setTimer: (timer: number) => void;
}

interface GlobalProviderProps {
    children: React.ReactNode;
}

export const GlobalContext = createContext<GlobalState>({
    count: 0,
    position: "top-left",
    timer: 0,
    setCount: () => {},
    setPosition: () => {},
    setTimer: () => {},
});

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [count, setCount] = useState<number>(0);
    const [position, setPosition] = useState<"top-left" | "top-right" | "bottom-left" | "bottom-right">("top-left");
    const [timer, setTimer] = useState<number>(0);

    const globalState: GlobalState = {
        count,
        position,
        timer,
        setCount,
        setPosition,
        setTimer,
    };
  
    return (
        <GlobalContext.Provider value={globalState}>
            {children}
        </GlobalContext.Provider>
    );
};