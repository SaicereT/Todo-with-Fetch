import React, {useState, useEffect} from "react";

const TodoList = () => {

    const [tasks, setTasks]=useState([])

    const [newTask, setNewTask]=useState("")

    const apiURL= "https://assets.breatheco.de/apis/fake/todos/user/JustinTrejos"

   async function addTask(e){
        if(e.code=="Enter" && newTask!=""){
            if (tasks.length==0){
                let resp=await fetch (apiURL,{
                    method:"POST",
                    body:JSON.stringify([]),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                if (resp.ok){
                    console.log("List Created")
                } else{
                    console.error(resp.status + ": " + resp.statusText)
                    return
                }
            }
            setTasks([...tasks, {label: newTask, done: false}])
            setNewTask("")
        }
    }

   async function removeTask (index){
        let newArr = [...tasks]
        newArr.splice(index, 1)
         if (newArr.length == 0){
            let resp = await fetch(apiURL, {method:"DELETE"})
            if (resp.ok){
                console.log("List Deleted")
            }
         }
        setTasks(newArr)
    } 

    function checkMark (index){
        let newArr = [...tasks]
        newArr[index]={...newArr[index], done:!newArr[index].done}
        setTasks(newArr)
    }

    //Component did mount
    useEffect (async () => {
        let resp = await fetch(apiURL)
        if (resp.ok){
        let data = await resp.json()
        setTasks(data)
    } else {
        console.error(resp.status + ": " + resp.statusText)
    }
    }, [])

    //Component did update (tasks)
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
        }
    }, [tasks])


    
    async function deleteList () {
        let deletresp = await fetch("https://assets.breatheco.de/apis/fake/todos/user/JustinTrejos",{
            method:"DELETE"
         })
         if (deletresp.ok){
            console.log("List Deleted")
        }
         let newArr = []
         setTasks(newArr)
    }

    return (
    <div className="container">
        <div className="row d-flex justify-content-center mt-5">
            <div className="col-6">
                <h1 className="d-flex justify-content-center">todo List</h1>
                <div className="input-group input-group-lg">
                     <input type="text" className="form-control" placeholder="What needs to be done?" onKeyDown={e=>addTask(e)} onChange={e=>setNewTask(e.target.value)} value={newTask} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"></input>
                     <button type="button" onClick={()=>deleteList()} className="btn btn-outline-danger">Clear List</button>
                </div>
                <ul className="list-group list-group-flush">
                    {tasks.map((task, index)=>(
                            <li key={index} className="list-group-item hover-hide">
                            <div id="check" className="form-check d-flex justify-content-between">
                                <div>
                                <input onClick={()=>checkMark(index)} defaultChecked={task.done} className="form-check-input mt-2 me-2" type="checkbox" value={task.done} id="flexCheckDefault"></input>
                                <h5>{task.label + ": " + (task.done ? "All Done!" : "Not yet!")}</h5>
                                </div>
                                <div>
                                    <button type="button" onClick={()=>removeTask(index)} className="btn btn-outline-danger"><i className="bi bi-x-lg"></i></button>
                                </div>                            
                            </div>
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