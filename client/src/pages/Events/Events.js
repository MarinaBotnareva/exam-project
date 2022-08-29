import React, { useState, useEffect, useCallback} from 'react';
import CountDown from '../../components/CountDown/CountDown';
import Close from '../../components/FirstSection/close.svg'

function ToDoList (){
  const [todoValue, setTodoValue] = useState('')
  const [date, setDate] = useState("");
  const [tasksArr, setTasksArr] = useState(() => { return JSON.parse(localStorage.getItem('tasks')) || []})

  const addTask = (userInput, date) => {
    if(userInput, date) {
      const newItem = {
        id: Math.random().toString(36).substring(2, 9),
        text: userInput,
        date: date,
      }
      setTasksArr([newItem, ...tasksArr]);
    }
  };

  const saveToLocalStorage = useCallback(() => {
    const sortedTasks = tasksArr.sort((a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse())); 
    localStorage.setItem('tasks', JSON.stringify(sortedTasks));
  }, [tasksArr]);

  useEffect(() => {
    saveToLocalStorage();
  }, [saveToLocalStorage]);


  const onSubmit = (e) => {
    e.preventDefault();
    addTask(todoValue, date);
    setTodoValue('');
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

  

  
  return (
    <div className='todo'>
      <h2>Add your events</h2>
      <div>
      <form onSubmit={onSubmit} >
        <input className='input' type='text' value={todoValue} onChange={onInputChange} />
        <input type='datetime-local' value={date} onChange={DateChange}/>
        <button className='button1' type='submit'>Add</button>
      </form>
      <ul>{tasksArr.map((task) => {
        return <li className='task'
          key={task.id}>
            <p>{task.text}</p>
            <CountDown data={task.date}/>
        <button className='button' onClick={() => removeTask(task.id)} >
          <img src={Close}/>
        </button>
        </li>
      } )}</ul>
      </div>
    </div>
  )
}

export default ToDoList