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

  const btnDelete = listItem.querySelector('button');
  btnDelete.addEventListener('mousedown', (e) => {
    const index = e.target.closest('.list-item').dataset.index;
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
    const index = e.target.closest('.list-item').dataset.index;
    e.target.closest('.list-item').style.backgroundColor = 'white';
    taskController.editTaskDescription(description, index);
    const deleteButton = e.target.parentNode.parentNode.querySelector('button');
    deleteButton.classList.add('hidden');
  });

  editTask.addEventListener('focus', (e) => {
    console.log(e.target, taskController.tasks);
    const deleteButton = e.target.parentNode.parentNode.querySelector('button');
    deleteButton.classList.remove('hidden');
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

export const updateIndexes = (index) => {
  const listItem = document.querySelector(`.list-item[data-index="${index + 1}"]`);
  listItem.dataset.index = index;
};
