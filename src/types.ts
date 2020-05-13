export interface AppState {
  type: MenuType;
  remainingCards: Card[];
  deckName: string;
  isTopCardRevealed: boolean;
  selectedSwipeDirection: SwipeDirectionType;
  normalizedDelta: number;
  displayedDeckTypes: DisplayedDeckTypes;
  areWritingCorrectionsEnabled: boolean;
  deck: Deck;
  cardsToRepractice: Card[];
  startingTouch: null | { id: number; x?: number; y?: number };
}

export type MenuType =
  | "SETTINGS_MENU"
  | "DECK_MENU"
  | "DRILL_MENU"
  | "READING_DRILL"
  | "WRITING_DRILL";

export type DrillType = "READING_DRILL" | "WRITING_DRILL";

export type SwipeDirectionType = "Right" | "Left" | "Up" | "Down";

export type DeckType = "Phrases" | "Essentials";

export interface Deck {
  readonly name: string;
  readonly cards: Card[];
}

export interface Card {
  readonly characters: string;
  readonly pinyin: string;
  readonly meaning: string;
}

export interface DisplayedDeckTypes {
  Phrases: boolean;
  Essentials: boolean;
}

export type PointerDownEvent = TouchStartEvent | MouseDownEvent;

export interface TouchStartEvent extends React.TouchEvent {
  type: "touchstart";
}

export interface MouseDownEvent extends React.MouseEvent {
  type: "mousedown";
}

export type PointerMoveEvent = TouchMoveEvent | MouseMoveEvent;

export interface TouchMoveEvent extends React.TouchEvent {
  type: "touchmove";
}

export interface MouseMoveEvent extends React.MouseEvent {
  type: "mousemove";
}

export type PointerUpEvent = TouchEndEvent | MouseUpEvent;

export interface TouchEndEvent extends React.TouchEvent {
  type: "touchend";
}

export interface MouseUpEvent extends React.MouseEvent {
  type: "mouseup";
}
