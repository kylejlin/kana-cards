import React from 'react';
import Header from '../components/Header';
import HomeButton from '../components/HomeButton';
import Body from '../components/Body';
import Section from '../components/Section';
import Checkbox from '../components/Checkbox';

const DIRECTIONS = ['Right', 'Left', 'Up', 'Down'];
const DECK_TYPES = ['Phrases', 'Essentials'];

export default ({
  selectedSwipeDirection,
  displayedDeckTypes,
  areWritingCorrectionsEnabled,

  onHome,
  onSelectSwipeDirection,
  onToggleDeckTypeDisplay,
  onToggleWritingCorrections,
}) => [
  <Header background="blue" key="Header">Settings</Header>,
  <HomeButton color="blue" onClick={onHome} key="HomeButton" />,
  <Body>
    <Section header="Correct Answer Swipe Direction" key="SwipeDirectionSection">
      {
        DIRECTIONS.map((direction) => (
          <Checkbox
            checked={direction === selectedSwipeDirection}
            onClick={() => onSelectSwipeDirection(direction)}
            key={direction}
          >
            {direction}
          </Checkbox>
        ))
      }
    </Section>
    <Section header="Decks to Display" key="DeckSection">
      {
        DECK_TYPES.map((deckType) => (
          <Checkbox
            checked={displayedDeckTypes[deckType]}
            onClick={() => onToggleDeckTypeDisplay(deckType)}
            key={deckType}
          >
            {deckType}
          </Checkbox>
        ))
      }
    </Section>
    <Section header="Writing Corrections" key="WritingCorrectionSectin">
      <Checkbox
        checked={areWritingCorrectionsEnabled}
        onClick={onToggleWritingCorrections}
      >
        Enabled?
      </Checkbox>
    </Section>
  </Body>
];
