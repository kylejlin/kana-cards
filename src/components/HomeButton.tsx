import React from "react";
import "../styles/HomeButton.css";

export interface Props {
  color: string;
  onClick(): void;
}

export default function HomeButton({
  color,
  onClick,
}: Props): React.ReactElement {
  return (
    <button className={"HomeButton HomeButton--" + color} onClick={onClick}>
      x
    </button>
  );
}
