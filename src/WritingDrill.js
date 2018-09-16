import React from 'react';
import './styles/WritingDrill.css';
import Header from './Header';
import AffirmationSwipeIndicator from './AffirmationSwipeIndicator';
import Button from './Button';

export default ({
  deckName,
  remainingCards,
  isTopCardRevealed,
  normalizedDeltaX,

  onPenStart,
  onPenMove,
  onReveal,
  onAffirmationSwipeStart,
  onAffirmationSwipeMove,
  onAffirmationSwipeEnd,

  canvasRef,
}) => {
  if (isTopCardRevealed) {
    return [
      <Header background="blue">{deckName}</Header>,
      <div className="WritingDrill__Pinyin">{remainingCards[0].pinyin}</div>,
      <div className="WritingDrill__CharacterContainer">
        <div className="WritingDrill__Characters">
          {remainingCards[0].characters}
        </div>
      </div>,
      <canvas
        key="canvas"
        className="WritingDrill__Canvas--semitransparent"
        onTouchStart={onAffirmationSwipeStart}
        onTouchMove={onAffirmationSwipeMove}
        onTouchEnd={onAffirmationSwipeEnd}
        width={window.innerWidth}
        height={window.innerHeight * 0.69}
        ref={canvasRef}
      />,
      <AffirmationSwipeIndicator normalizedDeltaX={normalizedDeltaX} />,
    ];
  }
  return [
    <Header background="blue">{deckName}</Header>,
    <div className="WritingDrill__Pinyin">{remainingCards[0].pinyin}</div>,
    <canvas
      key="canvas"
      className="WritingDrill__Canvas"
      onTouchStart={onPenStart}
      onTouchMove={onPenMove}
      width={window.innerWidth}
      height={window.innerHeight * 0.69}
      ref={canvasRef}
    />,
    <Button modifierName="blue center" onClick={onReveal}>Reveal</Button>,
  ];
};
