import React, { useState } from "react";
import styles from "./AddTask.module.css";
import Modal from "../modal/Modal";

import cancel from "../../../assets/cancel.svg";
import Input from "../../ui/Input/Input";
import UseTasksContext from "../../../context/TasksContext";

const AddTask = ({ heading, cols }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(cols[0].name);

  const { subTasks, setSubTasks } = UseTasksContext();

  function AddNewTask(e) {
    e.preventDefault();
    const newTask = {
      title,
      description,
      status: status[0],
      subTasks,
    };

    console.log(newTask);
  }

  function addSubtask(e) {
    e.preventDefault();
    setSubTasks((prev) => [
      ...prev,
      { id: prev.length + 1, title: "", isComplete: false },
    ]);
  }

  return (
    <Modal>
      <div className={styles.form}>
        <h3>{heading}</h3>
        <form>
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            placeholder="eg. Take coffee break"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          />
          <label>Subtasks</label>
          {subTasks.map((subtask, index) => (
            <div className={styles.subtask} key={subtask.id}>
              <Input
                placeholder="e.g. Drink coffee & smile"
                value={subtask.title}
                onChange={(e) => {
                  const updatedSubtasks = [...subTasks];
                  updatedSubtasks[index].title = e.target.value;
                  setSubTasks(updatedSubtasks);
                }}
              />
              <img
                alt="cancel icon"
                src={cancel}
                onClick={() => {
                  const updatedSubtasks = [...subTasks];
                  updatedSubtasks.splice(index, 1);
                  setSubTasks(updatedSubtasks);
                }}
              />
            </div>
          ))}

          <button id={styles.add_newTask} onClick={addSubtask}>
            + Add New Subtask
          </button>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {cols.map((col) => (
              <option key={col.name} value={col.name}>
                {col.name}
              </option>
            ))}
          </select>
          <button type="submit" onClick={AddNewTask} id={styles.create_newTask}>
            Save Changes
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddTask;
