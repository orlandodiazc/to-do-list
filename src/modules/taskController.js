import { removeTaskFromList } from "./taskDisplay";

export default class TaskLibrary {
  constructor() {
    this.tasks = [];
  }

  addTask(newTask) {
    this.tasks.push(newTask);
  }

  deleteTask(indexToDelete) {
    // const indexToDelete = this.tasks.findIndex((task) => task.index === +taskIndex);
    // if (indexToDelete < this.tasks.length) {
    //   this.tasks.splice(indexToDelete, 1);
    //   this.tasks.map((task, i) => {
    //     if (i >= indexToDelete) {
    //       task.index = task.index - 1;
    //     }
    //   });
    // }
    removeTaskFromList(indexToDelete);
    this.tasks.splice(indexToDelete, 1);
    if (indexToDelete < this.tasks.length) {
      this.tasks.map((task, i) => {
        if (i >= indexToDelete) {
          task.index = task.index - 1;
        }
      });
    }
  }

  editTaskDescription(description, indexTarget) {
    const result = this.tasks.find((task) => task.index === +indexTarget);
    result.description = description;
    console.log(this.tasks)
  }

  updateCompleted(indexTarget) {
    const taskToUpdate = this.tasks.find((task) => task.index === +indexTarget);
    taskToUpdate.completed = !taskToUpdate.completed;
  }

  clearCompleted(taskList) {
    this.tasks = this.tasks.filter((task) => {
      if (task.completed) {
        removeTaskFromList(task.index);
      }
      return task.completed === false
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
