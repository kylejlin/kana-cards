import React from "react";
import "../styles/Header.css";

export interface Props {
  children: React.ReactChild | React.ReactChild[];
  background: string;
}

export default function Header({
  children,
  background,
}: Props): React.ReactElement {
  return <div className={"Header Header--" + background}>{children}</div>;
}
