import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import "./main.css";

interface Message {
    msg_id: number;
    msg: string;
}

const Main = () => {
    const { count, position, timer } = useContext(GlobalContext);
    const [events, setEvents] = useState<Message[]>([]);

    useEffect(() => {
        const eventSource = new EventSource("http://127.0.0.1:9000/events");
        eventSource.onmessage = function(event) {
            const data = JSON.parse(event.data);
            setEvents(events => [...events, data]);
        };

        return () => {
            eventSource.close();
        };
    }, []);
    
    const renderMessage = (message: Message, index: number) => {
        const { msg_id, msg } = message;
        setTimeout(() => {
            setEvents(events => events.filter(event => event.msg_id !== msg_id));
        }, timer * 1000); 
  
        if (index < count) {
            return (
                <div className="main_notification" key={msg_id}>
                    <div className="main_notification_text">
                        {msg}
                    </div>
                    <div>
                        <button className="main_notification_button" onClick={() => setEvents(events => events.filter(event => event.msg_id !== msg_id))}>X</button>
                    </div>
                </div>
            );
        }
    };

    const getPositionClassName = (position: string) => {
        const [pos1, pos2] = position.split("-");
        const positionClass = pos1 === "top" ? "_top" : "_bottom";
        const alignmentClass = pos2 === "left" ? "_left" : "_right";
        return `message_wrapper${positionClass}${alignmentClass}`;
    };
    const className = getPositionClassName(position);
    
    return (
        <div className="main">
            <div className="main_wrapper">
                <div className={className}>
                    {events.map((event, index) => renderMessage(event, index))}
                </div>
            </div>
        </div>
    );
};

export default Main;