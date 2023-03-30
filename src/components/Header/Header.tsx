import React from "react";
import styles from "./header.module.css";
type HeaderProps = {
  USD: number;
  EUR: number;
};

function Header({ USD, EUR }: HeaderProps) {
  return (
    <div>
      <h1 className={styles.title}>
        Currency <span className={styles.title_content}>Converter</span>
      </h1>
      <div className={styles.rates}>
        <p className={styles.rates_item}>
          USD/UAH{" "}
          <span className={styles.rates_item_content}>{String(USD)}</span>
        </p>
        <p className={styles.rates_item}>
          USD/UAH{" "}
          <span className={styles.rates_item_content}>{String(EUR)}</span>
        </p>
      </div>
    </div>
  );
}

export default Header;
