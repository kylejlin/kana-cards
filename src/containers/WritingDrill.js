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
      <Header background="blue" key="Header">{deckName}</Header>,
      <HomeButton color="blue" onClick={onHome} key="HomeButton" />,
      <canvas
        onTouchStart={onAffirmationSwipeStart}
        onTouchMove={onAffirmationSwipeMove}
        onTouchEnd={onAffirmationSwipeEnd}
        width={window.innerWidth}
        height={window.innerHeight * 0.62}
        ref={canvasRef}
        key="canvas"
      />,
      <div
        className="WritingDrill__CharacterContainer"
        onTouchStart={onAffirmationSwipeStart}
        onTouchMove={onAffirmationSwipeMove}
        onTouchEnd={onAffirmationSwipeEnd}
        key="WritingDrillCharacters"
      >
        <div className="WritingDrill__Characters">
          {remainingCards[0].characters}
        </div>
      </div>,
      <AffirmationSwipeIndicator
        selectedSwipeDirection={selectedSwipeDirection}
        normalizedDelta={normalizedDelta}
        key="AffirmationSwipeIndicator"
      />,
    ];
  }
  return [
    <Header background="blue" key="Header">{deckName}</Header>,
    <HomeButton color="blue" onClick={onHome} key="HomeButton" />,
    <canvas
      onTouchStart={onPenStart}
      onTouchMove={onPenMove}
      onMouseDown={onPenStart}
      onMouseMove={onPenMove}
      onMouseUp={onPenEnd}
      width={window.innerWidth}
      height={window.innerHeight * 0.62}
      ref={canvasRef}
      key="canvas"
    />,
    <div
      className="WritingDrill__Pinyin"
      onClick={onReveal}
      key="WritingDrillPinyin"
    >
      {remainingCards[0].pinyin}
    </div>,
  ];
};
