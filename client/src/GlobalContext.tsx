/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect, useState } from "react";

export type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface GlobalState {
  count: number;
  position: Position;
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
    useEffect(() => {
        const savedCount = localStorage.getItem("count");
        const savedPosition = localStorage.getItem("position");
        const savedTimer = localStorage.getItem("timer");

        if (savedCount) {
            setCount(parseInt(savedCount));
        }
        if (savedPosition) {
            setPosition(savedPosition as "top-left" | "top-right" | "bottom-left" | "bottom-right");
        }
        if (savedTimer) {
            setTimer(parseInt(savedTimer));
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "count") {
                setCount(parseInt(event.newValue ?? ""));
            }
            if (event.key === "position") {
                setPosition(event.newValue as "top-left" | "top-right" | "bottom-left" | "bottom-right");
            }
            if (event.key === "timer") {
                setTimer(parseInt(event.newValue ?? ""));
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);


    useEffect(() => {
        localStorage.setItem("count", count.toString());
        localStorage.setItem("position", position);
        localStorage.setItem("timer", timer.toString());
    }, [count, position, timer]);

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