(function () {
  let app = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    //tasks: [],
    task: '',
    order: 1,
    init () {
      this.cacheDOM();
      this.bindEvents();
      this.render();
    },

    cacheDOM () {
      this.form = document.querySelector('form');
      this.input = this.form.querySelector('[name=task]');
      this.list = document.querySelector('#todo-list');
      this.item = this.list.querySelectorAll('.item');
      //this.checkbox = this.item.querySelectorAll('.checkbox');
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
      this.sortByOrder.addEventListener('click', () => this.sortById());
      this.sortByName.addEventListener('click', () => this.sortByValue());

      this.list.addEventListener('click',(e)=>{
        if(!e.target.matches('input')) return;
        console.log(e.target);
        this.toggleDone();
      });

      this.list.addEventListener('click',(e)=>{
        if(!e.target.className === 'remove-item') return;
        this.deleteTask(parseInt(e.target.parentElement.dataset.id, 10));
      });
      /*
      this.list.addEventListener('click', function(e) {
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
        return;
      }

    },

    deleteTask (id) {
      console.table(this.tasks);
      this.tasks = this.tasks.filter(task => task.id !== id);


      this.order = 1;
      this.tasks.forEach(task => {
        task.id = this.order;
        this.order++;
      });

      this.render();
    },

    toggleDone () {
      console.log('triggered');
      //this.render();
    },

    sortById () {
      this.tasks = this.tasks.sort((a,b) => a.id - b.id);
      this.render();
    },

    sortByValue () {
      this.tasks = this.tasks.sort((a, b) => {
        const x = a.value.toLowerCase();
        const y = b.value.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
      this.render();
    },

    templateItem (item) {
      return `
        <div class="item df" data-id="${item.id}">
          <div class="df checkbox">
            <input type="checkbox" ${item.checked ? 'checked' : ''}>
          </div>
          <div class="item-value">
            <span class="id">${item.id}.</span>${item.value}
          </div>
          <div class="remove-item">
            ✕
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
        data.html += this.templateItem(task);
      });
      this.list.innerHTML = data.html;

      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      //this.bindEvents();
      //console.log(this.tasks);
    }

  };

  app.init();
})();
