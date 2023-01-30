import { removeTaskFromList, updateIndexes } from './taskDisplay';

export default class TaskLibrary {
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
          task.index = task.index - 1;
          updateIndexes(task.index);
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

  clearCompleted(taskList) {
    for (let i = this.tasks.length - 1; i >= 0; i--) {
      console.log(this.tasks[i]);
      if (this.tasks[i].completed) {
        this.deleteTask(i);
      }
    }
  }
}
