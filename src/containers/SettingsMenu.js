import React from 'react';
import Header from '../components/Header';
import HomeButton from '../components/HomeButton';
import Section from '../components/Section';
import Checkbox from '../components/Checkbox';

const DIRECTIONS = ['Right', 'Left', 'Up', 'Down'];
const DECK_TYPES = ['Phrases', 'Essentials'];

export default ({
  selectedSwipeDirection,
  displayedDeckTypes,

  onHome,
  onSelectSwipeDirection,
  onToggleDeckTypeDisplay,
}) => [
  <Header background="blue" key="Header">Settings</Header>,
  <HomeButton color="blue" onClick={onHome} key="HomeButton" />,
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
  </Section>,
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
];