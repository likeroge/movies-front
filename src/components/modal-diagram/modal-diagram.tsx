import React, { FC, useEffect, useState } from "react";
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
import axios from "axios";
import { config } from "../../config";

interface IModalDiagramProps {
  visible: boolean;
  setVisible: Function;
}

export const ModalDiagram: FC<IModalDiagramProps> = ({
  visible,
  setVisible,
}) => {
  const [ratingDiagramData, setRatingDiagramData] = useState();
  const [genresByPopularityData, setGenresByPopularityData] = useState();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const data1 = {
    labels: [],
    datasets: [
      {
        label: "Количество фильмов с выбранным рейтингом",
        data: ratingDiagramData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const data2 = {
    labels: [],
    datasets: [
      {
        label: "Количество фильмов по жанрам",
        data: genresByPopularityData,
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
      },
    },
  };

  useEffect(() => {
    async function fetchDiagramData() {
      const { data } = await axios.get(config.diagramDataUrl);

      setRatingDiagramData(data.rating_diagram_data);
      setGenresByPopularityData(data.genres_by_popularity_data);
    }
    fetchDiagramData();
  }, []);

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
      <div style={{ overflow: "scroll", height: "600px" }}>
        <div>
          <Bar options={options} data={data1} />
          <Bar options={options} data={data2} />
        </div>
      </div>
    </div>
  );
};
