let tasks = [];
function addTask() {
  const taskInput = document.getElementById('newTask');
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  displayTasks();
}

function displayTasks(filter = 'all') {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filter === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<li class="empty-message">No tasks available</li>';
    return;
  }

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item');
    
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.classList.add(task.completed ? 'completed-task' : 'pending-task');

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('task-actions');

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('btn', 'btn-success');
    toggleButton.textContent = task.completed ? "Mark as Pending" : "Mark as Completed";
    toggleButton.onclick = () => toggleTaskCompletion(index);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(index);

    actionsDiv.appendChild(toggleButton);
    actionsDiv.appendChild(deleteButton);

    taskItem.appendChild(taskText);
    taskItem.appendChild(actionsDiv);

    taskList.appendChild(taskItem);
  });
}
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}
function filterTasks(filter) {
  displayTasks(filter);
}

