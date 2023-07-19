import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import { UseModalContext } from "../../../context/ModalContext";
import { useThemeContext } from "../../../context/ThemeContext";

const Modal = ({ children }) => {
  const modalRef = useRef();
  const { dispatch } = UseModalContext();
  const { theme } = useThemeContext();

  useEffect(() => {
    function hadleClick(e) {
      if (modalRef && !modalRef.current.contains(e.target)) {
        dispatch({ type: "closeModal" });
      }
    }

    document.addEventListener("click", hadleClick, true);

    return () => document.removeEventListener("click", hadleClick, true);
  }, [dispatch]);

  return (
    <div className={styles.modal_overlay}>
      <div
        ref={modalRef}
        className={`${styles.modal} ${theme === "dark" ? styles.dark : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
