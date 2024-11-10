import React from "react";
import styles from "./Header.module.css";
const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.imageLogo} src="/logo.svg" />
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default Header;
