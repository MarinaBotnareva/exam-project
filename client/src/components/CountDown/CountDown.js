import React, { useEffect, useState } from 'react';
import CONSTANTS from '../../constants';
import moment from 'moment';
import styles from './CountDown.module.sass';

function CountDown({ data, text, starttime, warning, removeTask }) {
  const [duration, setDuration] = useState('');
  const [percent, setPercent] = useState('');
  const [barColor, setbarColor] = useState('');
  const [now, setNow] = useState('');
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

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
    const diff = end.diff(start, 'seconds');
    const startdiff = end.diff(startpoint, 'seconds');
    const bar = startdiff - duration;
    const percent = (bar / startdiff) * 100;
    if (percent > 100) {
      setPercent(100);
    } else {
      setPercent(percent);
    }
    setDuration(diff);
    duration >= 0 && countdownTime(duration);
    if (warning < start.format('YYYY-MM-DD HH-mm')) {
      setbarColor('#ffd5d5');
    } else {
      setbarColor('#b9dba4');
    }
  }, [now]);

  const barStyle = {
    width: percent + '%',
    height: '100%',
    background: barColor,
    transition: 'width 1s',
  };

  return (
    <>
      <div className={styles.task}>
        <div className={styles.bar} style={barStyle}></div>
        <p className={styles.event}>{text}</p>
        <p className={styles.lefttime}>
          {' '}
          {days}d : {hours}h : {minutes}m : {seconds}s{' '}
        </p>
      </div>
      <button className={styles.button} onClick={removeTask}>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}close.svg`} />
      </button>
    </>
  );
}

export default CountDown;
