(function () {
  let app = {
    tasks: [],

    init () {
      if (localStorage.getItem('tasks')) {
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
      }
      const amount = this.tasks.length;
      this.order = amount ? amount + 1 : 1;

      this.cacheDOM();
      this.bindEvents();
      this.render();
    },

    cacheDOM () {
      this.form = document.querySelector('form');
      this.input = this.form.querySelector('[name=task]');
      this.list = document.getElementById('todo-list');
      this.item = this.list.querySelectorAll('.item');
      this.sortByName = document.getElementById('sort-by-name');
      this.sortByOrder = document.getElementById('sort-by-order');
      this.deleteButtons = document.querySelectorAll('.remove-item');
      this.items = document.querySelectorAll('.item');
    },

    bindEvents () {
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        this.addTask();
      });

      this.sortByOrder.addEventListener('click', () => this.sortById());
      this.sortByName.addEventListener('click', () => this.sortByValue());

      this.list.addEventListener('click', e => {
        if (!e.target.classList.contains('remove-item')) return;
        const taskId = parseInt(e.target.parentElement.dataset.id, 10);
        this.deleteTask(taskId);
      });

      this.list.addEventListener('click', e => {
        if (!e.target.matches('input')) return;
        const taskId = parseInt(e.target.parentElement.parentElement.dataset.id, 10);
        this.toggleDone(taskId);
      });
    },

    addTask () {
      if (this.input.value.length) {
        this.tasks.push({
          id: this.order,
          value: this.input.value,
          checked: false
        });

        this.form.reset();
        this.order++;
        this.render();
      } else {
        alert('You\'ve tried to enter an empty value!');
      }
    },

    deleteTask (id) {
      this.tasks = this.tasks.filter(task => task.id !== id);

      this.order = 1;
      this.tasks.forEach(task => {
        task.id = this.order;
        this.order++;
      });

      this.render();
    },

    toggleDone (id) {
      this.tasks = this.tasks.map(task => {
        if (task.id === id) {
          task.checked = !task.checked;
        }

        return task;
      });

      this.render();
    },

    sortById () {
      this.tasks = this.tasks.sort((a, b) => a.id - b.id);
      this.render();
    },

    sortByValue () {
      this.tasks = this.tasks.sort((a, b) => a.value > b.value);
      this.render();
    },

    templateItem (item) {
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
    },

    render () {
      let data = {
        tasks: this.tasks,
        html: ''
      };

      data.tasks.forEach(task => {
        data.html += this.templateItem(task);
      });

      this.list.innerHTML = data.html;

      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      console.table(this.tasks);
    }
  };

  app.init();
})();
