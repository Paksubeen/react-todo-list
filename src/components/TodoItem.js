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
  return (
    <TodoItemBlock>
      <CheckCircle done={done}>{done && <MdDone />}</CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
