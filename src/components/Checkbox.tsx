import React from "react";
import "../styles/Checkbox.css";

export interface Props {
  children: React.ReactChild | React.ReactChild[];
  checked: boolean;
  onClick(event: React.MouseEvent): void;
}

export default function Checkbox({
  children,
  checked,
  onClick,
}: Props): React.ReactElement {
  return (
    <div
      className={"Checkbox" + (checked ? " Checkbox--checked" : "")}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
