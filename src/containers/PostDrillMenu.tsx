import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";

export interface Props {
  deckName: string;
  onRestart(): void;
  onHome(): void;
}

export default function PostDrillMenu({
  deckName,
  onRestart,
  onHome,
}: Props): React.ReactElement {
  return (
    <>
      <Header background="white">{deckName}</Header>
      <Button modifierName="blue shadow" onClick={onRestart}>
        Restart
      </Button>
      <Button modifierName="blue shadow" onClick={onHome}>
        Home
      </Button>
    </>
  );
}
