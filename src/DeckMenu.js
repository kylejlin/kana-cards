import React from 'react';
import Header from './Header';
import SettingsButton from './SettingsButton';
import Button from './Button';

export default ({
  decks,

  onSettings,
  onSelect,
}) => [
  <Header background="white">Lessons</Header>,
  <SettingsButton onClick={onSettings} />,

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
