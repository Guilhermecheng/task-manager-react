# task-manager-react

Exercise to train React components and functions.

## Main functions of page
### Create new task
It creates a new task using the task list's lentgh +1 as id.
```javascript
 function handleCreateNewTask() {
    let newTaskName = inputRef?.current?.value;        
    if(newTaskName) {
      const newIdNum = tasks.length + 1;
      let newTask = {
        id: newIdNum,
        title: newTaskName,
        isComplete: false,
      }
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  }
```
### Complete task
Looks for specific task by the id num and toggle completeness
```javascript
 function handleToggleTaskCompletion(id: number) {
    tasks.forEach((task) => {
      if(task.id === id) {
        task.isComplete = !task.isComplete;
      }
    })
    setTasks([...tasks]);
  }
```
### Remove task
Looks for task by its id and delete it from list. Then, for organitazion purposes, rewrites all ids to stick to lentgh count.
```javascript
function handleRemoveTask(id: number) {
    tasks.splice(id - 1, 1);
    tasks.forEach((task, i) => {task.id = i + 1});
    setTasks([...tasks]);
  }
```
