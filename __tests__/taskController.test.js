import TaskController from '../src/modules/taskController.js';

describe('taskController functions', () => {
  let taskController;
  const newTask = { description: 'hola', completed: false, index: 0 };
  const initializeController = () => {
    taskController = new TaskController();
  };

  describe('Add and remove tasks from task array', () => {
    beforeEach(() => initializeController());
    it('length of returned array should be 1', () => {
      expect(taskController.addTask(newTask)).toHaveLength(1);
    });

    it('array should have one element with the input object', () => {
      expect(taskController.addTask(newTask)).toContainEqual(newTask);
    });

    it('length of returned array should be 0', () => {
      taskController.addTask(newTask);
      expect(taskController.deleteTask(0)).toHaveLength(0);
    });
  });

  describe('edit and update task descriptions', () => {
    beforeEach(() => initializeController());
    it('description of returned array element should be "abc"', () => {
      taskController.addTask(newTask);
      expect(taskController.editTaskDescription('abc', 0)[0].description).toBe('abc');
    });

    it('status of completed should toggle between false and true', () => {
      taskController.addTask(newTask);
      expect(taskController.updateCompleted(0)[0].completed).toBeTruthy();
      expect(taskController.updateCompleted(0)[0].completed).toBeFalsy();
    });
  });

  describe('clear all completed tasks', () => {
    beforeEach(() => initializeController());
    it('returned array should only have uncompleted tasks', () => {
      document.body.innerHTML = '<ul class="task-list"><li class="list-item"></></ul>';
      taskController.addTask(newTask);
      taskController.addTask({ description: 'mundo', completed: true, index: 1 });
      taskController.addTask({ description: 'nuevo', completed: true, index: 2 });
      expect(taskController.clearCompleted()).toHaveLength(1);
    });
  });
});
