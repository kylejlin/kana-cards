import React from 'react';
import './styles/Reviewer.css';

const Reviewer = ({
  lessonId,
  remaining,
  isRevealed,
  normalizedDeltaY,

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

        <div className="Reviewer__CardFrontContainer">
          <div className="Reviewer__CardFront" onClick={onReveal}>
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
        normalizedDeltaY < 0
          ? (
            <div
              className="Reviewer__Overlay--correct"
              style={{
                top: 12 + (1 + normalizedDeltaY) * 88 + 'vh',
              }}
            />
          )
          : (
            <div
              className="Reviewer__Overlay--incorrect"
              style={{
                height: normalizedDeltaY * 88 + 'vh',
              }}
            />
          )
      }
    </div>
  );
};

export default Reviewer;
