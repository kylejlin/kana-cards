import React from "react";
import "../styles/Section.css";

export interface Props {
  header: React.ReactChild;
  children: React.ReactChild | React.ReactChild[];
}

export default function Section({
  header,
  children,
}: Props): React.ReactElement {
  return (
    <div className="Section">
      <div className="Section__Header">{header}</div>
      {children}
    </div>
  );
}
