import React from 'react';
import '../styles/WritingDrill.css';
import HomeButton from '../components/HomeButton';
import Header from '../components/Header';
import AffirmationSwipeIndicator from '../components/AffirmationSwipeIndicator';

export default ({
  deckName,
  remainingCards,
  isTopCardRevealed,
  selectedSwipeDirection,
  normalizedDelta,
  areWritingCorrectionsEnabled,

  onHome,
  onPenStart,
  onPenMove,
  onPenEnd,
  onReveal,
  onAffirmationSwipeStart,
  onAffirmationSwipeMove,
  onAffirmationSwipeEnd,

  canvasRef,
}) => {
  if (isTopCardRevealed) {
    return (
      <>
        <Header background="blue">{deckName}</Header>
        <HomeButton color="blue" onClick={onHome} />
        <canvas
          onTouchStart={
            areWritingCorrectionsEnabled ? onPenStart : onAffirmationSwipeStart
          }
          onTouchMove={
            areWritingCorrectionsEnabled ? onPenMove : onAffirmationSwipeMove
          }
          onTouchEnd={
            areWritingCorrectionsEnabled ? onPenEnd : onAffirmationSwipeEnd
          }
          onMouseDown={
            areWritingCorrectionsEnabled ? onPenStart : onAffirmationSwipeStart
          }
          onMouseMove={
            areWritingCorrectionsEnabled ? onPenMove : onAffirmationSwipeMove
          }
          onMouseUp={
            areWritingCorrectionsEnabled ? onPenEnd : onAffirmationSwipeEnd
          }
          width={window.innerWidth}
          height={window.innerHeight * 0.62}
          ref={canvasRef}
        />
        <div
          className="WritingDrill__CharacterContainer"
          onTouchStart={onAffirmationSwipeStart}
          onTouchMove={onAffirmationSwipeMove}
          onTouchEnd={onAffirmationSwipeEnd}
        >
          <div className="WritingDrill__Characters">
            {remainingCards[0].characters}
          </div>
        </div>
        <AffirmationSwipeIndicator
          selectedSwipeDirection={selectedSwipeDirection}
          normalizedDelta={normalizedDelta}
        />
      </>
    );
  }
  return (
    <>
      <Header background="blue">{deckName}</Header>
      <HomeButton color="blue" onClick={onHome} />
      <canvas
        onTouchStart={onPenStart}
        onTouchMove={onPenMove}
        onMouseDown={onPenStart}
        onMouseMove={onPenMove}
        onMouseUp={onPenEnd}
        width={window.innerWidth}
        height={window.innerHeight * 0.62}
        ref={canvasRef}
      />
      <div
        className="WritingDrill__Pinyin"
        onClick={onReveal}
      >
        {remainingCards[0].pinyin}
      </div>
    </>
  );
};
