import React from 'react';
import Header from './Header';
import Button from './Button';

export default ({ deckName, onDrillSelect, onHome }) => [
  <Header background="white">{deckName}</Header>,
  <Button modifierName="blue shadow" onClick={() => onDrillSelect('READING_DRILL')}>
    Reading Drill
  </Button>,
  <Button modifierName="blue shadow" onClick={() => onDrillSelect('WRITING_DRILL')}>
    Writing Drill
  </Button>,
  <Button modifierName="blue shadow" onClick={onHome}>
    Home
  </Button>,
];
