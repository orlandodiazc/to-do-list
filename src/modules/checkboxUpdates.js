export const updateCompletedStatus = (tasks, indexTarget) => {
  const result = tasks.find((task) => task.index === +indexTarget);
  result.completed = !result.completed;
};

export const clearCompletedTasks = (tasks, taskList) => {
  tasks.forEach(task => {
    if (task.completed === true){
      const activeTask = taskList.querySelector(`input[data-index="${task.index}"]`)
      taskList.removeChild(activeTask.parentNode.parentNode);
    }
  });
  return tasks.filter((task) => task.completed === false);
};
