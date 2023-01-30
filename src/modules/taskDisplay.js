import { taskController } from "..";

const taskList = document.querySelector('.task-list');
const listItemTemplate = document.getElementById('list-item-template');

export const addTaskToList = (newTask) => {
  const taskClone = listItemTemplate.content.cloneNode(true);
  const description = document.createTextNode(newTask.description);
  const taskCheckbox = taskClone.querySelector('input');
  taskCheckbox.setAttribute('id', `item${newTask.index}`);
  taskCheckbox.setAttribute('value', `task${newTask.index}`);
  taskCheckbox.dataset.index = newTask.index;
  taskClone.querySelector('.task-description').appendChild(description);
  taskList.appendChild(taskClone);
  const inputCheckbox = taskList.querySelector(`[data-index="${newTask.index}"]`);
  inputCheckbox.addEventListener('change', (e) => {
    taskController.updateCompleted(e.target.dataset.index);
  });
  const editTask = inputCheckbox.parentNode.parentNode.querySelector('.task-description');
  editTask.addEventListener('focusout', (e) => console.log(e.target.parentNode.parentNode.querySelector('[data-index]')));
};

export const displayTasks = (tasks) => {
  tasks.forEach((task) => {
    addTaskToList(task);
  });
};

export const removeTaskFromList = (taskIndex) => {
  const activeTask = taskList.querySelector(`input[data-index="${taskIndex}"]`);
  taskList.removeChild(activeTask.closest('li'));
}

