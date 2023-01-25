import React, { useEffect, useState } from "react";
import styles from "../styles/Task.module.css";

function Task({ date, darkmode }) {
  // Checking if there is any data on the current date
  const empty = localStorage.getItem(date) == null;

  // Gettng the task array from the local storage
  const [taskArray, setTaskArray] = useState(
    empty
      ? JSON.parse(localStorage.getItem("initial"))
      : JSON.parse(localStorage.getItem(date))
  );

  let clockRunning = null;

  // This function runs when the user presses on the clock of the task
  const clockClick = (event) => {
    let index = Number(event.target.getAttribute("index"));

    for (let i = 0; i < 4; i++) {
      if (i != index) {
        taskArray[i].active = false;
      }
    }

    const startTime = new Date();

    if (taskArray[index].active) {
      taskArray[index].active = false;
    } else {
      taskArray[index].active = true;
      runClock(index, startTime);
    }
  };

  const runClock = (index, startTime) => {
    const initialTime = taskArray[index].seconds;
    clockRunning = setInterval(() => {
      const currentTime = new Date();

      if (taskArray[index].active) {
        taskArray[index].seconds =
          initialTime +
          Math.floor((currentTime.getTime() - startTime.getTime()) / 1000);

        var newTaskArray = [];
        for (const task of taskArray) {
          newTaskArray.push(task);
        }

        console.log(newTaskArray);

        setTaskArray(newTaskArray);
      } else {
        clearInterval(clockRunning);
      }
    });
  };

  const getTimeString = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    seconds = seconds - hours * 3600;

    let minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;

    hours = hours.toLocaleString("en-US", { minimumIntegerDigits: 2 });
    minutes = minutes.toLocaleString("en-US", { minimumIntegerDigits: 2 });
    seconds = seconds.toLocaleString("en-US", { minimumIntegerDigits: 2 });

    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    for (const task of taskArray) {
      task.active = false;
    }

    // If there is no data for the current date, then we create one here
    if (localStorage.getItem(date) === null) {
      localStorage.setItem(date, JSON.stringify(taskArray));
    }
  });

  return (
    <div>
      <div className={styles.container}>
        {taskArray.map((task) => (
          <div
            className={task.active ? styles.taskActive : styles.task}
            key={task.id}
          >
            <label>{task.name}</label>
            <label
              className={styles.taskClock}
              onClick={clockClick}
              index={task.id}
            >
              {getTimeString(task.seconds)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task;
