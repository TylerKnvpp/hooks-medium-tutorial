import React from "react";

const Task = props => {
  const handleClick = e => {
    e.preventDefault();
    props.handleCompleted(props.task);
  };

  return (
    <div className="task">
      <div className="inline-task">
        {!props.task.completed ? (
          <button className="button" onClick={handleClick}></button>
        ) : null}
        <h4>{props.task.task}</h4>
      </div>
    </div>
  );
};

export default Task;
