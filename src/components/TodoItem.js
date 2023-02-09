import { useState } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdEdit, MdAutoFixHigh, MdDelete } from "react-icons/md";

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
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

const EditForm = styled.form`
  flex: 1;
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

const EditText = styled.input`
  width: 100%;
  padding: 3px 0;
  border: none;
  outline: none;
  font-size: 20px;
  color: #444444;
  border-bottom: 1px solid #e9ecef;
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  margin-right: 8px;
  font-size: 24px;
  color: #cccccc;
  cursor: pointer;
  &:hover {
    color: #5588fe;
  }
`;

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
`;

function TodoItem({ id, done, text }) {
  const [value, setValue] = useState(text);
  const [isDone, setIsDone] = useState(done);
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => setIsEdit(!isEdit);
  const onChange = (e) => setValue(e.target.value);
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
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  const onSubmit = () => {
    setIsEdit(!isEdit);
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: value,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  const onRemove = () => {
    fetch(`http://localhost:3001/todos/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then(() => {
        window.location.reload();
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
      {!isEdit ? (
        <Text done={isDone}>{text}</Text>
      ) : (
        <EditForm onSubmit={onSubmit}>
          <EditText
            autoFocus
            placeholder="할 일을 입력 후 Enter를 누르세요"
            value={value}
            onChange={onChange}
          ></EditText>
        </EditForm>
      )}
      <Edit>
        {!isEdit ? (
          <MdEdit onClick={onEdit} />
        ) : (
          <MdAutoFixHigh onClick={onSubmit} />
        )}
      </Edit>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
