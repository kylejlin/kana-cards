import React from 'react';
import Header from './Header';
import Button from './Button';

export default ({
  decks,

  onSelect,
}) => [
  <Header background="white">Lessons</Header>,

  (
    decks.map(deck => (
      <Button
        modifierName="blue shadow"
        key={deck.name}
        onClick={() => onSelect(deck)}
      >
        {deck.name}
      </Button>
    ))
  ),
];
