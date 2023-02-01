import styles from "./styles.module.css";

import { CheckCircle } from "phosphor-react";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        <span>T</span>
        <CheckCircle weight="bold" />
        <span>D</span>
        <CheckCircle weight="bold" />
      </div>
    </header>
  );
};
