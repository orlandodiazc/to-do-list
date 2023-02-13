export const addTaskToList = (listItemTemplate, listContainer, newTask) => {
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
export const removeTaskFromList = (listContainer, taskIndex) => {
  // const taskList = document.querySelector('.task-list');
  const activeTask = listContainer.querySelector(`[data-index="${taskIndex}"]`);
  listContainer.removeChild(activeTask);
};

export const updateElementIndex = (listContainer) => {
  const taskItems = listContainer.querySelectorAll('.list-item');
  taskItems.forEach((task, i) => {
    task.dataset.index = i;
  });
};
