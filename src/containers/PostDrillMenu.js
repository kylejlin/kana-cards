import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';

export default ({ deckName, onRestart, onHome }) => [
  <Header background="white" key="Header">{deckName}</Header>,
  <Button
    modifierName="blue shadow"
    onClick={onRestart}
    key="RestartButton"
  >
    Restart
  </Button>,
  <Button
    modifierName="blue shadow"
    onClick={onHome}
    key="HomeButton"
  >
    Home
  </Button>,
];
