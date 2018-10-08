import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';

export default ({ deckName, onRestart, onHome }) => [
  <Header background="white">{deckName}</Header>,
  <Button modifierName="blue shadow" onClick={onRestart}>Restart</Button>,
  <Button modifierName="blue shadow" onClick={onHome}>Home</Button>,
];
