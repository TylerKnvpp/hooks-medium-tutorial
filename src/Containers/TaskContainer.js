import React from "react";
import Task from "../Components/Task";

export const TaskContainer = props => {
  const renderTasks = props.incompleteTasks.map(taskObj => {
    return (
      <Task
        key={taskObj.id}
        task={taskObj}
        handleCompleted={props.handleCompleted}
      />
    );
  });

  return (
    <div className="task-card">
      <h3>Tasks:</h3>
      {renderTasks}
    </div>
  );
};
