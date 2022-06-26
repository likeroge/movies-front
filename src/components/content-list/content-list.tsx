import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { IFetchConfig } from "../../App";
import "./content-list.scss";
import { config } from "../../config";

interface IFilm {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  creation_date?: string;
  certificate?: string;
  file_path?: string;
  rating: string;
  type: string;
}

interface IContentListProps {
  fetchConfig: IFetchConfig;
}

export const ContentList: FC<IContentListProps> = ({ fetchConfig }) => {
  const [films, setFilms] = useState<IFilm[]>([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(config.apiUrl, {
        params: { filter: fetchConfig.filter, text: fetchConfig.text },
      });
      setFilms(data);
    }
    fetchData();
  }, [fetchConfig.text, fetchConfig.filter]);

  return (
    <div className="content-list">
      <table className="table">
        <thead>
          <tr>
            <th>№</th>
            <th>Фильм</th>
            <th>Рейтинг</th>
          </tr>
        </thead>
        {films.map((film: IFilm, idx) => (
          <tbody key={film.id + Math.random()}>
            <tr>
              <td>{idx + 1}</td>
              <td>{film.title}</td>
              <td>{film.rating}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};
