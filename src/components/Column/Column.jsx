import React from "react";
import styles from "./Column.module.css";

const Column = ({ children }) => {
  // const { tasks, columns, dispatch } = UseModalContext();
  return (
    <div className={styles.column}>
      <div className={styles.column_heading}>
        <div />
        <h4>
          Todo <span>(3)</span>
        </h4>
      </div>
      {children}
    </div>
  );
};

export default Column;
