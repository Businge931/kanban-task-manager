import React from "react";
import styles from "./HeaderNav.module.css";
import addTaskIcon from "../../../assets/header-dots-icon.svg";

import {
  useModalContext,
  useThemeContext,
  useTasksContext,
} from "../../../context";

const HeaderNav = () => {
  const { dispatch } = useModalContext();
  const { theme } = useThemeContext();
  const { boards: allBoards, currentBoard } = useTasksContext();

  const heading = allBoards && allBoards[currentBoard]?.name;

  return (
    <div className={`${styles.nav} ${theme === "dark" ? styles.dark : ""}`}>
      <h1>{heading}</h1>
      <div className={styles.nav_buttons}>
        <button
          onClick={() => {
            dispatch({
              type: "addTask",
              payload: "add_task",
            });
          }}
        >
          +Add New Task
        </button>
        <img alt="add new task icon" src={addTaskIcon} />
      </div>
    </div>
  );
};

export default HeaderNav;
