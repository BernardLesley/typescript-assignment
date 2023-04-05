import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import "./settings.css";
const Settings = () => {
    const { count, position, timer, setCount, setPosition, setTimer } = useContext(GlobalContext);

    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (Number.isInteger(value) && value >= 0) {
            setCount(value);
        } else {
            setCount(0);
        }
    };

    const handlePositionChange = (value: "top-left" | "top-right" | "bottom-left" | "bottom-right") => {
        setPosition(value);
    };

    const handleTimerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (Number.isInteger(value) && value >= 0) {
            setTimer(value);
        } else {
            setTimer(0);
        }
    };

    return (
        <div className="settings">
            <div className="settings_wrapper">
                <div className="settings_row">
                    <div className="settings_row_title">Count:</div>
                    <input type="number" value={count} onChange={handleCountChange} />
                </div>
                <div className="settings_row">
                    <div className="settings_row_title">Position:</div>               
                    Top Left
                    <input type="radio" className="settings_radiobutton" value="top-left" checked={position === "top-left"} onChange={() => handlePositionChange("top-left")} />               
                    Top Right
                    <input type="radio" className="settings_radiobutton" value="top-right" checked={position === "top-right"} onChange={() => handlePositionChange("top-right")} />                
                    Bottom Left
                    <input type="radio" className="settings_radiobutton" value="bottom-left" checked={position === "bottom-left"} onChange={() => handlePositionChange("bottom-left")} />
                    Bottom Right
                    <input type="radio" className="settings_radiobutton" value="bottom-right" checked={position === "bottom-right"} onChange={() => handlePositionChange("bottom-right")} />
                </div>
                <div className="settings_row">
                    <div className="settings_row_title">Timer:</div>
                    <div className="settings_input-wrapper">
                        <input type="number" value={timer} onChange={handleTimerChange} />
                        <span className="settings_input-text">sec</span>
                    </div> 
                </div>
            </div>
            
        </div>
    );
};

export default Settings;