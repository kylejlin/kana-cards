import React from 'react';
import '../styles/Checkbox.css';

export default ({ children, checked, onClick }) => (
  <div
    className={'Checkbox' + (checked ? ' Checkbox--checked' : '')}
    onClick={onClick}
  >
    {children}
  </div>
);
