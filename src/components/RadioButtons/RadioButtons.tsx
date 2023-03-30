import React from "react";
import styles from "./RadioButtons.module.css";

type RadioType = {
  changeChecked: (value: number) => void;
  period: number;
};
function RadioButtons({ changeChecked, period }: RadioType) {
  return (
    <div className={styles.graph}>
      <h2 className={styles.title}>Graph</h2>
      <div className={styles.buttons}>
        <label className={styles.radio}>
          <input
            className={styles.radio_input}
            type="radio"
            value="1"
            checked={period === 1}
            onChange={(e) => changeChecked(Number(e.target.value))}
          />
          <span className={styles.checkmark}></span>1 month
        </label>
        <label className={styles.radio}>
          <input
            className={styles.radio_input}
            type="radio"
            value="3"
            checked={period === 3}
            onChange={(e) => changeChecked(Number(e.target.value))}
          />
          <span className={styles.checkmark}></span>3 month
        </label>

        <label className={styles.radio}>
          <input
            className={styles.radio_input}
            type="radio"
            value="6"
            checked={period === 6}
            onChange={(e) => changeChecked(Number(e.target.value))}
          />
          <span className={styles.checkmark}></span>6 month
        </label>
      </div>
    </div>
  );
}

export default RadioButtons;
