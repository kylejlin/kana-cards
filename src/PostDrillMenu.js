import React from 'react';
import Header from './Header';
import LadderListItem from './LadderListItem';

export default ({ deckName, onRestart, onHome }) => [
  <Header background="white">{deckName}</Header>,
  <LadderListItem onClick={onRestart}>Restart</LadderListItem>,
  <LadderListItem onClick={onHome}>Home</LadderListItem>,
];
