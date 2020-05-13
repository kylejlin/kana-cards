import React from "react";
import AffirmationSwipeIndicator from "../components/AffirmationSwipeIndicator";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import getDeckName from "../getDeckName";
import "../styles/WritingDrill.css";
import {
  Card,
  Deck,
  PointerDownEvent,
  PointerMoveEvent,
  PointerUpEvent,
  SwipeDirection,
} from "../types";

export interface Props {
  deck: Deck;
  remainingCards: Card[];
  isTopCardRevealed: boolean;
  selectedSwipeDirection: SwipeDirection;
  normalizedDelta: number;
  areWritingCorrectionsEnabled: boolean;

  onHome(): void;
  onPenStart(event: PointerDownEvent): void;
  onPenMove(event: PointerMoveEvent): void;
  onPenEnd(event: PointerUpEvent): void;
  onReveal(): void;
  onAffirmationSwipeStart(event: React.TouchEvent): void;
  onAffirmationSwipeMove(event: React.TouchEvent): void;
  onAffirmationSwipeEnd(event: React.TouchEvent): void;

  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface State {}

export default class WritingDrill extends React.Component<Props, State> {
  render() {
    const {
      deck,
      remainingCards,
      isTopCardRevealed,
      selectedSwipeDirection,
      normalizedDelta,
      areWritingCorrectionsEnabled,

      onHome,
      onReveal,
      onAffirmationSwipeStart,
      onAffirmationSwipeMove,
      onAffirmationSwipeEnd,

      canvasRef,
    } = this.props;

    const onPenStart = this.props.onPenStart as (
      event: React.TouchEvent | React.MouseEvent,
    ) => void;
    const onPenMove = this.props.onPenMove as (
      event: React.TouchEvent | React.MouseEvent,
    ) => void;
    const onPenEnd = this.props.onPenEnd as (
      event: React.TouchEvent | React.MouseEvent,
    ) => void;

    if (isTopCardRevealed) {
      return (
        <>
          <Header background="blue">{getDeckName(deck)}</Header>
          <HomeButton color="blue" onClick={onHome} />
          <canvas
            onTouchStart={
              areWritingCorrectionsEnabled
                ? onPenStart
                : onAffirmationSwipeStart
            }
            onTouchMove={
              areWritingCorrectionsEnabled ? onPenMove : onAffirmationSwipeMove
            }
            onTouchEnd={
              areWritingCorrectionsEnabled ? onPenEnd : onAffirmationSwipeEnd
            }
            onMouseDown={areWritingCorrectionsEnabled ? onPenStart : noOp}
            onMouseMove={areWritingCorrectionsEnabled ? onPenMove : noOp}
            onMouseUp={areWritingCorrectionsEnabled ? onPenEnd : noOp}
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
              <img
                className="WritingDrill__StrokeOrderImage"
                alt={remainingCards[0].romaji + " stroke order"}
                src={remainingCards[0].image.src}
              />
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
        <Header background="blue">{getDeckName(deck)}</Header>
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
        <div className="WritingDrill__Romaji" onClick={onReveal}>
          {remainingCards[0].romaji}
        </div>
      </>
    );
  }

  componentDidMount() {
    this.props.canvasRef.current!.addEventListener(
      "touchmove",
      e => {
        e.preventDefault();
      },
      { passive: false },
    );
  }
}

function noOp(): void {}
