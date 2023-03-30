import React from "react";
import styles from "./inputCurrency.module.css";

type InputCurrencyType = {
  title: string;
  currencies: Array<string>;
  selectValue: string;
  amount: string;
  convert: (value: string) => void;
  convertCurrency: (value: string) => void;
};

function InputCurrency({
  title,
  currencies,
  selectValue,
  amount,
  convert,
  convertCurrency,
}: InputCurrencyType) {
  return (
    <div className={styles.currency}>
      <div className={styles.currency_item}>
        <label className={styles.label}>{title}</label>
        <input
          className={styles.amount}
          type="text"
          value={amount}
          onChange={(e) => convert(e.target.value)}
        />
      </div>
      <select
        className={styles.currency_content}
        name=""
        id=""
        value={selectValue}
        onChange={(e) => {
          convertCurrency(e.target.value);
        }}
      >
        {currencies.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
export default InputCurrency;
