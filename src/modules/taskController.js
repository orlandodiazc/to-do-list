import { removeTaskFromList } from './taskDisplay.js';

export default class TaskController {
  constructor() {
    this.tasks = [];
  }

  addTask(newTask) {
    this.tasks.push(newTask);
    this.updateStorage();
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
    this.updateStorage();
  }

  deleteTask(indexToDelete) {
    removeTaskFromList(indexToDelete);
    const indexOfTaskToDelete = this.tasks.findIndex((task) => task.index === +indexToDelete);
    this.tasks.splice(indexOfTaskToDelete, 1);
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTaskDescription(description, indexTarget) {
    const result = this.tasks.find((task) => task.index === +indexTarget);
    if (result !== undefined) {
      result.description = description;
      this.updateStorage();
    }
  }

  updateCompleted(indexTarget) {
    const taskToUpdate = this.tasks.find((task) => task.index === +indexTarget);
    taskToUpdate.completed = !taskToUpdate.completed;
  }

  clearCompleted() {
    this.tasks = this.tasks.filter((task) => {
      if (task.completed === true) {
        removeTaskFromList(task.index);
      }
      return task.completed === false;
    });
    this.updateStorage();
  }
}
