import React from "react";
import "./header.scss";

interface Props {}

export const Header = (props: Props) => {
  return (
    <header className="header container">
      <h1 className="header__title">Movies</h1>
      <h2 className="header__subtitle">for everyone</h2>
    </header>
  );
};
