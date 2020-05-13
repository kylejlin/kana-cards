import React from "react";
import Body from "../components/Body";
import Button from "../components/Button";
import Header from "../components/Header";
import SettingsButton from "../components/SettingsButton";
import { Deck } from "../types";

export interface Props {
  decks: Deck[];

  onSettings(): void;
  onSelect(deck: Deck): void;
}

export default function DeckMenu({
  decks,

  onSettings,
  onSelect,
}: Props): React.ReactElement {
  return (
    <>
      <Header background="white">Lessons</Header>
      <SettingsButton onClick={onSettings} />
      <Body>
        {decks.map((deck) => (
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
}
