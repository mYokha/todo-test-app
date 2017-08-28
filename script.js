let app = (function () {
  let tasks = [];
  let oreder;

  //initialize
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  const amount = tasks.length;
  order = amount ? amount + 1 : 1;

  //cache DOM
  const form = document.querySelector('form');
  const input = document.getElementById('text-input');
  const list = document.getElementById('todo-list');
  const item = list.getElementsByClassName('item');
  const sortByName = document.getElementById('sort-by-name');
  const sortByOrder = document.getElementById('sort-by-order');
  const deleteButtons = document.getElementsByClassName('remove-item');
  const items = document.getElementsByClassName('item');

  //bind events
  form.addEventListener('submit', e => {
    e.preventDefault();
    addTask();
  });

  //let's finally render this thing
  render();

  sortByOrder.addEventListener('click', () => sortById());
  sortByName.addEventListener('click', () => sortByValue());

  list.addEventListener('click', e => {
    if (!e.target.classList.contains('remove-item')) return;
    const taskId = parseInt(e.target.parentElement.dataset.id, 10);
    deleteTask(taskId);
  });

  list.addEventListener('click', e => {
    if (!e.target.matches('input')) return;
    const taskId = parseInt(e.target.parentElement.parentElement.dataset.id, 10);
    toggleDone(taskId);
  });

  function addTask (value = input.value) {
    if (value) {
      tasks.push({
        id: order,
        value,
        checked: false
      });

      form.reset();
      order++;
      render();
    } else {
      alert(`You've tried to enter an empty value!`);
    }
  };

  function deleteTask (id) {
    if (!(/^[1-9]\d*$/.test(id))){
      alert (`Must be positive integers only!`);
      return;
    }
    if (id > tasks.length) {
        alert(`No task with this id!`);
        return;
    }

    tasks = tasks.filter(task => task.id !== id);

    order = 1;
    tasks.forEach(task => {
      id = order;
      order++;
    });

    render();
  };

  function toggleDone (id) {
    tasks = tasks.map(task => {
      if (task.id === id) {
        task.checked = !task.checked;
      }

      return task;
    });

    render();
  };

  function sortById () {
    tasks = tasks.sort((a, b) => a.id - b.id);
    render();
  };

  function sortByValue () {
    tasks = tasks.sort((a, b) => a.value > b.value);
    render();
  };

  function templateItem (item) {
    return `
      <div class="item df" data-id="${item.id}">
        <div class="df checkbox">
          <input type="checkbox" ${item.checked ? 'checked' : ''}>
        </div>
        <div class="item-value">
          <span class="item-id">${item.id}.</span><span${item.checked ? ' class="item-checked"' : ''}>${item.value}</span>
        </div>
        <div class="remove-item">✕</div>
      </div>
    `;
  };

  function render () {
    let data = {
      tasks,
      html: ''
    };

    data.tasks.forEach(task => {
      data.html += templateItem(task);
    });

    list.innerHTML = data.html;

    localStorage.setItem('tasks', JSON.stringify(tasks));

    console.table(tasks);
  };

  return {
    addTask,
    deleteTask,
    sortById,
    sortByValue
  };

})();
