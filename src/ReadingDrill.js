import React from 'react';
import './styles/ReadingDrill.css';
import Header from './Header';
import AffirmationSwipeIndicator from './AffirmationSwipeIndicator';

const ReadingDrill = ({
  deckName,
  remainingCards,
  isTopCardRevealed,
  normalizedDeltaX,

  onReveal,
  onAffirmationSwipeStart,
  onAffirmationSwipeMove,
  onAffirmationSwipeEnd,
}) => {
  if (!isTopCardRevealed) {
    return [
      <Header background="blue">{deckName}</Header>,

      <div className="ReadingDrill__CardFrontContainer" onClick={onReveal}>
        <div className="ReadingDrill__CardFront">
          {remainingCards[0].characters}
        </div>
      </div>,
    ];
  }

  return [
    <Header background="blue">{deckName}</Header>,

    <div
      className="ReadingDrill__CardBackContainer"
      onTouchStart={onAffirmationSwipeStart}
      onTouchMove={onAffirmationSwipeMove}
      onTouchEnd={onAffirmationSwipeEnd}
    >
      <div className="ReadingDrill__CardBack">
        <div>{remainingCards[0].pinyin}</div>
        <div>({remainingCards[0].meaning})</div>
      </div>
    </div>,

    <AffirmationSwipeIndicator normalizedDeltaX={normalizedDeltaX} />,
  ];
};

export default ReadingDrill;
