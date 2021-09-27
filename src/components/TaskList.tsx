import { createRef, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const inputRef = createRef<HTMLInputElement>();

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    let newTaskName = inputRef?.current?.value;    
    
    if(newTaskName) {
      // var x = Math.floor((Math.random() * 10000) + 1);
      const newIdNum = tasks.length + 1;
      let newTask = {
        id: newIdNum,
        title: newTaskName,
        isComplete: false,
      }

      setTasks([...tasks, newTask]);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    console.log(id)
    tasks.forEach((task) => {
      if(task.id === id) {
        task.isComplete = !task.isComplete;
      }
    })
    setTasks([...tasks]);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    tasks.splice(id - 1, 1);
    tasks.forEach((task, i) => {task.id = i + 1});
    setTasks([...tasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}