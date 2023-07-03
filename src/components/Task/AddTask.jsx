import React from "react";
import styles from "./AddTask.module.css";
import Modal from "../modal/Modal";

import cancel from "../../assets/cancel.svg";
import Input from "../Input/Input";

const AddTask = ({ heading, actionType }) => {
  return (
    <Modal>
      <div className={styles.form}>
        <h3>{heading}</h3>
        <form>
          <label>Title</label>
          <Input placeholder="eg. Take coffee break" />

          <label>Description</label>
          <textarea placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little." />

          <label>Subtasks</label>
          <div className={styles.subtask}>
            <Input placeholder="e.g. Make coffee" />
            <img alt="cancel icon" src={cancel} />
          </div>

          <div className={styles.subtask}>
            <Input placeholder="e.g. Drink coffee & smile" />
            <img alt="cancel icon" src={cancel} />
          </div>

          <button id={styles.add_newTask}>+ Add New Subtask</button>

          <label>Status</label>
          <select>
            <option>Todo</option>
            <option>Doing</option>
            <option>Done</option>
          </select>

          <button id={styles.create_newTask}>{actionType}</button>
        </form>
      </div>
    </Modal>
  );
};

export default AddTask;
