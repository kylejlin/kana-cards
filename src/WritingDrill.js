import React from 'react';
import './styles/WritingDrill.css';
import HomeButton from './HomeButton';
import Header from './Header';
import AffirmationSwipeIndicator from './AffirmationSwipeIndicator';

export default ({
  deckName,
  remainingCards,
  isTopCardRevealed,
  normalizedDeltaX,

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
    return [
      <Header background="blue">{deckName}</Header>,
      <HomeButton color="blue" onClick={onHome}/>,
      <canvas
        key="canvas"
        onTouchStart={onAffirmationSwipeStart}
        onTouchMove={onAffirmationSwipeMove}
        onTouchEnd={onAffirmationSwipeEnd}
        width={window.innerWidth}
        height={window.innerHeight * 0.62}
        ref={canvasRef}
      />,
      <div
        className="WritingDrill__CharacterContainer"
        onTouchStart={onAffirmationSwipeStart}
        onTouchMove={onAffirmationSwipeMove}
        onTouchEnd={onAffirmationSwipeEnd}
      >
        <div className="WritingDrill__Characters">
          {remainingCards[0].characters}
        </div>
      </div>,
      <AffirmationSwipeIndicator normalizedDeltaX={normalizedDeltaX} />,
    ];
  }
  return [
    <Header background="blue">{deckName}</Header>,
    <HomeButton color="blue" onClick={onHome}/>,
    <canvas
      key="canvas"
      onTouchStart={onPenStart}
      onTouchMove={onPenMove}
      onMouseDown={onPenStart}
      onMouseMove={onPenMove}
      onMouseUp={onPenEnd}
      width={window.innerWidth}
      height={window.innerHeight * 0.62}
      ref={canvasRef}
    />,
    <div className="WritingDrill__Pinyin" onClick={onReveal}>
      {remainingCards[0].pinyin}
    </div>,
  ];
};
