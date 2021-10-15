import _ from 'lodash';
import printMe from './print.js';
import './style.css';
import Icon from './enter.png';
import Icon2 from './icons8-available-updates-96.png';
import Icon3 from './options.png';
import Icon4 from './icons8-delete-64.png';

class TDL {
  constructor() {
    this.createTDL();
    this.listOfItems = [];
    this.checks = [];
    this.id = [];
    if (JSON.parse(localStorage.getItem('id') !== null)) {
    this.id = JSON.parse(localStorage.getItem('id'));
    }
    if (JSON.parse(localStorage.getItem('checks') !== null)) {
      this.checks= JSON.parse(localStorage.getItem('checks'));
      }
    if (localStorage.getItem('data-list') !== null) {
      this.listOfItems = JSON.parse(localStorage.getItem('data-list'));
      console.log(this.listOfItems);
      this.displayTask();
    }
  }
  createTDL() {
    const wrapper = document.createElement('section');
    wrapper.id = 'container';
    const container = document.createElement('div');
    container.id = 'CON';
    const firstCon = document.createElement('div');
    firstCon.id = 'Con';
    const heading = document.createElement('p');
    heading.innerText = "Today's To Do List";
    const resetButton = document.createElement('button');
    resetButton.className = 'RB';
    resetButton.addEventListener('click', () => {
      resetButton.className = 'Rbutton';
      console.log(this.id);
      this.id.forEach((id) => {
        console.log(document.getElementById(id));
        document.getElementById(id).parentElement.remove();
        const index = this.listOfItems.findIndex((list) => list.id === id);
         this.listOfItems.splice(index, 1);
         console.log(this.listOfItems);
         localStorage.setItem('data-list', JSON.stringify(this.listOfItems));
      });
      this.id = [];
      localStorage.setItem('id', JSON.stringify(this.id));

      this.checks = [];
      localStorage.setItem('checks', JSON.stringify(this.checks));
    });
    const resetIcon = document.createElement('img');
    resetIcon.src = Icon2;
    resetIcon.id = 'resetBTN';
    const secondCon = document.createElement('div');
    secondCon.id = 'Con';
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Add to your list...';
    input.id = 'add';
    input.addEventListener('change', () => {
      event.preventDefault();
      if (input.value !== this.listOfItems.id) {
      resetButton.className = 'RB';
      this.addTask();
      form.reset();
      }
    });
    const enterBTN = document.createElement('button');
    enterBTN.id = 'enterBTN';
    enterBTN.addEventListener('click', () => {
      event.preventDefault();
      resetButton.className = 'RB';
      this.addTask();
      form.reset();
    });
    const enterIcon = document.createElement('img');
    enterIcon.src = Icon;
    enterIcon.id = 'enterIcon';
    const ul = document.createElement('ul');
    ul.id = 'list';
    const thirdCon = document.createElement('div');
    thirdCon.id = 'Con1';
    const clearBTN = document.createElement('button');
    clearBTN.innerText = 'Clear all completed';
    clearBTN.id = 'clearBTN';
    clearBTN.addEventListener('click', () => {
       this.clearAllCompleted();
    });

    enterBTN.appendChild(enterIcon);
    firstCon.appendChild(heading);
    resetButton.appendChild(resetIcon);
    firstCon.appendChild(resetButton);
    form.appendChild(input);
    secondCon.appendChild(form);
    secondCon.appendChild(enterBTN);
    thirdCon.appendChild(clearBTN);
    container.appendChild(firstCon);
    container.appendChild(secondCon);
    container.appendChild(ul);
    container.appendChild(thirdCon);
    wrapper.appendChild(container);
    document.body.appendChild(wrapper);
  }

