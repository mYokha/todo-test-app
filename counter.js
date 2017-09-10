// Counter component
const counter = (function (){
  let count = {};

  // Cache DOM
  const allTasksElem = document.getElementById('all-tasks');
  const activeTasksElem = document.getElementById('active-tasks');
  const doneTasksElem = document.getElementById('done-tasks');

  events.on('tasksChanged', setCounter);

  function render () {
    allTasksElem.innerHTML = count.general;
    activeTasksElem.innerHTML = count.active;
    doneTasksElem.innerHTML = count.done;
  }

  function setCounter (newTasks) {
    count.general = newTasks.length;
    count.done = 0;
    count.active = 0;

    newTasks.forEach(task => {
      if (task.checked) {
        count.done++;
      } else {
        count.active++;
      }
    });
    render ();
    return count;
  }
})();
