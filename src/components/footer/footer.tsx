import React, { FC } from "react";
import "./footer.scss";

interface IFooterProps {
  setFilterVisible: Function;
  filterVisible: boolean;
  setDiagramVisible: Function;
}

export const Footer: FC<IFooterProps> = ({
  setFilterVisible,
  filterVisible,
  setDiagramVisible,
}) => {
  return (
    <footer className="footer container">
      <button onClick={() => setFilterVisible(true)} className="footer__button">
        Фильтр
      </button>
      <button
        onClick={() => setDiagramVisible(true)}
        className="footer__button"
      >
        Диаграмма
      </button>
    </footer>
  );
};
