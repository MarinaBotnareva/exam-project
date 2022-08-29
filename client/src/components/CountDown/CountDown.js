import { useEffect, useState } from "react";

import moment from "moment";

function CountDown({data}) {
  const [duration, setDuration] = useState("");
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
    const end = moment(new Date(data).toLocaleString());
    const diff = end.diff(start, "seconds");
    setDuration(diff);
    duration > 0 && countdownTime(duration);
  }, [now]);
  
  return (
    <div>
        <p>
        {days}d : {hours}h : {minutes}m : {seconds}s
        </p>
    </div>
  );
}

export default CountDown;