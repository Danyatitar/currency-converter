import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DataType } from "../../hooks/useGraph";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

type GraphProps = {
  data: DataType;
  options: any;
};

function Graph({ data, options }: GraphProps) {
  return <Line data={data} options={options} />;
}
export default Graph;
