import { useEffect, useState } from "react";
import "./App.css";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/TodoTemplate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  const [todos, setTodos] = useState([]);
  const leftTasks = todos.filter((todo) => todo.done === false);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setTodos(data);
      });
  }, []);

  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead leftTasks={leftTasks.length} />
        <TodoList todos={todos} />
        <TodoCreate />
      </TodoTemplate>
    </>
  );
}

export default App;
