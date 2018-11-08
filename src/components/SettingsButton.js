import React from "react";
import "../styles/SettingsButton.css";
import settingsIcon from "../images/settings.svg";

export default ({ onClick }) => (
  <img
    src={settingsIcon}
    alt="Settings button"
    className="SettingsButton"
    onClick={onClick}
  />
);
