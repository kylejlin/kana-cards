import React from "react";
import Header from "../components/Header";
import SettingsButton from "../components/SettingsButton";
import Body from "../components/Body";
import Button from "../components/Button";

export default ({
  decks,

  onSettings,
  onSelect,
}) => (
  <>
    <Header background="white">Lessons</Header>
    <SettingsButton onClick={onSettings} />
    <Body>
      {decks.map(deck => (
        <Button
          modifierName="blue shadow"
          onClick={() => onSelect(deck)}
          key={deck.name}
        >
          {deck.name}
        </Button>
      ))}
    </Body>
  </>
);
