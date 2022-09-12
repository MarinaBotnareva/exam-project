import { useEffect, useState } from "react";

import moment from "moment";

import './CountDown.css'

function CountDown({data, text, starttime}) {
  const [duration, setDuration] = useState("");
  const [percent, setPercent] = useState('')
  const [barColor, setbarColor] = useState('')
  const [now, setNow] = useState("");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  
  useEffect(() => {
    const now = setInterval(() => {
      setNow(new Date().toLocaleString());
    }, 1000);
    
    return () => clearInterval(now);
  }, []);

  const countdownTime = (diff) => {
    const d = Math.floor(diff / (3600 * 24));
    const h = Math.floor((diff % (3600 * 24)) / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = Math.floor(diff % 60);
    setDays(d);
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  useEffect(() => {
    const start = moment(now);
    const startpoint = moment(starttime);
    const end = moment(new Date(data).toLocaleString());
    const diff = end.diff(start, "seconds");
    const startdiff = end.diff(startpoint, "seconds");
    const bar = startdiff - duration;
    const percent = bar/startdiff*100; 
    if(percent>100){
      setPercent(100);
    }else {
      setPercent(percent);
    }
    setDuration(diff);
    duration >= 0 && countdownTime(duration);
    if(percent > 70) {
      setbarColor('#ffe9e9')
    }else{
      setbarColor('#b9dba4')
    }
  }, [now]);

  
    
  

  const barStyle = {
    "width": percent + "%",
    "height" : "40px",
    "background": barColor,
    "transition": "width 1s"
  }

  return (
    <>
    <div className="task">
    <div className="bar" style={barStyle}></div>  
    <p className="event">{text}</p>
    <p className="event"> {days}d : {hours}h : {minutes}m : {seconds}s </p>
    
    </div>
    </>
  );
}

export default CountDown;