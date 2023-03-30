import React from "react";
import styles from "./error.module.css";

function Error() {
  return (
    <p className={styles.error}>
      Invalid Input! You can enter only numbers or "."
    </p>
  );
}

export default Error;
