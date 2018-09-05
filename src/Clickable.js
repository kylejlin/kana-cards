import React from 'react';

const SUPPORTS_TOUCH = 'touchstart' in window;

const NOOP = () => undefined;

const Clickable = ({ children, onClick }) => (
  React.Children.map(children, (child) => (
    React.cloneElement(child, {
      onClick: SUPPORTS_TOUCH ? NOOP : onClick,
      onTouchStart: SUPPORTS_TOUCH ? onClick : NOOP,
    })
  ))
);

export default Clickable;
