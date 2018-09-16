import React from 'react';
import Header from './Header';
import Button from './Button';

export default ({ deckName, onRestart, onHome }) => [
  <Header background="white">{deckName}</Header>,
  <Button modifierName="blue shadow" onClick={onRestart}>Restart</Button>,
  <Button modifierName="blue shadow" onClick={onHome}>Home</Button>,
];
