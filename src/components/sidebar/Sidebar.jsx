import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";
import sidebarIcon from "../../assets/fluent_board-split-24-regular.svg";
import light from "../../assets/icon-light-theme.svg";
import dark from "../../assets/icon-dark-theme.svg";
import togleSidebar from "../../assets/eye-slash.1.svg";
import eye from "../../assets/icon-show-sidebar.svg";

import {
  useModalContext,
  useThemeContext,
  useTasksContext,
} from "../../context";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [active, setActive] = useState(0);
  const { dispatch } = useModalContext();
  const { theme, setTheme } = useThemeContext();
  const { boards, setCurrentBoard } = useTasksContext();

  let boardNames = [];
  boards?.map((board) => boardNames.push(board.name));

  return (
    <>
      {showSidebar ? (
        <aside
          className={`${styles.sidebar} ${
            theme === "dark" ? styles.sidebar_dark : ""
          }`}
        >
          <h3 className={`${theme === dark ? styles.h3_dark : ""}`}>
            All boards ({boardNames.length})
          </h3>

          <div className={styles.sidebar_links}>
            {boardNames.map((name, index) => (
              <p
                onClick={() => {
                  setActive(index);
                  setCurrentBoard(index);
                }}
                className={`${styles.link} ${
                  active === index ? styles.active_link : ""
                }`}
                key={name}
              >
                <img alt="icon" src={sidebarIcon} />
                {name}
              </p>
            ))}

            <button
              className={`${styles.link} ${styles.createNew}`}
              onClick={() => dispatch({ type: "addNewBoard" })}
            >
              <img alt="icon" src={sidebarIcon} />+ Create New Board
            </button>
          </div>

          <div
            className={`${styles.sidebar__toggle} ${
              theme === "light"
                ? styles.sidebar__toggle_light
                : styles.sidebar__toggle_dark
            }`}
          >
            <div className={styles.theme_icons}>
              <img alt="light theme icon" src={light} />
              <div
                className={styles.togle_button}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <div
                  className={`${theme === "dark" ? styles.toggle : ""} ${
                    styles.togle_button_inner
                  }`}
                />
              </div>
              <img alt="dark theme icon" src={dark} />
            </div>

            <p onClick={() => setShowSidebar(false)}>
              <span>
                <img alt="show side bar icon" src={togleSidebar} />
              </span>
              Hide sidebar
            </p>
          </div>
        </aside>
      ) : (
        <div className={styles.toggler} onClick={() => setShowSidebar(true)}>
          <img alt="togle icon" src={eye} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
