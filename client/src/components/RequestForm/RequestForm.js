import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./RequestForm.css";
import styles from './RequestForm.module.sass'

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const timeStampArr = [
  {time: "10:00", select: false },
  {time: "10:30", select: false },
  {time: "11:00", select: false },
  {time: "11:30", select: false },
  {time: "12:00", select: false },
  {time: "12:30", select: false },
  {time: "13:00", select: false },
  {time: "13:30", select: false },
  {time: "14:00", select: false },
  {time: "14:30", select: false },
  {time: "15:00", select: false },
  {time: "15:30", select: false },
  {time: "16:00", select: false },
  {time: "16:30", select: false },
  {time: "17:00", select: false },
  {time: "17:30", select: false },
  {time: "18:00", select: false },
  {time: "18:30", select: false },
  {time: "19:00", select: false },
  {time: "19:30", select: false },

]

function RequestForm(props) {
  const [selectDate, setSelectDate] = useState("");
  const [TimeArray, setTimeArray] = useState(timeStampArr) 
  const [classTime, setClassTime] = useState("hide");  
 
 const onChange = (value) => {
    setSelectDate(value);
    setClassTime('card-body');
  };
  
   const selectTime = (e) => {
    let times = []
    timeStampArr.forEach((time) => {
      if (e.target.value === time.time){
       let change = {time: time.time, select: true}
        times.push(change);
      }else {
        times.push(time);
      }})
      setTimeArray(times)
  }

  

  var today = new Date();
  var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);

  const date = day[new Date(selectDate).getDay()] + ', ' + month[new Date(selectDate).getMonth()] + ' ' + new Date(selectDate).getDate()
  
  const setDate = (e) => {
    let choice;
    for(let i = 0; i < timeStampArr.length; i++){
      if (e.target.value === timeStampArr[i].time){
       choice = timeStampArr[i].time + " - " + timeStampArr[i+1].time 
      }
    }
    
    let eventDate= choice + ', ' + date + ', ' + new Date(selectDate).getFullYear()
    
    props.setEventDate(eventDate)
    props.setIsSelected()
  }

  return props.isSelected ? (
    <div className={styles.formContainer}>
    <h5 className={styles.formTitle}>Enter Details</h5>
            <form className={styles.eventForm} onSubmit={() => props.setEventInfo()}>
              <h6>Name*</h6>
              <input
                className={styles.eventInput}
                name="name"
                type="text"
                required
              />
              <h6>Email *</h6>
              <input
                 className={styles.eventInput}
                name="email"
                type="text"
                required
              />
              <h6>Your phone number *</h6>
              <input
               className={styles.eventInput}
                name="phone"
                type="text"
                required
              />
              <button
               className={styles.eventBtn}
                type="submit"
                
              >
                Schedule Event
              </button>
            </form>
    </div>
  ) : (
    <>
    <div>
      <h5 className={styles.calendarTitle}>Select a Date & Time</h5>
      <div className="container consult">
              <div className="react-calendar">
                <Calendar onClickDay={onChange} value={selectDate}  minDate={today} maxDate={lastDayOfMonth} locale/>
              </div>
        
        
            <div className={classTime}> 
            <p>{date}</p>
        {TimeArray.map((time) => (
          <div className="buttonsWrapper">
          <button value = {time.time} onClick={selectTime} type="button" className={time.select ? 'activeTime' : 'time'}>
            {time.time}
          </button>
          <button
            value={time.time}
            className={time.select ? 'confirm' : 'hideConfirm'}
            type="button"
            onClick={setDate}
            >
            Confirm
          </button>
          </div>
        ))}
    </div>
    </div>
          
  </div>
    </>
  );
}

export default RequestForm
