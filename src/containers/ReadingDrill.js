import React from 'react';
import '../styles/ReadingDrill.css';
import HomeButton from '../components/HomeButton';
import Header from '../components/Header';
import AffirmationSwipeIndicator from '../components/AffirmationSwipeIndicator';

const getCardFrontClassName = card => (
  'ReadingDrill__CardFront' + (
    card.characters.length > 4 ? ' ReadingDrill__CardFront--small' : ''
  )
);

const ReadingDrill = ({
  deckName,
  remainingCards,
  isTopCardRevealed,
  selectedSwipeDirection,
  normalizedDelta,

  onHome,
  onReveal,
  onAffirmationSwipeStart,
  onAffirmationSwipeMove,
  onAffirmationSwipeEnd,
}) => {
  if (!isTopCardRevealed) {
    return [
      <Header background="blue" key="Header">{deckName}</Header>,
      <HomeButton color="blue" onClick={onHome} key="HomeButton"/>,

      <div
        className="ReadingDrill__CardFrontContainer"
        onClick={onReveal}
        key="ReadingDrillCharacters"
      >
        <div className={getCardFrontClassName(remainingCards[0])}>
          {remainingCards[0].characters}
        </div>
      </div>,
    ];
  }

  return [
    <Header background="blue" key="Header">{deckName}</Header>,
    <HomeButton color="blue" onClick={onHome} key="HomeButton" />,

    <div
      className="ReadingDrill__CardBackContainer"
      onTouchStart={onAffirmationSwipeStart}
      onTouchMove={onAffirmationSwipeMove}
      onTouchEnd={onAffirmationSwipeEnd}
      key="ReadingDrillPinyin"
    >
      <div className="ReadingDrill__CardBack">
        <div>{remainingCards[0].pinyin}</div>
        <div>({remainingCards[0].meaning})</div>
      </div>
    </div>,

    <AffirmationSwipeIndicator
      selectedSwipeDirection={selectedSwipeDirection}
      normalizedDelta={normalizedDelta}
      key="AffirmationSwipeIndicator"
    />,
  ];
};

export default ReadingDrill;
