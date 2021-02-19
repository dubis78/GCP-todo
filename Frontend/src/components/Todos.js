import React, { useState, useContext, useEffect } from "react";
import { CredentialsContext } from "../App";
const { v4: uuidv4 } = require('uuid');
import Axios from "axios";

//import icons from react icons
import { AiFillExclamationCircle, AiOutlineExclamationCircle } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  // const [todoText, setTodoText] = useState("");
  const [todo, setTodo] = useState({text:'',urlImg:'',timer:'',urgent:false,priority:false,completed:false,});
  const [credentials] = useContext(CredentialsContext);
  const [imgContainer, setImgContainer]=useState('');
  const [clock, setClock] = useState(new Date());
  const [dateContainer, setDateContainer]=useState(new Date());
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("uncompleted");


  useEffect( async() => {
    setInterval(() => {
      tick();      
    }, 1000);
    try {
      const {data} = await Axios.get(`http://localhost:8080/todos?email=${credentials.email}&pass=${credentials.password}`);
      setTodos(data.todos)
    }catch (error) {
      setError(error.message);
    }
  },[]);

  const tick = () => {
    setClock(new Date());
  }

  const alarm = async() => {
    // console.log(clock)
    let test=''
    todos.forEach(
      (alarm) => {if(`${new Date(alarm.timer)}` === `${clock}`){
        if(alarm.completed===false){
          alert(`${alarm.text}`);
        }
      }}

      // alarm => test=`${new Date(alarm.timer)}`
    ) 
  }

  const send = async(newTodos) => {
    try {
      const { data } = await Axios.post(`http://localhost:8080/todos?email=${credentials.email}&pass=${credentials.password}`, {
        newTodos
      });
    }catch (error) {
      setError(error.message);
    }
  };


  const sendImg = async() => {
    try {
      if(imgContainer!==''){
        const { data } = await Axios.post(`http://localhost:8080/image`,imgContainer);
      return data;
      }
      return '';
    }catch (error) {
      setError(error.message);
    }
  };

  const addTodo = async(e) => {
    e.preventDefault();
    if (todo.text==='') return;
    const url=await sendImg();
    todo.urlImg=url;
    todo.timer=dateContainer;   
    const newTodos =[...todos,todo];
    setTodos(newTodos);
    setTodo({text:'',urlImg:'',timer:'',urgent:false,priority:false,completed:false,});     
    send(newTodos);
  };

  const handleChange = e => {
    let { name, value } = e.target;
    if(name==='priority' || name==='urgent'){
      if(name==='priority'){
        value=!todo.priority;
        todo.urgent=false;
      }
      else if(name==='urgent'){
        value=!todo.urgent;
        todo.priority=false;
      };
    }
    setTodo(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleImage = async (e) => {
    const {files} = e.target;
    console.log(files)
    const file=files[0];
    let formData = new FormData();
    formData.append("file", file);
    setImgContainer(formData);
  }

  const handleDate = async (e) => {
    setDateContainer(e.target.value);
  }

  const handleChangeItem = (index,value) => {
    const newTodo = [...todos];
    newTodo[index].text=value;
    setTodos(newTodo);
    send(newTodo);
  };

  const toggleTodo = (index) => {
    const newTodo = [...todos];
    newTodo[index].completed=!newTodo[index].completed;
    setTodos(newTodo);
    send(newTodo);
  };

  const urgentTodo = (index) => {
    const newTodo = [...todos];
    newTodo[index].urgent=!newTodo[index].urgent;
    newTodo[index].priority=false;
    setTodos(newTodo);
    send(newTodo);
  };

  const prioryTodo = (index) => {
    const newTodo = [...todos];
    newTodo[index].priority=!newTodo[index].priority;
    newTodo[index].urgent=false;
    setTodos(newTodo);
    send(newTodo);
  };

  alarm();
  let category='normalStatus'
  todo.urgent ? category='urgentStatus' : ''
  todo.priority ? category='prioryStatus' : ''
  return (
    <div>      
      <form onSubmit={addTodo}>       
        <input className={`${category}`} value={todo.text} onChange={handleChange} type="text" name="text"></input>
        <label className='mx-1'> 
          <input type="checkbox" value={todo.urgent} className='select' onClick={handleChange} name="urgent"/>
          <AiFillExclamationCircle className='icon-select urgent'/>
        </label>        
        <label className='mx-1'> 
          <input type="checkbox" value={todo.priority} className='select' value={todo.priority} onClick={handleChange} name="priority"/>
          <AiOutlineExclamationCircle className='icon-select priory'/>
        </label>
        <label className='mx-1'> 
          <input type="file" multiple className='select' onChange={handleImage}/>
          <RiImageAddFill className='icon-select'/>
        </label>
        <input className='mx-1' type="datetime-local" onChange={handleDate}/>
        <button type="submit">Add</button>
      </form>
      <br />
      {todos.map((todo, index) => {
        category='normalStatus'
        todo.urgent ? category='urgentStatus' : ''
        todo.priority ? category='prioryStatus' : ''
        return(
          <div key={index} className={`${category} m-4`}>
            <input type="checkbox" onChange={() => toggleTodo(index)}/>
            <input className={`item ${todo.completed ? 'done' : ''}`} type="text" value={todo.text} name="text" onChange={(e) => handleChangeItem(index,e.target.value)}/>
            <label> 
              <button type="button" className='select' name="urgent" onClick={() => urgentTodo(index)}/>
              <AiFillExclamationCircle className='icon-select urgent'/>
            </label>        
            <label> 
              <button type="button"className='select' name="priority" onClick={() => prioryTodo(index)}/>
              <AiOutlineExclamationCircle className='icon-select priory'/>
            </label>
            <img src={todo.urlImg} className='img-style'/>
          </div>
        )}
      )}
    </div>
  );
}