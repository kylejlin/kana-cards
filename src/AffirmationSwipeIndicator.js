import React from 'react';
import './styles/AffirmationSwipeIndicator.css';

export default ({ selectedSwipeDirection, normalizedDeltaX }) => {
  switch (selectedSwipeDirection) {
    case 'Right':
      return (
        normalizedDeltaX > 0
          ? (
            <div
              className="AffirmationSwipeIndicator--correct"
              style={{
                width: normalizedDeltaX * 100 + 'vw',
              }}
            />
          )
          : (
            <div
              className="AffirmationSwipeIndicator--incorrect"
              style={{
                left: (1 + normalizedDeltaX) * 100 + 'vw',
                width: -normalizedDeltaX * 100 + 'vw',
              }}
            />
          )
      );
    case 'Left':
      return (
        normalizedDeltaX > 0
          ? (
            <div
              className="AffirmationSwipeIndicator--incorrect"
              style={{
                width: normalizedDeltaX * 100 + 'vw',
              }}
            />
          )
          : (
            <div
              className="AffirmationSwipeIndicator--correct"
              style={{
                left: (1 + normalizedDeltaX) * 100 + 'vw',
                width: -normalizedDeltaX * 100 + 'vw',
              }}
            />
          )
      );
    default:
      throw new TypeError('Illegal swipe direction: ' + selectedSwipeDirection);
  }
}
