import React, {useState} from "react";
import trashIcon from './tr.png'



function App() {
  const [taskInput, updatetaskInput]=useState("")
  const [TodoList,updateTodoList]= useState([])


// submit data to the todoList by enter key on keyboard

  const inputKeyDown=(event)=>{
    if(event.keyCode === 13){
      addNote()
    }
    
  }


  // adding data to the todoList
  
  const addNote=(event)=>{
    if(!taskInput || (/^\s*$/).test(taskInput)){
      return
    }
    updateTodoList([{description:taskInput, isComplete: false}, ...TodoList])
    updatetaskInput("")
  }


  //  deleting task from todo
  const deletetask =(index) => {
    const newList = TodoList.filter((item,idx)=>idx!==index)
    updateTodoList(newList )
  }


  //  mark the task as completed task

  const markComplete =(index) => {
    const list = [...TodoList]
    list[index].isComplete = !list[index].isComplete
    updateTodoList(list)
  }

  

  return (
    <div className="app-background">
      <p className="heading-text">React To-Do List</p>
      <div className="task-container">
        <div>
          <input className="text-input" value={taskInput} 
          onKeyDown={inputKeyDown} 
          onChange={(event)=>updatetaskInput(event.target.value)}
          />
          <button className="add-button" 
          onClick={addNote}>
            ADD
          </button>
        </div>
        {TodoList?.length? TodoList.map((todoObj,index)=>
        <ListItem key={index} 
        index={index} 
        itemData={todoObj} 
        delTask={deletetask} 
        markComplete={markComplete}/>
        ):<p>
          No task added!
        </p>}
        
      </div>
      <p className="footer-text">The Todo Box</p>
    </div>
  );
}

// for adding todos in the todolist
function ListItem(props){
  return(
    <div className="list-item row jc-space-between">
      <span className={props.itemData.isComplete?"task-complete":""} 
      onClick={()=>props.markComplete(props.index)}>
      {props.itemData.description}
      </span>
      <img className="delete-item" alt="delete-icon" height={23} src={trashIcon} 
      onClick={()=>props.delTask(props.index)}
      />
    </div>
  )
}
export default App;
