import React, {useState} from "react";

const TodoList = () => {

    const [tasks, setTasks]=useState([])
    const [newTask, setNewTask]=useState("")

    function addTask(e){
        if(e.code=="Enter" && newTask!=""){
            setTasks([...tasks, newTask])
            setNewTask("")
        }
    }

    function removeTask (index){
        let newArray = [...tasks]
        newArray.splice(index, 1)
        setTasks(newArray)
    }
    
    return (
    <div className="container">
        <h1>Test</h1>
        <div className="row d-flex justify-content-center mt-5">
            <div className="col-6">
                <h1 className="d-flex justify-content-center">todo List</h1>
                <div className="input-group input-group-lg">
                     <input type="text" className="form-control" placeholder="What needs to be done?" onKeyDown={e=>addTask(e)} onChange={e=>setNewTask(e.target.value)} value={newTask} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"></input>
                </div>
                <ul className="list-group list-group-flush">
                    {tasks.map((task, index)=>(
                            <li key={index} className="list-group-item d-flex hover-hide justify-content-between align-items-start">
                            <div><h5>{task}</h5></div>
                            <button type="button" onClick={()=>removeTask(index)} className="btn btn-light"><i class="bi bi-check-lg"></i></button>
                            </li>
                    ))}
                    <li className="list-group-item d-flex justify-content-between align-items-start">{tasks.length} items left.</li>
                    <li className="list-group-item d-flex justify-content-between align-items-start"></li>
                </ul>
            </div>
        </div>
    </div>
    
)}

export default TodoList;