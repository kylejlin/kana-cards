import React from 'react';
import './styles/Radio.css';

export default ({ children, checked, onClick }) => (
  <div
    className={'Radio' + (checked ? ' Radio--checked' : '')}
    onClick={onClick}
  >
    {children}
  </div>
);
