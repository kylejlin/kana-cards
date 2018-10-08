import React from 'react';
import '../styles/HomeButton.css';

export default ({ color, onClick }) => (
  <button className={'HomeButton HomeButton--' + color} onClick={onClick}>
    x
  </button>
);
