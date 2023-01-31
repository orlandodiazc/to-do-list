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
  return currentTask;
};

export const removeTaskFromList = (taskIndex) => {
  const activeTask = taskList.querySelector(`.list-item[data-index="${taskIndex}"]`);
  taskList.removeChild(activeTask);
};

export const updateIndexes = (index) => {
  const listItem = taskList.querySelector(`.list-item[data-index="${index}"]`);
  listItem.dataset.index -= 1;
};
