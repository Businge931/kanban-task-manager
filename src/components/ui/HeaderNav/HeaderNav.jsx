import React from "react";
import styles from "./HeaderNav.module.css";
import addTaskIcon from "../../../assets/header-dots-icon.svg";
import { UseModalContext } from "../../../context/ModalContext";
import { useThemeContext } from "../../../context/ThemeContext";
import UseTasksContext from "../../../context/TasksContext";

const HeaderNav = ({ currentBoard }) => {
  const { dispatch } = UseModalContext();
  const { theme } = useThemeContext();
  const { boards: allBoards } = UseTasksContext();

  const heading = allBoards && allBoards[currentBoard]?.name;

  return (
    <div className={`${styles.nav} ${theme === "dark" ? styles.dark : ""}`}>
      <h1>{heading}</h1>
      <div className={styles.nav_buttons}>
        <button
          onClick={() =>
            dispatch({
              type: "addTask",
              payload: "add_task",
            })
          }
        >
          +Add New Task
        </button>
        <img alt="add new task icon" src={addTaskIcon} />
      </div>
    </div>
  );
};

export default HeaderNav;
