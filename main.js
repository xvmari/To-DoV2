let tasks = [];

const Form = document.querySelector('taskForm');
const List = document.querySelector('taskList');

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();  
    }
}

window.addEventListener('load', loadTasks);

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("zadanie");
    if (task.completed) {
      taskElement.classList.add("zaliczone");
    }

    taskElement.innerHTML = `
      <p><strong>Przedmiot:</strong> ${task.name}</p>
      <p><strong>Zakres:</strong> ${task.description}</p>
      <p><strong>Rodzaj:</strong> ${task.priority}</p>
      <p><strong>Do kiedy:</strong> ${task.dueDate}</p>
      <button class="completeButton" data-task-id="${task.id}">${
      task.completed ? "Mark Incomplete" : "Mark Complete"
    }</button>
      <button class="deleteButton" data-task-id="${task.id}">Delete</button>
    `;

    taskList.appendChild(taskElement);
  });

  const completeButtons = document.getElementsByClassName("completeButton");
  const deleteButtons = document.getElementsByClassName("deleteButton");

  for (let i = 0; i < completeButtons.length; i++) {
    completeButtons[i].addEventListener("click", toggleComplete);
    deleteButtons[i].addEventListener("click", deleteTask);
  }
}

function addTask(e) {
  e.preventDefault();

  const taskNameInput = document.getElementById("taskName");
  const taskDescriptionInput = document.getElementById("taskDesc");
  const taskPriorityInput = document.getElementById("taskPrio");
  const taskDueDateInput = document.getElementById("taskDate");

  const newTask = {
    id: Date.now(),
    name: taskNameInput.value,
    description: taskDescriptionInput.value,
    priority: taskPriorityInput.value,
    dueDate: taskDueDateInput.value,
    completed: false,
  };

  tasks.push(newTask);
  taskForm.reset();

  renderTasks();
  saveTasks();
}

function toggleComplete(e) {
  const taskId = parseInt(e.target.getAttribute("data-task-id"));

  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.completed = !task.completed;
    }
  });

  renderTasks();
  saveTasks();
}

function deleteTask(e) {
  const taskId = parseInt(e.target.getAttribute("data-task-id"));

  tasks = tasks.filter((task) => task.id !== taskId);

  renderTasks();
  saveTasks();
}

taskForm.addEventListener("submit", addTask);

