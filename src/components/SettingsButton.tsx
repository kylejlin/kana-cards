import React from "react";
import settingsIcon from "../images/settings.svg";
import "../styles/SettingsButton.css";

export interface Props {
  onClick(): void;
}

export default function SettingsButton({ onClick }: Props): React.ReactElement {
  return (
    <img
      src={settingsIcon}
      alt="Settings button"
      className="SettingsButton"
      onClick={onClick}
    />
  );
}
