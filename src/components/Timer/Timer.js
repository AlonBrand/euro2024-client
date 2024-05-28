import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import "./Timer.css";


export default function Timer({gameDate, gameTabId, setTimerAlert}) {
    const [counter, setCounter] = useState('0')
    const [alertIsOn, setalertIsOn] = useState(false)
    let now = new Date();
    useEffect(()=>{
        let timeInterval = setInterval(function() {
            let timeLeft = moment.duration(new Date(gameDate - now)).format("HH:mm:ss");
            setCounter(`${timeLeft}`)
            if (moment.duration(new Date(gameDate - now)).minutes() < 5 && moment.duration(new Date(gameDate - now)).hours() === 0 && !alertIsOn){
                document.getElementById(`timerWrapper-${gameTabId}`).classList.add("one_min_left");
                setalertIsOn(true)
                setTimerAlert(true);
            }
        }, 1000);
        return(()=>clearInterval(timeInterval));
    });
  return (
    <div className="timer">
        {counter}
    </div>
  );
}