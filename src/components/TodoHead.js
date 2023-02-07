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

function TodoHead({ leftTasks }) {
  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks">{leftTasks} Tasks</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
