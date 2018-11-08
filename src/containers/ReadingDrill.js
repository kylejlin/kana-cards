import React from "react";
import "../styles/ReadingDrill.css";
import HomeButton from "../components/HomeButton";
import Header from "../components/Header";
import AffirmationSwipeIndicator from "../components/AffirmationSwipeIndicator";

const getCardFrontClassName = card =>
  "ReadingDrill__Character" +
  (card.characters.length > 4 ? " ReadingDrill__Character--small" : "");

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
    return (
      <>
        <Header background="blue">{deckName}</Header>
        <HomeButton color="blue" onClick={onHome} />

        <div className="ReadingDrill__CharacterContainer" onClick={onReveal}>
          <div className={getCardFrontClassName(remainingCards[0])}>
            {remainingCards[0].characters}
          </div>
        </div>

        <div className="ReadingDrill__PinyinContainer" onClick={onReveal} />
      </>
    );
  }

  return (
    <>
      <Header background="blue">{deckName}</Header>
      <HomeButton color="blue" onClick={onHome} />

      <div
        className="ReadingDrill__CharacterContainer"
        onTouchStart={onAffirmationSwipeStart}
        onTouchMove={onAffirmationSwipeMove}
        onTouchEnd={onAffirmationSwipeEnd}
      >
        <div className={getCardFrontClassName(remainingCards[0])}>
          {remainingCards[0].characters}
        </div>
      </div>

      <div
        className="ReadingDrill__PinyinContainer"
        onTouchStart={onAffirmationSwipeStart}
        onTouchMove={onAffirmationSwipeMove}
        onTouchEnd={onAffirmationSwipeEnd}
      >
        <div className="ReadingDrill__Pinyin">
          <div>{remainingCards[0].pinyin}</div>
          <div>({remainingCards[0].meaning})</div>
        </div>
      </div>

      <AffirmationSwipeIndicator
        selectedSwipeDirection={selectedSwipeDirection}
        normalizedDelta={normalizedDelta}
      />
    </>
  );
};

export default ReadingDrill;
