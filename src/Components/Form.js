import React, { useState } from "react";

export const Form = props => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (newTask) {
      props.handleSubmit(newTask);
    } else {
      alert("Please fill out the field");
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Please enter a task below:</h3>
      <label>Task:</label>
      <br />
      <input className="field" onChange={e => setNewTask(e.target.value)} />
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};
