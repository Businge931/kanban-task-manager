import React from "react";
import styles from "./Input.module.css";

const Input = ({
  placeholder,
  onChange,
  value,
  defaultValue,
  id,
  readOnly,
}) => {
  return (
    <input
      placeholder={placeholder}
      onChange={onChange}
      className={styles.input}
      value={value}
      defaultValue={defaultValue}
      id={id}
      readOnly={readOnly}
    />
  );
};

export default Input;
