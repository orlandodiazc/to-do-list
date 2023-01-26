import './style.css';
import { updateCompletedStatus, clearCompletedTasks } from './modules/checkboxUpdates.js';

const taskList = document.querySelector('.task-list');
const listItemTemplate = document.getElementById('list-item-template');
const btnClear = document.querySelector('.button-clear');

let tasks = [
  { description: 'wash the dishes', completed: false, index: 1 },
  { description: 'complete project', completed: false, index: 0 },
  { description: 'complete project', completed: false, index: 2 },
];

const addTask = (newTask) => {
  const taskClone = listItemTemplate.content.cloneNode(true);
  const description = document.createTextNode(newTask.description);
  const taskCheckbox = taskClone.querySelector('input');
  taskCheckbox.setAttribute('id', `item${newTask.index}`);
  taskCheckbox.setAttribute('value', `task${newTask.index}`);
  taskCheckbox.dataset.index = newTask.index;
  taskClone.querySelector('label').appendChild(description);
  taskList.appendChild(taskClone);
};

const displayTasks = (tasks) => {
  tasks.forEach((task) => addTask(task));
};

if (localStorage.getItem('tasks')){
  displayTasks(JSON.parse(localStorage.getItem('tasks')));
} else {
  displayTasks(tasks);
}

const inputCheckbox = document.querySelectorAll('input[type="checkbox"]');

inputCheckbox.forEach((checkbox) =>
  checkbox.addEventListener('change', (e) => {
    updateCompletedStatus(tasks, e.target.dataset.index);
  }),
);

btnClear.addEventListener('click', () => {
  tasks = clearCompletedTasks(tasks, taskList);
  localStorage.setItem('tasks', JSON.stringify(tasks));
});

