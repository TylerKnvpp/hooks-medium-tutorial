import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { TaskContainer } from "./Containers/TaskContainer";
import { Form } from "./Components/Form";
import { CompletedContainer } from "./Containers/CompletedContainer";
import _ from "lodash";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tasks/")
      .then(resp => resp.json())
      .then(response => {
        if (response) {
          setTasks(response);
          const complete = response.filter(task => task.completed);
          const incomplete = response.filter(task => !task.completed);
          setCompletedTasks(complete);
          setIncompleteTasks(incomplete);
        }
      });
  }, []);

  const handleSubmit = input => {
    if (input) {
      const newTask = {
        task: input,
        completed: false
      };
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newTask)
      })
        .then(res => res.json())
        .then(res => {
          setIncompleteTasks([...incompleteTasks, res]);
        })
        .catch(console.log);
    }
  };

  const handleCompleted = task => {
    const clone = _.clone(task);
    clone.completed = true;
    console.log(clone);
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(clone)
    })
      .then(res => res.json())
      .then(res => {
        const newIncomplete = incompleteTasks.filter(obj => obj.id !== task.id);
        setIncompleteTasks(newIncomplete);

        const newComplete = [...completedTasks, res];
        setCompletedTasks(newComplete);
      })
      .catch(console.log);
  };

  return (
    <div className="App">
      <div>
        <h1>React Hooks ToDo App</h1>
      </div>
      <Form handleSubmit={handleSubmit} />
      <TaskContainer
        incompleteTasks={incompleteTasks}
        handleCompleted={handleCompleted}
      />
      <CompletedContainer completedTasks={completedTasks} />
    </div>
  );
};

export default App;
