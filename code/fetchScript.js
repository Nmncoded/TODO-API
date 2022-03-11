let ul = document.querySelector(`ul`);
let input = document.querySelector(`#text`);
let itemsLeft = document.querySelector(`.itemsleft`).firstElementChild;
let icon = document.querySelector(`.icon i`);
let clrCmplted = document.querySelector(`.clear`);
let all = document.querySelector(`.all`);
let active = document.querySelector(`.active`);
let completed = document.querySelector(`.completed`);
let footer = document.querySelector(`footer`);
let isActive = 'all';
let isclrcmp = 'all';
let url = `https://basic-todo-api.vercel.app/api/`;

function handleInput(event) {
  let value = event.target.value;
  if (event.keyCode === 13 && value !== '') {
    let data = {
      todo: {
        title: value,
        isCompleted: false,
      },  
    };
    fetch(url + `todo`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => fetchData());
    event.target.value = '';
  }
}

function handleDelete(id) {
  fetch(url + `todo/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then(() => {
    fetchData();
  });
  // fetchData();
}

function handleToggle(status, id) {
  let data = {
    todo: {
      isCompleted: !status,
    },
  };
  fetch(url + `todo/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then(() => fetchData());
  // fetchData();
}

function createUI(data, rootElm = ul) {
  rootElm.innerHTML = '';
  data.forEach((todo) => {
    let li = document.createElement(`li`);
    li.classList.add(`li`);
    let div = document.createElement(`div`);
    div.classList.add(`name`);
    let inputCheck = document.createElement(`input`);
    inputCheck.type = 'checkbox';

    // inputCheck.setAttribute(`data-id`, `${index}`);
    inputCheck.addEventListener(`input`, () =>
      handleToggle(todo.isCompleted, todo._id)
    );
    inputCheck.checked = todo.isCompleted;

    let p = document.createElement(`p`);
    p.innerText = `${todo.title}`;
    let span = document.createElement(`span`);
    span.classList.add(`spantext`);
    span.innerText = 'X';

    span.addEventListener(`click`, () => {
      handleDelete(todo._id);
    });
    // span.setAttribute(`data-id`, `${index}`);

    div.append(inputCheck, p);
    li.append(div, span);

    rootElm.append(li);
  });
}

function fetchData() {
  fetch(url + 'todo')
    .then((res) => res.json())
    .then((allTodos) => {
      console.log(allTodos.todos);
      createUI(allTodos.todos);
    });
}

input.addEventListener(`keyup`, handleInput);
fetchData();


