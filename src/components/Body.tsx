import React from "react";
import "../styles/Body.css";

export interface Props {
  children: React.ReactChild | React.ReactChild[];
}

export default function Body({ children }: Props): React.ReactElement {
  return <div className="Body">{children}</div>;
}
