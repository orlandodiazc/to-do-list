import { removeTaskFromList, updateElementIndex } from './taskDisplay.js';

export default class TaskController {
  constructor() {
    this.tasks = [];
  }

  addTask(newTask) {
    this.tasks.push(newTask);
    this.updateStorage();
    return this.tasks;
  }

  sort(movedIndex, afterIndex) {
    const fromIndex = this.tasks.findIndex((task) => task.index === +movedIndex);
    const toIndex = this.tasks.findIndex((task) => task.index === +afterIndex);
    const taskToMove = this.tasks.splice(fromIndex, 1)[0];
    if (afterIndex == null) {
      this.tasks.push(taskToMove);
    } else if (fromIndex <= toIndex) {
      this.tasks.splice(toIndex - 1, 0, taskToMove);
    } else {
      this.tasks.splice(toIndex, 0, taskToMove);
    }
    this.updateIndexes().updateStorage();
  }

  deleteTask(indexToDelete) {
    this.tasks = this.tasks.filter((task) => task.index !== +indexToDelete);
    this.updateIndexes().updateStorage();
    return this.tasks;
  }

  updateStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTaskDescription(description, indexTarget) {
    const result = this.tasks[+indexTarget];
    result.description = description;
    this.updateStorage();
    return this.tasks;
  }

  updateIndexes() {
    this.tasks.forEach((task, i) => {
      task.index = i;
      updateElementIndex();
    });
    return this;
  }

  updateCompleted(indexTarget) {
    const taskToUpdate = this.tasks[+indexTarget];
    taskToUpdate.completed = !taskToUpdate.completed;
    this.updateStorage();
    return this.tasks;
  }

  clearCompleted() {
    this.tasks = this.tasks.filter((task) => {
      return !task.completed;
    });
    this.updateIndexes().updateStorage();
    return this.tasks;
  }
}
