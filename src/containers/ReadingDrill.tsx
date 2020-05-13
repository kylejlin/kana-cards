import React from "react";
import AffirmationSwipeIndicator from "../components/AffirmationSwipeIndicator";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import "../styles/ReadingDrill.css";
import { Card, SwipeDirectionType } from "../types";

export interface Props {
  deckName: string;
  remainingCards: Card[];
  isTopCardRevealed: boolean;
  selectedSwipeDirection: SwipeDirectionType;
  normalizedDelta: number;

  onHome(): void;
  onReveal(): void;
  onAffirmationSwipeStart(event: React.TouchEvent): void;
  onAffirmationSwipeMove(event: React.TouchEvent): void;
  onAffirmationSwipeEnd(event: React.TouchEvent): void;
}

export default function ReadingDrill(props: Props): React.ReactElement {
  const {
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
  } = props;

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
}

function getCardFrontClassName(card: Card): string {
  return (
    "ReadingDrill__Character" +
    (card.characters.length > 4 ? " ReadingDrill__Character--small" : "")
  );
}
