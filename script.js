(function () {

  // Cache DOM
  const form = document.querySelector('form');
  const input = document.getElementById('text-input');
  const list = document.getElementById('todo-list');
  const sortByNameButton = document.getElementById('sort-by-name');
  const sortByDateButton = document.getElementById('sort-by-date');

  // Application
  const app = (function () {
    let tasks = [];

    // Initialize
    if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    function render () {
      let data = {
        tasks,
        html: ''
      };

      data.tasks.forEach((task, index) => {
        data.html += templateItem(task, index);
      });

      list.innerHTML = data.html;

      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    render();

    function addTask (value) {
      if (value) {
        tasks.push({
          id: Date.now(),
          value,
          checked: false
        });
        form.reset();
        render();
      } else {
        alert('You\'ve tried to enter an empty value!');
      }
    }

    function deleteTask (id) {
      tasks = tasks.filter(task => task.id !== id);

      render();
    }

    function toggleDone (id) {
      tasks = tasks.map(task => {
        if (task.id === id) {
          task.checked = !task.checked;
        }

        return task;
      });

      render();
    }

    function sortByDate () {
      tasks = tasks.sort((a, b) => a.id - b.id);
      render();
    }

    function sortByValue () {
      tasks = tasks.sort((a, b) => a.value > b.value);
      render();
    }

    function templateItem (item, i) {
      return `
        <div class="item df" data-id="${item.id}">
          <div class="creation-date df">${new Date(item.id)}</div>
          <div class="df item-inner-content">
            <div class="df checkbox">
              <input type="checkbox" ${item.checked ? 'checked' : ''}>
            </div>
            <div class="item-value df">
              <span class="item-order">${i + 1}.</span><span class="${item.checked ? ' item-checked"' : '"'}>${item.value}</span>
            </div>
            <div class="remove-item">✕</div>
          </div>
        </div>
      `;
    }

    return {
      addTask,
      deleteTask,
      sortByDate,
      sortByValue,
      toggleDone
    };
  })();

  // Handle events
  function handleSubmit (e) {
    e.preventDefault();
    app.addTask(input.value);
  }

  function handleDeletion (e) {
    if (!e.target.classList.contains('remove-item')) return;
    const taskId = parseInt(e.target.parentElement.parentElement.dataset.id, 10);
    app.deleteTask(taskId);
  }

  function handleDone (e) {
    if (!e.target.matches('input')) return;
    const taskId = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id, 10);

    app.toggleDone(taskId);
  }

  // Bind events
  form.addEventListener('submit', handleSubmit);
  list.addEventListener('click', handleDeletion);
  list.addEventListener('click', handleDone);
  sortByDateButton.addEventListener('click', app.sortByDate);
  sortByNameButton.addEventListener('click', app.sortByValue);
})();
