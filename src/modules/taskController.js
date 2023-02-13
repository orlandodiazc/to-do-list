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
    const taskToMove = this.tasks.splice(+movedIndex, 1)[0];
    if (afterIndex == null) {
      this.tasks.push(taskToMove);
    } else if (+movedIndex <= +afterIndex) {
      this.tasks.splice(afterIndex - 1, 0, taskToMove);
    } else {
      this.tasks.splice(afterIndex, 0, taskToMove);
    }
    this.updateIndexes();
    this.updateStorage();
  }

  deleteTask(indexToDelete) {
    this.tasks = this.tasks.filter((task) => task.index !== +indexToDelete);
    this.updateIndexes();
    this.updateStorage();
    return this.tasks;
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
    return this.tasks;
  }

  updateIndexes() {
    this.tasks.forEach((task, i) => {
      task.index = i;
    });
  }

  updateCompleted(indexTarget) {
    const taskToUpdate = this.tasks.find((task) => task.index === +indexTarget);
    taskToUpdate.completed = !taskToUpdate.completed;
    this.updateStorage();
    return this.tasks;
  }

  clearCompleted() {
    this.tasks = this.tasks.filter((task) => task.completed === false);
    this.updateIndexes();
    this.updateStorage();
    return this.tasks;
  }
}
