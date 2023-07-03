import React from "react";
import styles from "./HeaderNav.module.css";
import addTaskIcon from "../../assets/header-dots-icon.svg";
import { UseModalContext } from "../../context/ModalContext";

const HeaderNav = () => {
  const { dispatch } = UseModalContext();
  return (
    <div className={styles.nav}>
      <h1>Platform Launch</h1>
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
