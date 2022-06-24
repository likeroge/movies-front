import React, { FC } from "react";
import "./modal-diagram.scss";
import closeIcon from "../assets/icons/closeIcon.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface IModalDiagramProps {
  visible: boolean;
  setVisible: Function;
}

export const ModalDiagram: FC<IModalDiagramProps> = ({
  visible,
  setVisible,
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  return (
    <div
      className="modal-diagram container"
      style={{ display: visible ? "" : "none" }}
    >
      <img
        className="modal-filter__close-icon"
        src={closeIcon}
        onClick={() => setVisible(false)}
        alt="closeIcon"
      />
      <div className="modal-diagram__genre-rating">
        <h1>Жанры</h1>
        <Bar options={options} data={data} />
      </div>
      <div className="modal-diagram__movie-rating">
        <h1>Фильмы</h1>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};
