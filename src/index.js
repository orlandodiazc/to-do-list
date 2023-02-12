import TaskController from './modules/taskController.js';
import { addTaskToList, removeTaskFromList } from './modules/taskDisplay.js';
import dragOverHandler from './modules/taskDragDrop.js';
import Task from './modules/taskGenerator.js';
import './style.css';

const taskController = new TaskController();

const btnClear = document.querySelector('.button-clear');
const inputTask = document.querySelector('.form-description');
const description = document.querySelector('#taskDescription');
const taskList = document.querySelector('.task-list');

const updateEventHandler = (currentTask) => {
  const btnDelete = currentTask.querySelector('button');
  btnDelete.addEventListener('mousedown', (e) => {
    const index = e.target.closest('.list-item').getAttribute('data-index');
    taskController.deleteTask(index);
    removeTaskFromList(index);
  });

  const inputCheckbox = currentTask.querySelector('input');
  inputCheckbox.addEventListener('change', (e) => {
    const currentTask = e.target.closest('.list-item');
    currentTask.querySelector('span').classList.toggle('strikethrough');
    taskController.updateCompleted(currentTask.dataset.index);
  });

  const editTask = currentTask.querySelector('span');
  editTask.addEventListener('blur', (e) => {
    e.target.closest('.list-item').style.backgroundColor = 'white';
    const deleteButton = e.target.parentNode.parentNode.querySelector('button');
    deleteButton.classList.add('hidden');
    currentTask.setAttribute('draggable', true);
    currentTask.querySelector('.drag-icon').classList.remove('hidden');
  });

  editTask.addEventListener('input', (e) => {
    const description = e.target.textContent;
    const index = e.target.closest('.list-item').getAttribute('data-index');
    taskController.editTaskDescription(description, index);
  });

  editTask.addEventListener('focus', (e) => {
    const deleteButton = e.target.parentNode.parentNode.querySelector('button');
    deleteButton.classList.remove('hidden');
    e.target.closest('.list-item').style.backgroundColor = '#e6e6e6';
    currentTask.setAttribute('draggable', false);
    currentTask.querySelector('.drag-icon').classList.add('hidden');
  });

  currentTask.addEventListener('dragstart', () => {
    currentTask.classList.add('dragging');
  });

  currentTask.addEventListener('dragend', () => {
    currentTask.classList.remove('dragging');
    const afterElement = document.querySelector('.after-element');
    const afterIndex = afterElement == null ? null : afterElement.dataset.index;
    taskController.sort(currentTask.dataset.index, afterIndex);
  });

  currentTask.addEventListener('touchstart', () => {
    currentTask.classList.add('dragging');
    const nextSibling = currentTask.nextElementSibling;
    if (nextSibling) nextSibling.classList.add('after-element');
  });

  currentTask.addEventListener('touchend', () => {
    const afterElement = document.querySelector('.after-element');
    const afterIndex = afterElement == null ? null : afterElement.dataset.index;
    taskController.sort(currentTask.dataset.index, afterIndex);
    const nextSibling = currentTask.nextElementSibling;
    if (nextSibling) nextSibling.classList.remove('after-element');
    currentTask.classList.remove('dragging');
  });

  currentTask.addEventListener('touchmove', dragOverHandler);
};

const displayTasks = (tasks) => {
  tasks.forEach((task) => {
    const currentTask = addTaskToList(taskList, task);
    updateEventHandler(currentTask);
  });
};

if (localStorage.getItem('tasks') && JSON.parse(localStorage.getItem('tasks')).length > 0) {
  const loadedTasks = JSON.parse(localStorage.getItem('tasks'));
  loadedTasks.forEach((task, i) => {
    task.index = i;
  });
  taskController.tasks = loadedTasks;
  displayTasks(loadedTasks);
}

btnClear.addEventListener('click', () => {
  taskController.clearCompleted();
});

inputTask.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = new Task(description.value, false, taskController.tasks.length);
  taskController.addTask(newTask);
  const currentTask = addTaskToList(taskList, newTask);
  updateEventHandler(currentTask);
  description.value = '';
});

export default taskController;
