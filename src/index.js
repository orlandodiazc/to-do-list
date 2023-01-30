import './style.css';
import TaskController from './modules/taskController.js';
import Task from './modules/taskGenerator.js';
import { displayTasks, addTaskToList } from './modules/taskDisplay';

const btnClear = document.querySelector('.button-clear');
const inputTask = document.querySelector('.form-description');
export const taskController = new TaskController();

if (localStorage.getItem('tasks')) {
  if (JSON.parse(localStorage.getItem('tasks')).length > 0) {
    const loadedTasks = JSON.parse(localStorage.getItem('tasks'));
    taskController.tasks = loadedTasks;
    displayTasks(loadedTasks);
  }
}

btnClear.addEventListener('click', () => {
  taskController.clearCompleted();
});

inputTask.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = e.target.querySelector('#taskDescription');
  const newTask = new Task(description.value, false, taskController.tasks.length);
  taskController.addTask(newTask);
  addTaskToList(newTask);
  localStorage.setItem('tasks', JSON.stringify(taskController.tasks));
  description.value = '';
});
