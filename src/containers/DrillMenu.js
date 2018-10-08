import React from 'react';
import Header from '../components/Header';
import HomeButton from '../components/HomeButton';
import Button from '../components/Button';

export default ({ deckName, onDrillSelect, onHome }) => [
  <Header background="white" key="Header">{deckName}</Header>,
  <HomeButton color="white" onClick={onHome} key="HomeButton" />,
  <Button
    modifierName="blue shadow"
    onClick={() => onDrillSelect('READING_DRILL')}
    key="ReadingDrillButton"
  >
    Reading Drill
  </Button>,
  <Button
    modifierName="blue shadow"
    onClick={() => onDrillSelect('WRITING_DRILL')}
    key="WritingDrillButton"
  >
    Writing Drill
  </Button>,
];
