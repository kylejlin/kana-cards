import React from "react";
import Body from "../components/Body";
import Checkbox from "../components/Checkbox";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import Section from "../components/Section";
import { SwipeDirection } from "../types";

export interface Props {
  selectedSwipeDirection: SwipeDirection;
  areWritingCorrectionsEnabled: boolean;

  onHome(): void;
  onSelectSwipeDirection(direction: SwipeDirection): void;
  onToggleWritingCorrections(): void;
}

const DIRECTIONS: SwipeDirection[] = ["Right", "Left", "Up", "Down"];

export default function SettingsMenu({
  selectedSwipeDirection,
  areWritingCorrectionsEnabled,

  onHome,
  onSelectSwipeDirection,
  onToggleWritingCorrections,
}: Props): React.ReactElement {
  return (
    <>
      <Header background="blue">Settings</Header>
      <HomeButton color="blue" onClick={onHome} />
      <Body>
        <Section header="Correct Answer Swipe Direction">
          {DIRECTIONS.map(direction => (
            <Checkbox
              checked={direction === selectedSwipeDirection}
              onClick={() => onSelectSwipeDirection(direction)}
              key={direction}
            >
              {direction}
            </Checkbox>
          ))}
        </Section>
        <Section header="Writing Corrections">
          <Checkbox
            checked={areWritingCorrectionsEnabled}
            onClick={onToggleWritingCorrections}
          >
            Enabled?
          </Checkbox>
        </Section>
      </Body>
    </>
  );
}
