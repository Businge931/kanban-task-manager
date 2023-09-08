import React from "react";
import Modal from "../modal/Modal";
import styles from "./ShowTaskDetails.module.css";
import taskIcon from "../../../assets/header-dots-icon.svg";

import {
  useModalContext,
  useThemeContext,
  useTasksContext,
} from "../../../context";

function ShowTaskDetails({ clickedTask }) {
  const { dispatch, edit_delete } = useModalContext();
  const { theme } = useThemeContext();
  const { boards: allBoards, currentBoard } = useTasksContext();

  const taskDetails =
    allBoards &&
    allBoards[currentBoard]?.columns
      ?.flatMap((column) => column.tasks)
      .find((task) => task.title === clickedTask);

  const completedSubTasks = taskDetails?.subtasks?.filter(
    (subtask) => subtask.isCompleted === true
  ).length;

  return (
    <Modal>
      <div className={styles.task}>
        <div className={styles.heading}>
          <h3 className={` ${theme === "dark" ? styles.dark : ""}`}>
            {taskDetails?.title}
          </h3>

          <img
            alt="icon"
            src={taskIcon}
            onClick={() => dispatch({ type: "manageTask" })}
          />
        </div>
        {edit_delete && (
          <div className={styles.manage_task}>
            <p
              onClick={() => {
                dispatch({ type: "editTask" });
              }}
            >
              Edit Task
            </p>
            <p
              onClick={() => {
                dispatch({ type: "deleteTask" });
              }}
              id={styles.delete_task}
            >
              Delete Task
            </p>
          </div>
        )}
        <p>{taskDetails?.description}</p>
        <h5>
          Subtasks ({completedSubTasks} of {taskDetails?.subtasks?.length})
        </h5>

        {taskDetails?.subtasks?.map((subtask) => (
          <div
            key={subtask.title}
            className={`${styles.subtask} ${
              theme === "dark" ? styles.dark : ""
            } `}
          >
            <label>
              <input type="checkbox" defaultChecked={subtask.isCompleted} />
              <span
                className={`${styles.label} ${
                  subtask.isCompleted === false ? styles.isCompleted : ""
                }`}
              >
                {subtask.title}
              </span>
            </label>
          </div>
        ))}

        <h5>Current Status</h5>
        <select>
          <option>Doing</option>
          <option>Todo</option>
          <option>Done</option>
        </select>
      </div>
    </Modal>
  );
}

export default ShowTaskDetails;
