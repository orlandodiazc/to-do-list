export const addTaskToList = (listContainer ,newTask) => {
  const listItemTemplate = document.getElementById('list-item-template');
  const taskClone = listItemTemplate.content.cloneNode(true);
  const description = document.createTextNode(newTask.description);
  const listItem = taskClone.querySelector('.list-item');
  const taskCheckbox = listItem.querySelector('input');
  listItem.dataset.index = newTask.index;
  listItem.querySelector('.task-description').appendChild(description);
  taskCheckbox.setAttribute('id', `item${newTask.index}`);
  taskCheckbox.setAttribute('value', `task${newTask.index}`);
  if (newTask.completed) listItem.querySelector('.task-description').classList.add('strikethrough');
  taskCheckbox.checked = newTask.completed;
  listContainer.appendChild(taskClone);
  const currentTask = listContainer.querySelector('li:last-child');
  return currentTask;
};

export const removeTaskFromList = (taskIndex) => {
  const taskList = document.querySelector('.task-list');
  const activeTask = document.querySelector(`[data-index="${taskIndex}"]`);
  taskList.removeChild(activeTask);
};

export const updateElementIndex = () => {
  const taskList = document.querySelector('.task-list');
  const taskItems = taskList.querySelectorAll('.list-item');
  taskItems.forEach((task, i) => {
    task.dataset.index = i;
  });
};
