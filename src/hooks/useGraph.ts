import { useEffect, useState } from "react";
import axios from "axios";

export type DataType = {
  labels: Array<string>;
  datasets: Array<{
    fill: boolean;
    label: string;
    data: Array<number>;
    color?: string;
    borderColor: string;
    pointColor?: string;
    backgroundColor: string;
    tension: number;
  }>;
};

export type GraphType = {
  data: DataType;
  options: any;
  changeChecked: (value: number) => void;
  period: number;
};

function useGraph(currency: string, convertedCurrency: string): GraphType {
  function convertDate(): { start_date: string; end_date: string } {
    let today: Date = new Date();
    let dd: string = String(today.getDate() - 1).padStart(2, "0");
    let mm: string = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy: string = String(today.getFullYear());
    let start_yyyy: string = String(today.getFullYear() - 1);
    let start_date: string = start_yyyy + "-" + mm + "-" + dd;
    let end_date: string = yyyy + "-" + mm + "-" + dd;
    return { start_date, end_date };
  }

  const [label, setLabel] = useState<Array<string>>([]);
  const [dates, setDates] = useState<Array<string>>([]);
  const [parameters, setParameters] = useState<Array<number>>([]);
  const [values, setValues] = useState<Array<number>>([]);
  const [period, setPeriod] = useState<number>(6);

  function changeChecked(value: number): void {
    console.log(period);
    setPeriod(value);
    setParameters(values.filter((item, index) => index < value * 31).reverse());

    let d = new Date();
    d.setTime(d.getTime() - value * 31 * 24 * 60 * 60 * 1000);
    setLabel(dates.filter((item) => Date.parse(item) > d.getTime()));
  }

  async function getHistoryRates(currency: string, convertedCurrency: string) {
    const response = await axios.get(
      `https://api.exchangerate.host/timeseries?start_date=${
        convertDate().start_date
      }&end_date=${
        convertDate().end_date
      }&symbols=${convertedCurrency}&base=${currency}`
    );
    let d = new Date();
    d.setTime(d.getTime() - period * 31 * 24 * 60 * 60 * 1000);
    setDates(Object.keys(response.data.rates));
    setLabel(
      Object.keys(response.data.rates).filter(
        (item) => Date.parse(item) > d.getTime()
      )
    );
    let values: Array<any> = Object.values(response.data.rates);
    setParameters(
      values
        .map((item) => item[convertedCurrency])
        .reverse()
        .filter((item, index) => index < period * 31)
        .reverse()
    );
    setValues(values.map((item) => item[convertedCurrency]).reverse());
  }

  useEffect(() => {
    getHistoryRates(currency, convertedCurrency);
  }, [currency, convertedCurrency]);

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: `The ratio of the ${currency} to the ${convertedCurrency} during the year`,
      },
    },
  };

  const labels: Array<string> = label;

  const data: DataType = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: `${currency}/${convertedCurrency}`,
        data: parameters,

        borderColor: "rgb(0, 244, 110)",
        backgroundColor: "rgba(0, 244, 110, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return { data, options, changeChecked, period };
}

export default useGraph;
