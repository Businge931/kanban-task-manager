import React from "react";
import styles from "./Todo.module.css";
import { useThemeContext } from "../../context";

const Todo = ({ title, completedSubTask, subtasks, onClick }) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`${styles.todo} ${theme === "dark" ? styles.dark : ""}`}
      // onClick={() => {dispatch({ type: "viewTask" }); onClickTask()}}
      onClick={onClick}
    >
      <h4 className={`${title} ${theme === "dark" ? styles.title_dark : ""}`}>
        {title}
      </h4>
      <p>
        {completedSubTask} out of {subtasks} subtasks
      </p>
    </div>
  );
};

export default Todo;
