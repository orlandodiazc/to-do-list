import './style.css';
import TaskController from './modules/taskController.js';
import Task from './modules/taskGenerator.js';

const taskList = document.querySelector('.task-list');
const listItemTemplate = document.getElementById('list-item-template');
const btnClear = document.querySelector('.button-clear');
const inputTask = document.querySelector('.form-description');

const taskController = new TaskController();

const addTask = (newTask) => {
  const taskClone = listItemTemplate.content.cloneNode(true);
  const description = document.createTextNode(newTask.description);
  const taskCheckbox = taskClone.querySelector('input');
  taskCheckbox.setAttribute('id', `item${newTask.index}`);
  taskCheckbox.setAttribute('value', `task${newTask.index}`);
  taskCheckbox.dataset.index = newTask.index;
  taskClone.querySelector('label').appendChild(description);
  taskList.appendChild(taskClone);
  const inputCheckbox = taskList.querySelector(`[data-index="${newTask.index}"]`);
  inputCheckbox.addEventListener('change', (e) => {
    taskController.updateCompleted(e.target.dataset.index);
  });
};

const displayTasks = (tasks) => {
  tasks.forEach((task) => {
    addTask(task);
  });
};

if (localStorage.getItem('tasks')) {
  if (JSON.parse(localStorage.getItem('tasks')).length > 0) {
    const loadedTasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < loadedTasks.length; i++) {
      loadedTasks[i].index = i;
    }
    taskController.tasks = loadedTasks;
    displayTasks(loadedTasks);
  }
}

btnClear.addEventListener('click', () => {
  taskController.clearCompleted(taskList);
});

inputTask.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = e.target.querySelector('#taskDescription');
  const newTask = new Task(description.value, false, taskController.tasks.length);
  taskController.addTask(newTask);
  addTask(newTask);
  localStorage.setItem('tasks', JSON.stringify(taskController.tasks));
  console.log(localStorage);
  description.value = '';
});
