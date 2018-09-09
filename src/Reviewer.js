import React from 'react';
import './styles/Reviewer.css';

const Reviewer = ({
  lessonId,
  remaining,
  isRevealed,
  normalizedDeltaX,

  onReveal,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onRestart,
  onHome,
}) => {
  if (remaining.length === 0) {
    return (
      <div className="Reviewer">
        <div className="Reviewer__Header--inverted">
          {lessonId}
        </div>

        <div className="Reviewer__Button" onClick={onRestart}>
          Restart
        </div>
        <div className="Reviewer__Button" onClick={onHome}>
          Home
        </div>
      </div>
    );
  }

  if (!isRevealed) {
    return (
      <div className="Reviewer">
        <div className="Reviewer__Header">
          {lessonId}
        </div>

        <div className="Reviewer__CardFrontContainer" onClick={onReveal}>
          <div className="Reviewer__CardFront">
            {remaining[0].characters}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Reviewer">
      <div className="Reviewer__Header">
        {lessonId}
      </div>

      <div
        className="Reviewer__CardBackContainer"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="Reviewer__CardBack">
          <div>{remaining[0].pinyin}</div>
          <div>({remaining[0].meaning})</div>
        </div>
      </div>

      {
        normalizedDeltaX > 0
          ? (
            <div
              className="Reviewer__Overlay--correct"
              style={{
                width: normalizedDeltaX * 100 + 'vw',
              }}
            />
          )
          : (
            <div
              className="Reviewer__Overlay--incorrect"
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

export default Reviewer;
