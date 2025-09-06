import React from 'react';
import {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router';



const TaskListPage = () => {
  const navigate=useNavigate();
  
  const [userData, setUserData]=useState({});
  
  useEffect(() => {
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      navigate('/');
    }
    else {
      try {
        const user = JSON.parse(userString);
        setUserData(user);
      } catch (e) {
        console.error("Failed to parse user data:", e);
        navigate('/');
      }
    }
  }, []);
  
  
  const [tasksArray, setTasksArray]=useState([]);
  const [filter, setFilter]=useState('all');
  const taskRef=useRef();
  

  async function taskSubmitHandler(event){
    event.preventDefault();
    
    const taskText=taskRef.current.value;
    
    if(taskText.trim()===''){
      return;
    }

    if(userData){
      console.log(userData)
      axios.post('http://localhost:3000/tasks/add-task',{emailId: userData.emailId, taskText: taskText})
      .then(response => {
        setTasksArray([...tasksArray, {text: taskText, isCompleted: false}]);
      })
      .catch(error => {
        console.log(error);
      })
      taskRef.current.value='';
    }
  }

  function filterHandler(filterValue){
    setFilter(filterValue);
    const allFilterButton=document.querySelector('.all-filter-button');
    allFilterButton.classList.remove('active');
    
    const completedFilterButton=document.querySelector('.completed-filter-button');
    completedFilterButton.classList.remove('active');

    const pendingFilterButton=document.querySelector('.pending-filter-button');
    pendingFilterButton.classList.remove('active');

    if(filterValue==='all'){
      allFilterButton.classList.add('active');
    }
    else if(filterValue==='completed'){
      completedFilterButton.classList.add('active');
    }
    else{
      pendingFilterButton.classList.add('active');
    }

  }

  function clearCompletedHandler(){
    axios.post('http://localhost:3000/tasks/clear-completed',{emailId: userData.emailId})
    .then(response => {
      console.log(response.data);
      let tasksArrayCopy=[...tasksArray];
      tasksArrayCopy=tasksArrayCopy.filter((item, index, arr)=>{
        return !item.isCompleted;
      })

      setTasksArray([...tasksArrayCopy])
    })
    .catch(error => {
      console.log(error);
    })
  }

  function toggleTaskStatus(index){
    
    axios.post('http://localhost:3000/tasks/complete-task',{emailId: userData.emailId, taskIdx: index})
    .then(response => {
      console.log(response.data);
      let tasksArrayCopy=[...tasksArray];
      tasksArrayCopy[index].isCompleted=!tasksArrayCopy[index].isCompleted;
      setTasksArray([...tasksArrayCopy]);
    })
    .catch(error => {
      console.log(error);
    })
  }

  function editTaskHandler(index){
    const taskTextPara=document.getElementById(`${index}-task`);
    const taskLeftContainer=document.getElementById(`${index}-task-left-container`);

    let newInput=document.createElement('input');
    newInput.type='text';
    newInput.value=taskTextPara.innerText;
    newInput.classList.add('task-input')
    newInput.classList.add('edit-task-input')

    taskLeftContainer.replaceChild(newInput, taskTextPara);
    newInput.focus();

    newInput.addEventListener('blur', () => {
      if(newInput.value.trim()===''){
        taskLeftContainer.replaceChild(taskTextPara, newInput);
        return;
      }
      
      axios.post('http://localhost:3000/tasks/edit-task',{emailId: userData.emailId, taskIdx: index, taskText: newInput.value})
      .then(response => {
        console.log(response.data);
        let tasksArrayCopy=[...tasksArray];
        tasksArrayCopy[index].text=newInput.value;
        setTasksArray([...tasksArrayCopy]);
        taskTextPara.innerText=newInput.value;
        taskLeftContainer.replaceChild(taskTextPara, newInput);
      })
      .catch(error => {
        console.log(error);
      })
    })
  }

  function deleteTaskHandler(index){
    
    axios.post('http://localhost:3000/tasks/delete-task',{emailId: userData.emailId, taskIdx: index})
    .then(response => {
      console.log(response.data);
      let tasksArrayCopy=[...tasksArray];
      tasksArrayCopy.splice(index, 1);
      setTasksArray([...tasksArrayCopy]);
    })
    .catch(error => {
      console.log(error);
    })
  }

  function logoutHandler(){
    sessionStorage.removeItem('user');
    navigate('/')
  }

  useEffect(() => {
    if(userData.emailId){
      axios.post('http://localhost:3000/tasks/get-tasks',{emailId: userData.emailId})
      .then(response => {
        console.log(userData);
        setTasksArray([...response.data.tasksList]);
      })
      .catch(error => {
        console.log(error);
      })
    }
  },[userData])
  
  return (
    <div className="task-list-page-container">
      <div className="top-bar">
        <h1 className="heading to-do-list-heading">To-Do List</h1>

        <button className="logout-button" onClick={logoutHandler}>Logout</button>
      </div>

      <form onSubmit={taskSubmitHandler} action="" className="task-input-form">
        <input ref={taskRef} type="text" placeholder="Add a task" className="task-input" />
      </form>

      <div className="filter-button-container">
        <button className="filter-button all-filter-button active" onClick={() => filterHandler('all')}>All</button>
        <button className="filter-button completed-filter-button" onClick={()=>{filterHandler('completed')}}>Completed</button>
        <button className="filter-button pending-filter-button" onClick={()=>{filterHandler('pending')}}>Pending</button>
        <button className="filter-button clear-completed-button" onClick={clearCompletedHandler}>Clear Completed</button>
      </div>

      <div className="tasks-container">
        {/* <div className="task">
          <div className="task-left-container">
            <div className="task-checkbox-unchecked"></div>
            <p className="task-text">Sample Task</p>
          </div>

          <div className="task-right-container">
            <div className="edit-img"></div>
            <div className="delete-img"></div>
          </div>
        </div> */}

        {tasksArray.map((item, index, arr) => {
          if(filter==='completed' && !item.isCompleted){
            return;
          }
          else if(filter==='pending' && item.isCompleted){
            return;
          }

          return (
            <div className='task' key={index}>
              <div className="task-left-container" id={`${index}-task-left-container`}>
                <div className={item.isCompleted?'task-checkbox-checked':'task-checkbox-unchecked'} onClick={()=>{toggleTaskStatus(index)}}></div>
                <p className={item.isCompleted?'completed-task-text task-text':'task-text'} id={`${index}-task`}>{item.text}</p>
              </div>

              <div className="task-right-container">
                <div className="edit-img" onClick={()=>{editTaskHandler(index)}}></div>
                <div className="delete-img" onClick={()=>{deleteTaskHandler(index)}}></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default TaskListPage;