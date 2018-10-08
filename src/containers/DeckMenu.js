import React from 'react';
import Header from '../components/Header';
import SettingsButton from '../components/SettingsButton';
import Button from '../components/Button';

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
