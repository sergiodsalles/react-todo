import styles from "./styles.module.css";

import { CheckCircle } from "phosphor-react";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        ToDo
      </div>
    </header>
  );
};
