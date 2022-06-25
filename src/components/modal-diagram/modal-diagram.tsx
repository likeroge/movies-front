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
  const [activeDiagram, setActivDiagram] = useState();

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
        label: "Диаграмма рейтингов фильмов",
        data: ratingDiagramData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const data2 = {
    labels: [],
    datasets: [
      {
        label: "Жанры фильмов по популярности",
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
      const { data } = await axios.get("http://localhost:8000/movies/diagram");
      console.log(data);

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
      <div className="diagram-control">
        <label htmlFor="">Рейтинг фильмов</label>
        <input type="radio" name="diagram" id="" defaultChecked />
        <label htmlFor="">Жанры фильмов</label>
        <input type="radio" name="diagram" id="" />
      </div>

      <img
        className="modal-filter__close-icon"
        src={closeIcon}
        onClick={() => setVisible(false)}
        alt="closeIcon"
      />
      <div className="modal-diagram__genre-rating">
        <Bar options={options} data={data1} />
      </div>
      {/* <div className="modal-diagram__movie-rating">
        <Bar options={options} data={data2} />
      </div> */}
    </div>
  );
};
