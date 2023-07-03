import React from "react";
import styles from "./Todo.module.css";
import { UseModalContext } from "../../context/ModalContext";

const Todo = ({ title }) => {
  const { dispatch } = UseModalContext();

  return (
    <div className={styles.todo} onClick={() => dispatch({ type: "viewTask" })}>
      <h4>{title}</h4>
      <p>1 out of 3 subtasks</p>
    </div>
  );
};

export default Todo;
