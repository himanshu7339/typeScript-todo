import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todoContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const myFrom = document.getElementById("myFrom") as HTMLFormElement;

onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodo(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";
  // creating the checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) {
        item.isCompleted = checkBox.checked;
      }
    });
    paragraph.className = checkBox.checked ? "textCut" : "";
  };

  // Creating p for title
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  if (isCompleted == true) {
    paragraph.className = "textCut";
  }

  // creating the delete button
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  };

  // appending the to todo list
  todo.append(checkBox, paragraph, btn);
  todoContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodo(todos);
};

const renderTodo = (todos: Todo[]): void => {
  todoContainer.innerText = "";
  todos.forEach((item) => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
};
