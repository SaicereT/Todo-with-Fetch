import { func } from "prop-types";
import React, {useState, useEffect} from "react";

const TodoList = () => {

    const [tasks, setTasks]=useState([])

    const [newTask, setNewTask]=useState("")

    function addTask(e){
        if(e.code=="Enter" && newTask!=""){
            setTasks([...tasks, {label: newTask, done: false}])
            setNewTask("")
        }
    }

    function removeTask (index){
        let newArray = [...tasks]
        newArray.splice(index, 1)
        setTasks(newArray)
    }

    function removeAllTasks (){
        let newArray = []
        setTasks(newArray)
    }
    
    useEffect (async () => {
        var response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/JustinTrejos")
        if (response.status == 404){
            //Creating the list (Post)
            response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/JustinTrejos",{
                method:"POST",
                body: JSON.stringify([]),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/JustinTrejos")
        } else if (!response.ok){
            //Error Message
            console.error("Unknown Error " + response.statusText)
        }
        //Load the data from the Body (Get)
        var data =await response.json()
        setTasks(data)
    }, [])

    useEffect (async () =>{
        if (tasks.length>0){
            let resp = await fetch("https://assets.breatheco.de/apis/fake/todos/user/JustinTrejos",{
                method:"PUT",
                body: JSON.stringify(tasks),
                headers:{
                    "Content-Type":"application/json"
                }
             })
             if(resp.ok){
                console.info("List Updated")
             }
        } /* else {
            let deletresp = await fetch("https://assets.breatheco.de/apis/fake/todos/user/JustinTrejos",{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
             })
        } */
    }, [tasks])

    const deleteList = async () => {
        let deletresp = await fetch("https://assets.breatheco.de/apis/fake/todos/user/JustinTrejos",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
         })
         let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/JustinTrejos",{
            method:"POST",
            body: JSON.stringify([]),
            headers:{
                "Content-Type":"application/json"
            }
        })
         response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/JustinTrejos")
    }

    return (
    <div className="container">
        <div className="row d-flex justify-content-center mt-5">
            <div className="col-6">
                <h1 className="d-flex justify-content-center">todo List</h1>
                <div className="input-group input-group-lg">
                     <input type="text" className="form-control" placeholder="What needs to be done?" onKeyDown={e=>addTask(e)} onChange={e=>setNewTask(e.target.value)} value={newTask} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"></input>
                     <button type="button" onClick={()=>deleteList() && removeAllTasks()} className="btn btn-outline-danger">Clear List</button>
                </div>
                <ul className="list-group list-group-flush">
                    {tasks.map((task, index)=>(
                            <li key={index} className="list-group-item d-flex hover-hide justify-content-between align-items-start">
                            <div><h5>{task.label}</h5></div>
                            <button type="button" onClick={()=>removeTask(index)} className="btn btn-light"><i className="bi bi-check-lg"></i></button>
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