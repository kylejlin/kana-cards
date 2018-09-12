import React from 'react';
import Header from './Header';
import LadderListItem from './LadderListItem';

export default ({ deckName, onDrillSelect, onHome }) => [
  <Header background="white">{deckName}</Header>,
  <LadderListItem onClick={() => onDrillSelect('READING_DRILL')}>
    Reading Drill
  </LadderListItem>,
  <LadderListItem onClick={() => onDrillSelect('WRITING_DRILL')}>
    Writing Drill
  </LadderListItem>,
  <LadderListItem onClick={onHome}>
    Home
  </LadderListItem>,
];
