import { taskController } from '..';

const taskList = document.querySelector('.task-list');
const listItemTemplate = document.getElementById('list-item-template');

export const addTaskToList = (newTask) => {
  const taskClone = listItemTemplate.content.cloneNode(true);
  const description = document.createTextNode(newTask.description);
  const listItem = taskClone.querySelector('.list-item');
  const taskCheckbox = listItem.querySelector('input');
  listItem.dataset.index = newTask.index;
  listItem.querySelector('.task-description').appendChild(description);
  taskCheckbox.setAttribute('id', `item${newTask.index}`);
  taskCheckbox.setAttribute('value', `task${newTask.index}`);
  taskList.appendChild(taskClone);
  const currentTask = taskList.querySelector('li:last-child');
  const inputCheckbox = currentTask.querySelector('input');

  inputCheckbox.addEventListener('change', (e) => {
    taskController.updateCompleted(e.target.closest('.list-item').dataset.index);
  });
  const editTask = currentTask.querySelector('span');
  editTask.addEventListener('focusout', (e) => {
    const description = e.target.textContent;
    const index = e.target.closest('.list-item').dataset.index;
    e.target.closest('.list-item').style.backgroundColor = 'white';
    console.log(index);
    taskController.editTaskDescription(description, index);
  });
  editTask.addEventListener('focusin', (e) => {
    e.target.closest('.list-item').style.backgroundColor = '#b7b7b7';
  });
};

export const displayTasks = (tasks) => {
  tasks.forEach((task) => {
    addTaskToList(task);
  });
};

export const removeTaskFromList = (taskIndex) => {
  const activeTask = taskList.querySelector(`.list-item[data-index="${taskIndex}"]`);
  taskList.removeChild(activeTask);
};
