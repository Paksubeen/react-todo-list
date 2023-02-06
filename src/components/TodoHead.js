import styled from "styled-components";

const TodoHeadBlock = styled.div`
  padding: 32px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
  }
  .day {
    margin-top: 4px;
    color: #888888;
    font-size: 20px;
  }
  .tasks {
    margin-top: 16px;
    color: #20c888;
    font-size: 18px;
    font-weight: bold;
  }
`;

function TodoHead() {
  return (
    <TodoHeadBlock>
      <h1>2023년 2월 5일</h1>
      <div className="day">일요일</div>
      <div className="tasks">5 Tasks</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
