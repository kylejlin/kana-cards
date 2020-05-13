import { Set as ImmutableSet } from "immutable";

export type AppState =
  | DeckMenuState
  | SettingsState
  | CardMenuState
  | WritingDrillState
  | PostDrillMenuState;

export enum StateType {
  DeckMenu,
  SettingsMenu,
  CardMenu,
  WritingDrill,
  PostDrillMenu,
}

export interface AppStateMap {
  [StateType.DeckMenu]: DeckMenuState;
  [StateType.SettingsMenu]: SettingsState;
  [StateType.CardMenu]: CardMenuState;
  [StateType.WritingDrill]: WritingDrillState;
  [StateType.PostDrillMenu]: PostDrillMenuState;
}

export interface DeckMenuState {
  stateType: StateType.DeckMenu;
}

export interface SettingsState {
  stateType: StateType.SettingsMenu;
  selectedSwipeDirection: SwipeDirection;
  areWritingCorrectionsEnabled: boolean;
}

export interface CardMenuState {
  stateType: StateType.CardMenu;
  deck: Deck;
  includedCategories: ImmutableSet<MoraCategory>;
}

export interface WritingDrillState {
  stateType: StateType.WritingDrill;
  deck: Deck;
  initialCards: Card[];
  remainingCards: Card[];
  cardsToRepractice: Card[];
  isTopCardRevealed: boolean;
  areWritingCorrectionsEnabled: boolean;
  selectedSwipeDirection: SwipeDirection;
  startingTouch: { id: number; x?: number; y?: number } | undefined;
  normalizedDelta: number;
}

export interface PostDrillMenuState {
  stateType: StateType.PostDrillMenu;
  deck: Deck;
  initialCards: Card[];
}

export enum MoraCategory {
  v,
  Kv,
  Sv,
  Tv,
  Nv,
  Hv,
  Mv,
  Yv,
  Rv,
  Wv,
  N,
}

export type Romaji<
  S extends MoraCategory = MoraCategory
> = typeof RomajiMap[S][number];

export const RomajiMap = {
  [MoraCategory.v]: ["a", "i", "u", "e", "o"],
  [MoraCategory.Kv]: ["ka", "ki", "ku", "ke", "ko"],
  [MoraCategory.Sv]: ["sa", "shi", "su", "se", "so"],
  [MoraCategory.Tv]: ["ta", "chi", "tsu", "te", "to"],
  [MoraCategory.Nv]: ["na", "ni", "nu", "ne", "no"],
  [MoraCategory.Hv]: ["ha", "hi", "fu", "he", "ho"],
  [MoraCategory.Mv]: ["ma", "mi", "mu", "me", "mo"],
  [MoraCategory.Yv]: ["ya", "yu", "yo"],
  [MoraCategory.Rv]: ["ra", "ri", "ru", "re", "ro"],
  [MoraCategory.Wv]: ["wa", "wi", "we", "wo"],
  [MoraCategory.N]: ["n"],
} as const;

export type SwipeDirection = "Right" | "Left" | "Up" | "Down";

export enum Deck {
  Hiragana,
  Katakana,
}

export interface Card {
  readonly romaji: string;
  readonly image: HTMLImageElement;
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

export type NestedPromiseArray<T> = (T | Promise<T> | NestedPromiseArray<T>)[];

export type NestedArray<T> = (T | NestedArray<T>)[];
