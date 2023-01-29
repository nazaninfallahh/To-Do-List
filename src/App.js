import React, { useEffect, useState } from "react"

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

import './App.css';


function App() {

  //Tasks (To Do List) State
  const [toDo, setToDo] = useState([{}]);

  const storeData = () => {
    localStorage.setItem('toDo', JSON.stringify(toDo));
  }
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('toDo')) != null ){
      const storedToDo = JSON.parse(localStorage.getItem('toDo'));
      console.log(storedToDo[0])
      setToDo(storedToDo)
    }else{
      setToDo([])
    }
  }, []);
  


  //const storedToDo = localStorage.getItem('toDo');
  //toDo = JSON.parse(storedToDo);

  //Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');


  //AddTask
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }

  //DeleteTask
  const deleteTask = (id) => {
    let newTask = toDo.filter(task => task.id !== id)
    setToDo(newTask);
  }

  //MarkTask as done 
  const markDone = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask);
  }

  //CancelUpdate
  const cancelUpdate = () => {
    setUpdateData('');

  }

  //ChangetoUpdate
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  //UpdateTask
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
  }

  return (
    <div className="container App">

      <br></br>
      <h2>To Do List App</h2>
      <br></br>


      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className="form-control form-control-lg"
              />
            </div>

            <div className="col-auto">
              <button
                onClick={updateTask}
                className="btn btn-lg btn-success mr-20"
              >Update</button>
              <button
                onClick={cancelUpdate}
                className="btn btn-lg btn-warning"
              >Cancel</button>
              
            </div>
          </div>
          <br />
        </>

      ) : (
        <>
          <div className="row">
            <div className="col">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
              />

            </div>
            <div className="col-auto">
              <button
                onClick={addTask}
                className="btn btn-lg btn-success mr-20"
              >Add Task</button>
              <button
                onClick={storeData}
                className="btn btn-lg btn-success"
              >
               Store Data 
              </button>




            </div>
          </div>
          <br />
        </>
      )}







      {toDo && toDo.length ? '' : 'No Tasks'}
      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment key={task.id}>

              <div className="col taskBg">

                <div className={task.status ? 'done' : ''}>

                  <span className="taskNumber">{index + 1}</span>
                  <span className="Tasktext">{task.title}</span>

                </div>
                <div className="iconsWrap">
                  <span title="Completed / Not Completed"
                    onClick={(e) => markDone(task.id)}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>

                  {task.status ? null : (
                    <span title="Edit"
                      onClick={() => setUpdateData({
                        id: task.id,
                        title: task.title,
                        status: task.status ? true : false
                      })}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  )}

                  <span title="Delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>


                </div>

              </div>

            </React.Fragment>
          )
        })
      }

    </div>
  );
}

export default App;
