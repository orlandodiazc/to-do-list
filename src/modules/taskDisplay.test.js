import { addTaskToList, removeTaskFromList } from './taskDisplay.js';

describe('add and remove tasks from list display', () => {
  document.body.innerHTML =
    '<ul class="task-list"></ul>' +
    `<template id="list-item-template">
      <li class="list-item" draggable="true">
        <div class="task-item" draggable="false">
          <label><input draggable="false" type="checkbox" id="" value="" /></label>
          <div><span class="task-description" draggable="false" contenteditable="true"></span></div>
          <button draggable="false" class="icon-button hidden"><img draggable="false" src="assets/icon-delete.svg" alt="Delete task" /></button>
          <button draggable="false" class="icon-button drag-icon"><img draggable="false" src="assets/icon-drag.svg" alt="Drag vertically" /></button>
        </div>
      </li>
    </template>`;

  const newTask = { description: 'hola', completed: false, index: 0 };
  it('add task to list', () => {
    addTaskToList(document.querySelector('.task-list'), newTask);
    const list = document.querySelectorAll('.task-list li');
    expect(list).toHaveLength(1);
  });
  it('remove task from list', () => {
    removeTaskFromList(0);
    const list = document.querySelectorAll('.task-list li');
    expect(list).toHaveLength(0);
  });
});
