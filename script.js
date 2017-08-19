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
      this.deleteButtons = document.querySelectorAll('.remove-item');
      this.items = document.querySelectorAll('.item');
    },

    bindEvents () {
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        this.addTask();
      });
      this.sortByOrder.addEventListener('click', () => this.sortById(this.tasks));
      this.sortByName.addEventListener('click', () => this.sortByValue(this.tasks));
      /*this.list.addEventListener('click', function(e) {
        if (event.target.className.toLowerCase() === 'remove-item'){
          this.deleteTask(e);
          console.log('click!!!');
        }
      });*/
      //this.list.addEventListener('click', (e) => this.deleteTask(e));
      /*
      this.items.forEach(item => {
        item.addEventListener('click', e => {
          if (event.target.className.toLowerCase() === 'remove-item'){
            this.deleteTask(e);
            console.log('click!!!');
          }
        }
        );
      });*/
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

    deleteTask (id) {

      this.tasks = this.tasks.filter(task => task.id !== id);
      this.order = 0;
      this.tasks.forEach(task => {
        task.id = this.order;
        this.order++;
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

      //console.log(this.tasks);
    }
  };

  app.init();
})();
