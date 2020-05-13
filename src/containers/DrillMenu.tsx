import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import { DrillType } from "../types";

export interface Props {
  deckName: string;
  onDrillSelect(drill: DrillType): void;
  onHome(): void;
}

export default function DrillMenu({
  deckName,
  onDrillSelect,
  onHome,
}: Props): React.ReactElement {
  return (
    <>
      <Header background="white">{deckName}</Header>
      <HomeButton color="white" onClick={onHome} />
      <Button
        modifierName="blue shadow"
        onClick={() => onDrillSelect("READING_DRILL")}
      >
        Reading Drill
      </Button>
      <Button
        modifierName="blue shadow"
        onClick={() => onDrillSelect("WRITING_DRILL")}
      >
        Writing Drill
      </Button>
    </>
  );
}
