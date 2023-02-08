import { useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";

const CircleButton = styled.button`
  background: #85b5ff;
  &:hover {
    background: #95befd;
  }
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  position: absolute;
  border-radius: 50%;
  border: none;
  outline: none;
  font-size: 48px;
  color: #ffffff;
  cursor: pointer;
  left: 50%;
  bottom: 8px;
  transform: translate(-50%, 50%);
  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  left: 0;
  bottom: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f8fa;
  padding: 32px 32px 80px 32px;
  border-top: 1px solid #e9ecef;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #888888;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const onToggle = () => setOpen(!open);
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: value,
        done: false,
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
    setValue("");
    setOpen(false);
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="할 일을 입력 후 Enter를 누르세요"
              value={value}
              onChange={onChange}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default TodoCreate;
