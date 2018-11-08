import React from "react";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import Body from "../components/Body";
import Section from "../components/Section";
import Checkbox from "../components/Checkbox";

const DIRECTIONS = ["Right", "Left", "Up", "Down"];
const DECK_TYPES = ["Phrases", "Essentials"];

export default ({
  selectedSwipeDirection,
  displayedDeckTypes,
  areWritingCorrectionsEnabled,

  onHome,
  onSelectSwipeDirection,
  onToggleDeckTypeDisplay,
  onToggleWritingCorrections,
}) => (
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
      <Section header="Decks to Display">
        {DECK_TYPES.map(deckType => (
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
