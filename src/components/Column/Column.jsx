import React from "react";
import styles from "./Column.module.css";

const Column = ({ children, title, todoNum }) => {
  return (
    <div className={styles.column}>
      <div className={styles.column_heading}>
        <div />
        <h4>
          {title} <span>({todoNum})</span>
        </h4>
      </div>
      {/* <div className={styles.column_content}>{children}</div> */}
      {children}
    </div>
  );
};

export default Column;
