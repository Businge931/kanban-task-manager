import React from "react";
import styles from "./Logo.module.css";

import logo from "../../assets/logo-dark.svg";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img alt="logo" src={logo} />
    </div>
  );
};

export default Logo;
