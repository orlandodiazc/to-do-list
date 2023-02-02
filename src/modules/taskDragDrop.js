export default function initializeDragDrop() {
  const taskContainer = document.querySelector('.task-list');

  function getDragAfterElement(y) {
    const dragabbleTasks = [...taskContainer.querySelectorAll('.task-list li:not(.dragging)')];
    return dragabbleTasks.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY },
    ).element;
  }
  let previousAfterElement;
  taskContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const currentDrag = document.querySelector('.dragging');
    const y = e.clientY || e.touches[0].clientY;
    const afterElement = getDragAfterElement(e.clientY);
    if (previousAfterElement !== undefined) previousAfterElement.classList.remove('after-element');
    if (afterElement == null) {
      taskContainer.appendChild(currentDrag);
    } else {
      taskContainer.insertBefore(currentDrag, afterElement);
      afterElement.classList.add('after-element');
    }
    previousAfterElement = afterElement;
  });
}
