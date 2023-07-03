import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";
import sidebarIcon from "../../assets/fluent_board-split-24-regular.svg";
import light from "../../assets/icon-light-theme.svg";
import dark from "../../assets/icon-dark-theme.svg";
import togleSidebar from "../../assets/eye-slash.1.svg";
import eye from "../../assets/icon-show-sidebar.svg";

import { UseModalContext } from "../../context/ModalContext";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { dispatch } = UseModalContext();

  const [togleTheme, setTogleTheme] = useState(false);

  function handleClick() {
    setTogleTheme((theme) => !theme);
  }

  return (
    <>
      {showSidebar ? (
        <aside className={styles.sidebar}>
          <h3>All boards (3)</h3>

          <div className={styles.sidebar_links}>
            <button to="/" className={styles.link}>
              <img alt="icon" src={sidebarIcon} />
              Platform Launch
            </button>
            <button to="" className={styles.link}>
              <img alt="icon" src={sidebarIcon} />
              Marketing Plan
            </button>

            <button to="" className={styles.link}>
              <img alt="icon" src={sidebarIcon} />
              Roadmap
            </button>

            <button
              // to=""
              className={styles.link}
              onClick={() => dispatch({ type: "addNewBoard", payload: "" })}
            >
              <img alt="icon" src={sidebarIcon} />+ Create New Board
            </button>
          </div>

          <div className={styles.sidebar__toggle}>
            <div className={styles.theme_icons}>
              <img alt="light theme icon" src={light} />
              <div className={styles.togle_button} onClick={handleClick}>
                <div
                  className={`${togleTheme ? styles.toggle : ""} ${
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
