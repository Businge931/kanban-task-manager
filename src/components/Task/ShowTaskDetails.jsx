import React from "react";
import Modal from "../modal/Modal";
import styles from "./ShowTaskDetails.module.css";
import taskIcon from "../../assets/header-dots-icon.svg";
import { UseModalContext } from "../../context/ModalContext";

function ShowTaskDetails() {
  const { dispatch, edit_delete } = UseModalContext();

  return (
    <Modal>
      <div className={styles.task}>
        <div className={styles.heading}>
          <h3 className={styles.h3}>
            Research pricing points of various competitors and trial different
            business models
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
        <p>
          We know what we're planning to build for version one. Now we need to
          finalise the first pricing model we'll use. Keep iterating the
          subtasks until we have a coherent proposition.
        </p>
        <h5>Subtasks (2 of 3)</h5>
        <div className={styles.subtask}>
          <label>
            <input type="checkbox" />
            <span>Research competitor pricing and business models</span>
          </label>
        </div>
        <div className={styles.subtask}>
          <label>
            <input type="checkbox" />
            <span>Outline a business model that works for our solution</span>
          </label>
        </div>
        <div className={styles.subtask}>
          <label>
            <input type="checkbox" />
            <span>
              Talk to potential customers about our proposed solution and ask
              for fair price expectancy
            </span>
          </label>
        </div>
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
