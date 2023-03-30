import { useEffect, useState } from "react";
import axios from "axios";

export type Rates = {
  base: string;
  date: string;
  rates: any;
  success: boolean;
};

type Currency = {
  error: boolean;
  rates: Rates;
  currency: string;
  currencyAmount: number | string;
  convertedCurrency: string;
  convertedCurrencyAmount: number | string;
  convertAmount: (value: string) => void;
  reverseConvertAmount: (value: string) => void;
  convertCurrency: (value: string) => void;
  reverseConvertCurrency: (value: string) => void;
  swap: () => void;
};

function useRate(): Currency {
  const [rates, setRates] = useState<Rates>({
    base: "",
    date: "",
    rates: {},
    success: false,
  });
  const [currency, setCurrency] = useState("USD");
  const [convertedCurrency, setConvertedCurrency] = useState("UAH");
  const [currencyAmount, setCurrencyAmount] = useState<number | string>(1);
  const [convertedCurrencyAmount, setConvertedCurrencyAmount] = useState<
    number | string
  >(1);
  const [error, setError] = useState(false);
  function roundDecimal(num: number): number {
    return Math.round(num * 1000) / 1000;
  }

  async function getRates() {
    const result = await axios.get(
      "https://api.exchangerate.host/latest?base=USD"
    );
    setRates(result.data);
  }

  useEffect(() => {
    getRates();
  }, []);

  useEffect(() => {
    setConvertedCurrencyAmount(roundDecimal(rates.rates["UAH"]));
  }, [rates]);

  function convertAmount(value: string): void {
    if (value.indexOf(".") === value.length - 1) {
      setCurrencyAmount(value);
    } else {
      if (Number(value) || Number(value) === 0) {
        setError(false);
        setCurrencyAmount(roundDecimal(Number(value)));
        setConvertedCurrencyAmount(
          roundDecimal(
            (rates.rates[convertedCurrency] * Number(value)) /
              rates.rates[currency]
          )
        );
      } else {
        setCurrencyAmount(value);
        setError(true);
      }
    }
  }
  function reverseConvertAmount(value: string): void {
    if (value.indexOf(".") === value.length - 1) {
      setConvertedCurrencyAmount(value);
    } else {
      if (Number(value) || Number(value) === 0) {
        setError(false);
        setConvertedCurrencyAmount(roundDecimal(Number(value)));
        setCurrencyAmount(
          roundDecimal(
            (rates.rates[currency] * Number(value)) /
              rates.rates[convertedCurrency]
          )
        );
      } else {
        setConvertedCurrencyAmount(value);
        setError(true);
      }
    }
  }

  function convertCurrency(value: string): void {
    setCurrency(value);

    setConvertedCurrencyAmount(
      roundDecimal(
        (rates.rates[convertedCurrency] * Number(currencyAmount)) /
          rates.rates[value]
      )
    );
  }

  function reverseConvertCurrency(value: string): void {
    setConvertedCurrency(value);
    setCurrencyAmount(
      roundDecimal(
        (rates.rates[value] * Number(convertedCurrencyAmount)) /
          rates.rates[currency]
      )
    );
  }

  function swap(): void {
    if (Number(currencyAmount) && Number(convertedCurrencyAmount)) {
      console.log(currencyAmount, convertedCurrencyAmount);
      setConvertedCurrencyAmount(
        roundDecimal(
          (Number(currencyAmount) / Number(convertedCurrencyAmount)) *
            Number(currencyAmount)
        )
      );

      setConvertedCurrency(currency);
      setCurrency(convertedCurrency);
    }
  }

  return {
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
  };
}

export default useRate;
