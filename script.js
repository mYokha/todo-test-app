(function () {
  let app = {
    tasks: [],
    task: '',
    order: 0,
    init () {
      this.cacheDOM();
      this.bindEvents();
      this.render();
    },
    cacheDOM () {
      this.form = document.querySelector('form');
      this.input = document.querySelector('[name=task]');
      this.list = document.querySelector('#todo-list');
      this.sortByName = document.querySelector('[name=sort-by-name]');
      this.sortByOrder = document.querySelector('[name=sort-by-order]');
      this.deleteButton = document.querySelectorAll('.remove-item');
    },
    bindEvents () {
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        this.addTask();
      });
      this.list.addEventListener('click', (e) => this.deleteTask(e));
    },
    addTask () {
      this.tasks.push({
        id: this.order,
        value: this.input.value,
        checked: false
      });

      this.form.reset();
      this.order++;
      this.render();
    },

    deleteTask (event) {
      const id = event.target.parentElement.dataset.id;

      this.tasks = this.tasks.filter(task => task.id != id);
      this.order = 0;
      this.tasks.forEach(task => {
        task.id = this.order;
        this.order++;
      });

      this.render();
    },

    templateItem (id, value) {
      return `
        <div class="item df" data-id="${id}">
          <input type="checkbox" class="df">
          <div class="item-value df">
            ${id + 1}. ${value}
          </div>
          <div class="remove-item df">
            ✖
          </div>
        </div>
      `;
    },
    render () {
      let data = {
        tasks: this.tasks,
        html: ''
      };

      data.tasks.forEach(task => {
        data.html += this.templateItem(task.id, task.value);
      });
      this.list.innerHTML = data.html;

      //console.log(app);
    }
  };

  app.init();
})();
