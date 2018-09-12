import React from 'react';
import './styles/ReadingDrill.css';
import Header from './Header';

const ReadingDrill = ({
  deckName,
  remainingCards,
  isTopCardRevealed,
  normalizedDeltaX,

  onReveal,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onRestart,
  onHome,
}) => {
  if (remainingCards.length === 0) {
    return (
      <div className="ReadingDrill">
        <Header background="white">{deckName}</Header>

        <div className="ReadingDrill__Button" onClick={onRestart}>
          Restart
        </div>
        <div className="ReadingDrill__Button" onClick={onHome}>
          Home
        </div>
      </div>
    );
  }

  if (!isTopCardRevealed) {
    return (
      <div className="ReadingDrill">
        <Header background="blue">{deckName}</Header>

        <div className="ReadingDrill__CardFrontContainer" onClick={onReveal}>
          <div className="ReadingDrill__CardFront">
            {remainingCards[0].characters}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ReadingDrill">
      <Header background="blue">{deckName}</Header>

      <div
        className="ReadingDrill__CardBackContainer"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="ReadingDrill__CardBack">
          <div>{remainingCards[0].pinyin}</div>
          <div>({remainingCards[0].meaning})</div>
        </div>
      </div>

      {
        normalizedDeltaX > 0
          ? (
            <div
              className="ReadingDrill__Overlay--correct"
              style={{
                width: normalizedDeltaX * 100 + 'vw',
              }}
            />
          )
          : (
            <div
              className="ReadingDrill__Overlay--incorrect"
              style={{
                left: (1 + normalizedDeltaX) * 100 + 'vw',
                width: -normalizedDeltaX * 100 + 'vw',
              }}
            />
          )
      }
    </div>
  );
};

export default ReadingDrill;
