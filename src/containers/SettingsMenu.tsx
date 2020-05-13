import React from "react";
import Body from "../components/Body";
import Checkbox from "../components/Checkbox";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import Section from "../components/Section";
import { DeckType, DisplayedDeckTypes, SwipeDirectionType } from "../types";

export interface Props {
  selectedSwipeDirection: SwipeDirectionType;
  displayedDeckTypes: DisplayedDeckTypes;
  areWritingCorrectionsEnabled: boolean;

  onHome(): void;
  onSelectSwipeDirection(direction: SwipeDirectionType): void;
  onToggleDeckTypeDisplay(deckType: DeckType): void;
  onToggleWritingCorrections(): void;
}

const DIRECTIONS: SwipeDirectionType[] = ["Right", "Left", "Up", "Down"];
const DECK_TYPES: DeckType[] = ["Phrases", "Essentials"];

export default function SettingsMenu({
  selectedSwipeDirection,
  displayedDeckTypes,
  areWritingCorrectionsEnabled,

  onHome,
  onSelectSwipeDirection,
  onToggleDeckTypeDisplay,
  onToggleWritingCorrections,
}: Props): React.ReactElement {
  return (
    <>
      <Header background="blue">Settings</Header>
      <HomeButton color="blue" onClick={onHome} />
      <Body>
        <Section header="Correct Answer Swipe Direction">
          {DIRECTIONS.map((direction) => (
            <Checkbox
              checked={direction === selectedSwipeDirection}
              onClick={() => onSelectSwipeDirection(direction)}
              key={direction}
            >
              {direction}
            </Checkbox>
          ))}
        </Section>
        <Section header="Decks to Display">
          {DECK_TYPES.map((deckType) => (
            <Checkbox
              checked={displayedDeckTypes[deckType]}
              onClick={() => onToggleDeckTypeDisplay(deckType)}
              key={deckType}
            >
              {deckType}
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
