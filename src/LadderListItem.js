import React from 'react';
import './styles/LadderListItem.css';

export default ({ onClick, children }) => (
  <div className="LadderListItem" onClick={onClick}>
    {children}
  </div>
);
