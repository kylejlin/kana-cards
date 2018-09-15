import React from 'react';
import './styles/AffirmationSwipeIndicator.css';

export default ({ normalizedDeltaX }) => (
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
