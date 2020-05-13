import React from "react";
import modifierNameToClassName from "../modifierNameToClassName";
import "../styles/Button.css";

export interface Props {
  modifierName?: string;
  onClick(): void;
  children: React.ReactChild | React.ReactChild[];
}

export default function Button({
  modifierName = "",
  onClick,
  children,
}: Props): React.ReactElement {
  return (
    <div
      className={modifierNameToClassName("Button", modifierName)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
