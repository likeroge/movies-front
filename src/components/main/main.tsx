import React from "react";
import "./main.scss";

export const Main = (props: any) => {
  return <main className="main container">{props.children}</main>;
};
