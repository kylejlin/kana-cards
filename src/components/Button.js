import React from 'react';
import '../styles/Button.css';
import modifierNameToClassName from '../modifierNameToClassName';

export default ({ modifierName = '', onClick, children }) => (
  <div
    className={modifierNameToClassName('Button', modifierName)}
    onClick={onClick}
  >
    {children}
  </div>
);
