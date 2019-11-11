import React from "react";
import Task from "../Components/Task";

export const CompletedContainer = props => {
  const renderTasks = props.completedTasks.map(taskObj => {
    return <Task key={taskObj.id} task={taskObj} />;
  });

  return (
    <div className="task-card">
      <h3>Completed:</h3>
      {renderTasks}
    </div>
  );
};
