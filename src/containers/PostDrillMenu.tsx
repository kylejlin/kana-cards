import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import getDeckName from "../getDeckName";
import { Deck } from "../types";

export interface Props {
  deck: Deck;
  onRestart(): void;
  onHome(): void;
}

export default function PostDrillMenu({
  deck,
  onRestart,
  onHome,
}: Props): React.ReactElement {
  return (
    <>
      <Header background="white">{getDeckName(deck)}</Header>
      <Button modifierName="blue shadow" onClick={onRestart}>
        Restart
      </Button>
      <Button modifierName="blue shadow" onClick={onHome}>
        Home
      </Button>
    </>
  );
}
