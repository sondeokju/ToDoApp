const app = document.getElementById("js-app");

app.innerHTML = `
  <h1>To Do App</h2>
  <form class="js-form">
    <input type="text" placeholder="Write to do" />
    <input type="submit" value="Add to do" />
  </form>
  <div class="js-uncompleted">
    <h2>Uncompleted</h2>
    <ul>  
    </ul>
  </div>
    <div class="js-completed">
    <h2>Completed</h2>
    <ul>
    </ul>
  </div>
`;

const form = document.querySelector(".js-form"),
  input = form.querySelector("input[type='text']"),
  uncompleteList = document.querySelector(".js-uncompleted ul"),
  completeList = document.querySelector(".js-completed ul");

const createListItem = text => {
  const listItem = document.createElement("li");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.name = "check";
  const label = document.createElement("label");
  label.innerHTML = text;
  label.htmlfor = "check";
  const edditBtn = document.createElement("button");
  edditBtn.innerHTML = "edit";
  edditBtn.classList.add("js-edit");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "delete";
  deleteBtn.classList.add("js-delete");
  listItem.appendChild(input);
  listItem.appendChild(label);
  listItem.appendChild(edditBtn);
  listItem.appendChild(deleteBtn);
  return listItem;
};

const completeToDo = event => {
  const button = event.target;
  const listItem = button.parentElement;
  const parentList = listItem.parentElement;
  parentList.removeChild(listItem);
  listItem.classList.add("completed");
  completeList.prepend(listItem);
  addEvents(listItem, uncompleteToDo);
};

const uncompleteToDo = event => {
  const button = event.target;
  const listItem = button.parentElement;
  const parentList = listItem.parentElement;
  listItem.classList.remove("completed");
  parentList.removeChild(listItem);
  uncompleteList.prepend(listItem);

  addEvents(listItem, completeToDo);
};

const deleteToDo = event => {
  const button = event.target;
  const listItem = button.parentElement;
  const parentList = listItem.parentElement;
  parentList.removeChild(listItem);
};

const editToDo = event => {
  const listItem = event.target.parentElement;
  const label = listItem.querySelector("label");
  const newValue = prompt("Edit To Do", label.innerHTML);
  if (newValue === "") {
    alert("Cant input empty value");
    return;
  }
  label.innerHTML = newValue;
};

const handleFormSubmit = event => {
  event.preventDefault();
  if (input.value === "") {
    alert("Cant input empty value");
    return;
  }
  const task = createListItem(input.value);
  uncompleteList.prepend(task);
  addEvents(task, completeToDo);
  input.value = "";
};

const addEvents = (listItem, checkboxFn) => {
  const editBtn = listItem.querySelector("button.js-edit");
  const deleteBtn = listItem.querySelector("button.js-delete");
  const checkBox = listItem.querySelector("input[type='checkbox']");
  editBtn.onclick = editToDo;
  deleteBtn.onclick = deleteToDo;
  checkBox.onclick = checkboxFn;
};

form.addEventListener("submit", handleFormSubmit);
