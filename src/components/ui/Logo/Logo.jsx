import React from "react";
import styles from "./Logo.module.css";

import logoLight from "../../../assets/logo-dark.svg";
import logoDark from "../../../assets/logo-light.svg";
import { useThemeContext } from "../../../context";

const Logo = () => {
  const { theme } = useThemeContext();
  return (
    <div
      className={`${styles.logo} ${theme === "dark" ? styles.logo_dark : ""}`}
    >
      {theme === "light" ? (
        <img alt="logo" src={logoLight} />
      ) : (
        <img alt="logo" src={logoDark} />
      )}
    </div>
  );
};

export default Logo;
