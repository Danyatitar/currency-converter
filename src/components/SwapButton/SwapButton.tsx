import React from "react";
import styles from "./swapButton.module.css";

type SwapButtonType = {
  swap: () => void;
};

function SwapButton({ swap }: SwapButtonType) {
  return (
    <button type="button" className={styles.btn} onClick={swap}>
      Swap
    </button>
  );
}
export default SwapButton;
