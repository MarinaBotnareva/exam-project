import React, { useState, useEffect, useCallback} from 'react';
import { useSelector } from 'react-redux';
import CountDown from '../../components/CountDown/CountDown';
import Header from '../../components/Header/Header';
import moment from "moment";
import CONSTANTS from "../../constants";

import "./Event.css"

const ToDoList = (props) => {
  const user = window.localStorage.getItem("user")
  const userStore = useSelector((state) => state.userStore.data);
  const [todoValue, setTodoValue] = useState('')
  const [date, setDate] = useState("");
  const [warning, setWarning] = useState("");
  const [tasksArr, setTasksArr] = useState(() => { return JSON.parse(localStorage.getItem('tasks'+user)) || []});

  const addTask = (userInput, date, warning) => {
    if(userInput, date, warning) {
      const warnDate = moment(new Date(date).toLocaleString()).subtract(warning,'d').format('YYYY-MM-DD HH:mm');

      const newItem = {
        id: Math.random().toString(36).substring(2, 9),
        text: userInput,
        date: date,
        warning: warnDate,
        starttime: new Date().toLocaleString()
      }
      setTasksArr([newItem, ...tasksArr]);
    }
  };

  const saveToLocalStorage = useCallback(() => {
    const sortedTasks = tasksArr.sort((a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse())); 
    localStorage.setItem('tasks'+user, JSON.stringify(sortedTasks));
  }, [tasksArr]);

  useEffect(() => {
    saveToLocalStorage();
  }, [saveToLocalStorage]);


  const onSubmit = (e) => {
    e.preventDefault();
    addTask(todoValue, date, warning);
    setTodoValue('');
    setDate('');
    setWarning('');
  }

  const removeTask = (id) => {
    setTasksArr((oldTasks) => {
      const newTasks = oldTasks.filter((t)=> t.id !== id);
      return newTasks;
    })
  }

  const onInputChange = ({target: {value}}) => {
    setTodoValue(value);
  }

  const DateChange = ({target: {value}}) => {
    setDate(value);
  }

  const WarningDate = ({target: {value}}) => {
    setWarning(value);
  }


  
  return (
    <>
    <Header/>
    <div className='todo'>
      <h2 className='page'>Add your events</h2>
      <div>
      <form className='formEvents' onSubmit={onSubmit} >
      <div className="input-container">
        <input id='event' className='input' type='text' value={todoValue} onChange={onInputChange} />
        <label for="event" className="placeholder">Your event</label>
      </div>
      <div className="input-container">
        <input id='date'className='input' type='datetime-local' value={date} onChange={DateChange}/>
        <label for="date" className="placeholder">Choose the date & time</label>
        </div>
        <div className="input-container">
        <input id='warning' className='input' placeholder='days' type='number' min="1" max="28" value={warning} onChange={WarningDate} />
        <label for="warning" className="placeholder">Warn for</label>
        </div>
        <button className='button1' type='submit'>Add</button>
      </form>
      <ul>{tasksArr.map((task) => {
        return <li className='tasksItem'
          key={task.id}>
            <CountDown data={task.date} warning={task.warning} text={task.text} starttime={task.starttime} />
        <button className='button' onClick={() => removeTask(task.id)} >
          <img className='taskDel' src={`${CONSTANTS.STATIC_IMAGES_PATH}close.svg`}/>
        </button> 
        </li>
      } )}</ul>
      </div>
    </div>
    </>
  )
}

export default ToDoList;
