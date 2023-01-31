import './style.css';
import TaskController from './modules/taskController.js';
import Task from './modules/taskGenerator.js';
import { addTaskToList } from './modules/taskDisplay.js';

const taskController = new TaskController();

const btnClear = document.querySelector('.button-clear');
const inputTask = document.querySelector('.form-description');

const updateEventHandler = (currentTask) => {
  const btnDelete = currentTask.querySelector('button');
  btnDelete.addEventListener('mousedown', (e) => {
    const index = e.target.closest('.list-item').getAttribute('data-index');
    taskController.deleteTask(index);
  });

  const inputCheckbox = currentTask.querySelector('input');
  inputCheckbox.addEventListener('change', (e) => {
    taskController.updateCompleted(e.target.closest('.list-item').dataset.index);
  });

  const editTask = currentTask.querySelector('span');
  editTask.addEventListener('blur', (e) => {
    e.stopPropagation();
    const description = e.target.textContent;
    const index = e.target.closest('.list-item').getAttribute('data-index');
    e.target.closest('.list-item').style.backgroundColor = 'white';
    taskController.editTaskDescription(description, index);
    const deleteButton = e.target.parentNode.parentNode.querySelector('button');
    deleteButton.classList.add('hidden');
  });

  editTask.addEventListener('focus', (e) => {
    const deleteButton = e.target.parentNode.parentNode.querySelector('button');
    deleteButton.classList.remove('hidden');
    e.target.closest('.list-item').style.backgroundColor = '#b7b7b7';
  });

  const dragIcon = currentTask.querySelector('.drag-icon');
  dragIcon.addEventListener('dragstart', () => {});
};

const displayTasks = (tasks) => {
  tasks.forEach((task) => {
    const currentTask = addTaskToList(task);
    updateEventHandler(currentTask);
  });
};

if (localStorage.getItem('tasks') && JSON.parse(localStorage.getItem('tasks')).length > 0) {
  const loadedTasks = JSON.parse(localStorage.getItem('tasks'));
  taskController.tasks = loadedTasks;
  displayTasks(loadedTasks);
}

btnClear.addEventListener('click', () => {
  taskController.clearCompleted();
});

inputTask.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = e.target.querySelector('#taskDescription');
  const newTask = new Task(description.value, false, taskController.tasks.length);
  taskController.addTask(newTask);
  const currentTask = addTaskToList(newTask);
  updateEventHandler(currentTask);
  localStorage.setItem('tasks', JSON.stringify(taskController.tasks));
  description.value = '';
});
