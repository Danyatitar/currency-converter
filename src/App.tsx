import React from "react";
import Error from "./components/Error/Error";
import Graph from "./components/Graph/Graph";
import Header from "./components/Header/Header";
import InputCurrency from "./components/inputCurrency/inputCurrency";
import RadioButtons from "./components/RadioButtons/RadioButtons";
import SwapButton from "./components/SwapButton/SwapButton";
import useGraph from "./hooks/useGraph";
import useRate from "./hooks/useRate";

function App() {
  const {
    error,
    rates,
    currency,
    currencyAmount,
    convertedCurrency,
    convertedCurrencyAmount,
    convertAmount,
    reverseConvertAmount,
    convertCurrency,
    reverseConvertCurrency,
    swap,
  } = useRate();

  const { data, options, changeChecked, period } = useGraph(
    currency,
    convertedCurrency
  );
  return (
    <div className="app">
      <Header
        USD={Math.round(rates.rates.UAH * 1000) / 1000}
        EUR={Math.round((rates.rates.UAH / rates.rates.EUR) * 1000) / 1000}
      ></Header>

      <div className="form inputs">
        {error ? <Error></Error> : ""}
        <InputCurrency
          title="Amount"
          currencies={Object.keys(rates.rates)}
          selectValue={currency}
          amount={String(currencyAmount)}
          convert={convertAmount}
          convertCurrency={convertCurrency}
        ></InputCurrency>
        <SwapButton swap={swap}></SwapButton>
        <InputCurrency
          title="Converted Amount"
          currencies={Object.keys(rates.rates)}
          selectValue={convertedCurrency}
          amount={String(convertedCurrencyAmount)}
          convert={reverseConvertAmount}
          convertCurrency={reverseConvertCurrency}
        ></InputCurrency>
      </div>
      <div className="form graph">
        <RadioButtons
          changeChecked={changeChecked}
          period={period}
        ></RadioButtons>
        <Graph data={data} options={options}></Graph>
      </div>
    </div>
  );
}

export default App;
