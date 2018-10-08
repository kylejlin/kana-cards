import React from 'react';
import '../styles/Header.css';

export default ({ children, background }) => (
  <div className={'Header Header--' + background}>{children}</div>
);
