import { removeTaskFromList, updateIndexes } from './taskDisplay.js';

export default class TaskController {
  constructor() {
    this.tasks = [];
  }

  addTask(newTask) {
    this.tasks.push(newTask);
  }

  deleteTask(indexToDelete) {
    removeTaskFromList(indexToDelete);
    this.tasks.splice(indexToDelete, 1);
    if (indexToDelete < this.tasks.length) {
      this.tasks.forEach((task, i) => {
        if (i >= indexToDelete) {
          updateIndexes(task.index);
          task.index -= 1;
        }
      });
    }
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTaskDescription(description, indexTarget) {
    const result = this.tasks.find((task) => task.index === +indexTarget);
    result.description = description;
    this.updateStorage();
  }

  updateCompleted(indexTarget) {
    const taskToUpdate = this.tasks.find((task) => task.index === +indexTarget);
    taskToUpdate.completed = !taskToUpdate.completed;
  }

  clearCompleted() {
    for (let i = this.tasks.length - 1; i >= 0; i -= 1) {
      if (this.tasks[i].completed === true) {
        this.deleteTask(i);
      }
    }
  }
}
