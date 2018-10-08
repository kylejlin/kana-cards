import React from 'react';
import '../styles/Section.css';

export default ({ header, children }) => (
  <div className="Section">
    <div className="Section__Header">{header}</div>
    {children}
  </div>
);
