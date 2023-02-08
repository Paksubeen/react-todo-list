import { useState } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #cccccc;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  border-radius: 16px;
  border: 1px solid #888888;
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #85b5ff;
      background: #85b5ff;
      color: #ffffff;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 20px;
  color: #444444;
  ${(props) =>
    props.done &&
    css`
      color: #888888;
      text-decoration: line-through;
    `}
`;

function TodoItem({ id, done, text }) {
  const [isDone, setIsDone] = useState(done);
  console.log(isDone);

  const onCheck = () => {
    setIsDone(!isDone);
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        done: !isDone,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={isDone} onClick={onCheck}>
        {isDone && <MdDone />}
      </CheckCircle>
      <Text done={isDone}>{text}</Text>
      <Remove>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