  addTask() {
    const input = { task: document.getElementById('add').value };
    console.log(input);

    const ul = document.getElementById('list');
    ul.style.display = "grid";
    const li = document.createElement('li');
    li.className = 'Task';
    li.draggable = 'true';
    const conBTN = document.createElement('button');
    conBTN.className = 'CB';

    const checkBoxCon = document.createElement('div');
    checkBoxCon.className = 'CBC';
    const checkBox = document.createElement('input');
    checkBox.className = 'cBox';
    checkBox.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    checkBox.type = 'checkbox';
    checkBox.addEventListener('change', () => {
      if (this.checks) {
        this.checks.push(checkBox.id);
        localStorage.setItem('checks', JSON.stringify(this.checks));
        console.log(checkBox.id);
      }
    });
    this.id.push(checkBox.id);
    localStorage.setItem('id', JSON.stringify(this.id));
    const label = document.createElement('input');
    label.className = 'tasks';
    label.value = input.task;
    label.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        // const record = this.listOfItems;
        console.log(value);
        const index = this.listOfItems.findIndex((list) => list.task === input.task);
        this.listOfItems.splice(index, 1);
        console.log(index);
        console.log(this.listOfItems);
     this.listOfItems.unshift({
      task: label.value, 
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
     });
     console.log(this.listOfItems);
     localStorage.setItem('data-list', JSON.stringify(this.listOfItems));
     this.id.splice(index, 1);
     localStorage.setItem('id', JSON.stringify(this.id));
     console.log(this.id);
    }
    });
    const optionsBTN = document.createElement('button');
    optionsBTN.className = 'optionsBTN';

    const optionsIcon = document.createElement('img');
    optionsIcon.className = 'optionsIcon';
    optionsIcon.src = Icon3;

    conBTN.addEventListener('click', () => {
      optionsIcon.src = Icon4;
      conBTN.style.backgroundColor = 'rgba(0, 151, 151, 0.631)';

      optionsBTN.addEventListener('click', () => {
        conBTN.parentElement.remove();
        const index = this.listOfItems.findIndex((list) => list.id === checkBox.id);
        this.listOfItems.splice(index, 1);
        console.log(this.listOfItems);
        localStorage.setItem('data-list', JSON.stringify(this.listOfItems));

        const indexID = this.id.findIndex((id) => id === checkBox.id);
        this.id.splice(indexID, 1);
        console.log(this.id);
        localStorage.setItem('id', JSON.stringify(this.id));

        const checksID = this.checks.findIndex((check) => check === checkBox.id);
        this.checks.splice(checksID, 1);
        console.log(this.checks);
        localStorage.setItem('checks', JSON.stringify(this.checks));
      });
    });

    optionsBTN.appendChild(optionsIcon);
    checkBoxCon.appendChild(label);
    conBTN.appendChild(checkBoxCon);
    conBTN.appendChild(optionsBTN);
    li.appendChild(checkBox);
    li.appendChild(conBTN);

    ul.appendChild(li);

    this.listOfItems.push({
      task: input.task, 
      id: checkBox.id,
    });

    localStorage.setItem('data-list', JSON.stringify(this.listOfItems));
  }
  displayTask() {
    this.listOfItems.forEach((listOfItems) => {
      const ul = document.getElementById('list');
      ul.style.display = "flex";
      const li = document.createElement('li');
      li.className = 'Task';
      const conBTN = document.createElement('button');
      conBTN.className = 'CB';

      const checkBoxCon = document.createElement('div');
      checkBoxCon.className = 'CBC';
      const checkBox = document.createElement('input');
      checkBox.className = 'cBox';
      checkBox.id = listOfItems.id;
      checkBox.type = 'checkbox';
      checkBox.addEventListener('change', () => {
        if (this.checks) {
          this.checks.push(checkBox.id);
          console.log(checkBox.id);
        }
      }); 
      const label = document.createElement('input');
      label.className = 'tasks';
      label.value = listOfItems.task;
      let value = listOfItems.task;
      label.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          console.log(value);
          const index = this.listOfItems.findIndex((list) => list.task === value);
          this.listOfItems.splice(index, 1);
          console.log(index);
          console.log(this.listOfItems);
       this.listOfItems.unshift({
        task: label.value, 
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
       });
       console.log(this.listOfItems);
       localStorage.setItem('data-list', JSON.stringify(this.listOfItems));
       this.id.splice(index, 1);
       localStorage.setItem('id', JSON.stringify(this.id));
       console.log(this.id);
      }
      });
      console.log(listOfItems);
      const optionsBTN = document.createElement('button');
      optionsBTN.className = 'optionsBTN';
          optionsBTN.addEventListener('click', () => {
      console.log('button works');
    });
      const optionsIcon = document.createElement('img');
      optionsIcon.className = 'optionsIcon';
      optionsIcon.src = Icon3;

      conBTN.addEventListener('click', () => {
        optionsIcon.src = Icon4;
        conBTN.style.backgroundColor = 'rgba(0, 151, 151, 0.631)';
        optionsBTN.addEventListener('click', () => {
          conBTN.parentElement.remove();
          const index = this.listOfItems.findIndex((list) => list.id === checkBox.id);
          this.listOfItems.splice(index, 1);
          console.log(this.listOfItems);
          localStorage.setItem('data-list', JSON.stringify(this.listOfItems));
  
          const indexID = this.id.findIndex((id) => id === checkBox.id);
          this.id.splice(indexID, 1);
          console.log(this.id);
          localStorage.setItem('id', JSON.stringify(this.id));
  
          const checksID = this.checks.findIndex((check) => check === checkBox.id);
          this.checks.splice(checksID, 1);
          console.log(this.checks);
          localStorage.setItem('checks', JSON.stringify(this.checks));
        });
      });
  
      optionsBTN.appendChild(optionsIcon);
      checkBoxCon.appendChild(label);
      conBTN.appendChild(checkBoxCon);
      conBTN.appendChild(optionsBTN);
      li.appendChild(checkBox);
      li.appendChild(conBTN);
  
      ul.appendChild(li);
    });
  }
  clearAllCompleted() {
     console.log(this.checks);

     this.checks.forEach((check) => {
       document.getElementById(check).parentElement.remove();
       const index = this.listOfItems.findIndex((list) => list.id === check);
        this.listOfItems.splice(index, 1);
        console.log(this.listOfItems);
        localStorage.setItem('data-list', JSON.stringify(this.listOfItems));

        const indexID = this.id.findIndex((id) => id === check);
        this.id.splice(indexID, 1);
        console.log(this.id);
        localStorage.setItem('id', JSON.stringify(this.id));
     });
     this.checks = [];
}
}

const tdl = new TDL();
console.log(tdl.listOfItems);
// localStorage.clear();

