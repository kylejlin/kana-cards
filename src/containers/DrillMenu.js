import React from 'react';
import Header from '../components/Header';
import HomeButton from '../components/HomeButton';
import Button from '../components/Button';

export default ({ deckName, onDrillSelect, onHome }) => [
  <Header background="white">{deckName}</Header>,
  <HomeButton color="white" onClick={onHome}/>,
  <Button modifierName="blue shadow" onClick={() => onDrillSelect('READING_DRILL')}>
    Reading Drill
  </Button>,
  <Button modifierName="blue shadow" onClick={() => onDrillSelect('WRITING_DRILL')}>
    Writing Drill
  </Button>,
];
