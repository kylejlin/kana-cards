import { Set as ImmutableSet } from "immutable";
import React from "react";
import CardMenu from "./containers/CardMenu";
import DeckMenu from "./containers/DeckMenu";
import SettingsMenu from "./containers/SettingsMenu";
import WritingDrill from "./containers/WritingDrill";
import { kanaMaps } from "./decks";
import randomlySort from "./randomlySort";
import {
  AppState,
  AppStateMap,
  Card,
  CardMenuState,
  Deck,
  MoraCategory,
  PointerDownEvent,
  PointerMoveEvent,
  RomajiMap,
  SettingsState,
  StateType,
  SwipeDirection,
  WritingDrillState,
  PostDrillMenuState,
} from "./types";
import PostDrillMenu from "./containers/PostDrillMenu";

const HORIZONTAL_SWIPE_SIZE = window.innerWidth * 0.3;
const VERTICAL_SWIPE_SIZE = window.innerHeight * 0.2;

const SIMULATED_SWIPE_DURATION = 0.15e3;
const SIMULATED_SWIPE_PAUSE_FACTOR = 0.2;

const PEN_STROKE_WIDTH = 2;

const PEN_GUESS_COLOR = "#000088";
const PEN_CORRECTION_COLOR = "#0088FF";

const SUPPORTS_TOUCH = "ontouchstart" in window;

const LOCAL_STORAGE_KEYS = {
  selectedSwipeDirection: "selectedSwipeDirection",
  areWritingCorrectionsEnabled: "areWritingCorrectionsEnabled",
  includedCategories: "includedCategories",
} as const;

export default class CardsAgainstIlliteracy extends React.Component<
  {},
  AppState
> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private previousPenLocation: null | { x: number; y: number };

  constructor(props: {}) {
    super(props);

    this.state = {
      stateType: StateType.DeckMenu,
    };

    this.bindMethods();

    this.canvasRef = React.createRef();
    this.previousPenLocation = null;
  }

  bindMethods(): void {
    this.onSettings = this.onSettings.bind(this);
    this.onSelectSwipeDirection = this.onSelectSwipeDirection.bind(this);
    this.onToggleWritingCorrections = this.onToggleWritingCorrections.bind(
      this,
    );
    this.onDeckSelect = this.onDeckSelect.bind(this);
    this.onToggleCategory = this.onToggleCategory.bind(this);
    this.onDrillStart = this.onDrillStart.bind(this);
    this.onCardReveal = this.onCardReveal.bind(this);
    this.onAffirmationSwipeStart = this.onAffirmationSwipeStart.bind(this);
    this.onAffirmationSwipeMove = this.onAffirmationSwipeMove.bind(this);
    this.onAffirmationSwipeEnd = this.onAffirmationSwipeEnd.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onCardCorrect = this.onCardCorrect.bind(this);
    this.onCardIncorrect = this.onCardIncorrect.bind(this);
    this.onDrillRestart = this.onDrillRestart.bind(this);
    this.onHome = this.onHome.bind(this);
    this.onPenStart = this.onPenStart.bind(this);
    this.onPenMove = this.onPenMove.bind(this);
    this.onPenEnd = this.onPenEnd.bind(this);
  }

  componentDidMount() {
    if (!SUPPORTS_TOUCH) {
      window.addEventListener("keyup", this.onKeyUp);
    }
  }

  componentWillUnmount() {
    if (!SUPPORTS_TOUCH) {
      window.removeEventListener("keyup", this.onKeyUp);
    }
  }

  render(): JSX.Element {
    const { state } = this;

    switch (state.stateType) {
      case StateType.DeckMenu:
        return (
          <DeckMenu
            decks={[Deck.Hiragana, Deck.Katakana]}
            onSettings={this.onSettings}
            onSelect={this.onDeckSelect}
          />
        );
      case StateType.SettingsMenu:
        return (
          <SettingsMenu
            selectedSwipeDirection={state.selectedSwipeDirection}
            areWritingCorrectionsEnabled={state.areWritingCorrectionsEnabled}
            onHome={this.onHome}
            onSelectSwipeDirection={this.onSelectSwipeDirection}
            onToggleWritingCorrections={this.onToggleWritingCorrections}
          />
        );
      case StateType.CardMenu: {
        const { deck, includedCategories } = state;
        return (
          <CardMenu
            deck={deck}
            includedCategories={includedCategories}
            onToggleCategory={this.onToggleCategory}
            onHome={this.onHome}
            onDrillStart={this.onDrillStart}
          />
        );
      }
      case StateType.WritingDrill: {
        const {
          deck,
          remainingCards,
          isTopCardRevealed,
          selectedSwipeDirection,
          normalizedDelta,
          areWritingCorrectionsEnabled,
        } = state;

        return (
          <WritingDrill
            deck={deck}
            remainingCards={remainingCards}
            isTopCardRevealed={isTopCardRevealed}
            selectedSwipeDirection={selectedSwipeDirection}
            normalizedDelta={normalizedDelta}
            areWritingCorrectionsEnabled={areWritingCorrectionsEnabled}
            onHome={this.onHome}
            onPenStart={this.onPenStart}
            onPenMove={this.onPenMove}
            onPenEnd={this.onPenEnd}
            onReveal={this.onCardReveal}
            onAffirmationSwipeStart={this.onAffirmationSwipeStart}
            onAffirmationSwipeMove={this.onAffirmationSwipeMove}
            onAffirmationSwipeEnd={this.onAffirmationSwipeEnd}
            canvasRef={this.canvasRef}
          />
        );
      }
      case StateType.PostDrillMenu: {
        const { deck } = state;

        return (
          <PostDrillMenu
            deck={deck}
            onHome={this.onHome}
            onRestart={this.onDrillRestart}
          />
        );
      }
    }
  }

  onSettings(): void {
    const updatedState: SettingsState = {
      stateType: StateType.SettingsMenu,
      selectedSwipeDirection:
        (localStorage.getItem(
          LOCAL_STORAGE_KEYS.selectedSwipeDirection,
        ) as SwipeDirection) || "Right",
      areWritingCorrectionsEnabled:
        localStorage.getItem(
          LOCAL_STORAGE_KEYS.areWritingCorrectionsEnabled,
        ) === "true",
    };
    this.setState(updatedState);
  }

  onSelectSwipeDirection(selectedSwipeDirection: SwipeDirection): void {
    this.updateState(StateType.SettingsMenu, {
      selectedSwipeDirection,
    });
    localStorage.selectedSwipeDirection = selectedSwipeDirection;
  }

  updateState<T extends StateType>(
    _stateType: T,
    updated: Partial<AppStateMap[T]>,
  ): void {
    this.setState(updated as any);
  }

  onToggleWritingCorrections(): void {
    const state = this.state as SettingsState;
    const areWritingCorrectionsEnabled = !state.areWritingCorrectionsEnabled;
    const updatedState: Partial<SettingsState> = {
      areWritingCorrectionsEnabled,
    };
    this.updateState(state.stateType, updatedState);
    localStorage.areWritingCorrectionsEnabled = areWritingCorrectionsEnabled;
  }

  onDeckSelect(deck: Deck): void {
    const serializedCategorySet = localStorage.getItem(
      LOCAL_STORAGE_KEYS.includedCategories,
    );
    const updatedState: CardMenuState = {
      stateType: StateType.CardMenu,
      deck,
      includedCategories:
        serializedCategorySet === null
          ? ImmutableSet()
          : categorySetUtils.parse(serializedCategorySet),
    };
    this.setState(updatedState);
  }

  onToggleCategory(category: MoraCategory): void {
    const state = this.state as CardMenuState;
    const { includedCategories } = state;
    const updatedCategories = includedCategories.has(category)
      ? includedCategories.remove(category)
      : includedCategories.add(category);
    this.updateState(state.stateType, {
      includedCategories: updatedCategories,
    });
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.includedCategories,
      categorySetUtils.stringify(updatedCategories),
    );
  }

  onDrillStart(): void {
    const state = this.state as CardMenuState;
    const initialCards = randomlySort(
      getInitialCards(state.includedCategories, state.deck),
    );

    const newState: WritingDrillState = {
      stateType: StateType.WritingDrill,
      deck: state.deck,
      initialCards,
      remainingCards: initialCards,
      cardsToRepractice: [],
      isTopCardRevealed: false,
      areWritingCorrectionsEnabled:
        localStorage.getItem(
          LOCAL_STORAGE_KEYS.areWritingCorrectionsEnabled,
        ) === "true",
      selectedSwipeDirection:
        (localStorage.getItem(
          LOCAL_STORAGE_KEYS.selectedSwipeDirection,
        ) as SwipeDirection) || "Right",
      startingTouch: undefined,
      normalizedDelta: 0,
    };
    this.setState(newState);
  }

  onAffirmationSwipeStart({ changedTouches }: React.TouchEvent): void {
    const state = this.state as WritingDrillState;
    if (!state.isTopCardRevealed) {
      return;
    }

    const isSwipeDirectionHorizontal = ["Right", "Left"].includes(
      state.selectedSwipeDirection,
    );

    const touch = isSwipeDirectionHorizontal
      ? {
          id: changedTouches[0].identifier,
          x: changedTouches[0].clientX,
        }
      : {
          id: changedTouches[0].identifier,
          y: changedTouches[0].clientY,
        };

    const updatedState: Partial<WritingDrillState> = {
      startingTouch: touch,
      normalizedDelta: 0,
    };

    this.updateState(state.stateType, updatedState);
  }

  onAffirmationSwipeMove(event: React.TouchEvent): void {
    const state = this.state as WritingDrillState;

    event.preventDefault();
    const { changedTouches } = event;
    const { id } = state.startingTouch!;
    const newTouch = Array.from(changedTouches).find(t => t.identifier === id);
    if (!newTouch) {
      return;
    }
    const isSwipeDirectionHorizontal = ["Right", "Left"].includes(
      state.selectedSwipeDirection,
    );
    if (isSwipeDirectionHorizontal) {
      const deltaX = newTouch.clientX - state.startingTouch!.x!;
      const normalizedDelta = Math.max(
        -1,
        Math.min(1, deltaX / HORIZONTAL_SWIPE_SIZE),
      );
      const updatedState: Partial<WritingDrillState> = {
        normalizedDelta,
      };
      this.updateState(state.stateType, updatedState);
    } else {
      const deltaY = newTouch.clientY - state.startingTouch!.y!;
      const normalizedDelta = Math.max(
        -1,
        Math.min(1, deltaY / VERTICAL_SWIPE_SIZE),
      );
      const updatedState = {
        normalizedDelta,
      };
      this.updateState(state.stateType, updatedState);
    }
  }

  onAffirmationSwipeEnd(): void {
    const state = this.state as WritingDrillState;
    const { selectedSwipeDirection, normalizedDelta } = state;
    const updatedState: Partial<WritingDrillState> = {
      startingTouch: undefined,
      normalizedDelta: 0,
    };
    this.updateState(state.stateType, updatedState);
    if (
      (selectedSwipeDirection === "Right" && normalizedDelta === -1) ||
      (selectedSwipeDirection === "Left" && normalizedDelta === 1) ||
      (selectedSwipeDirection === "Up" && normalizedDelta === 1) ||
      (selectedSwipeDirection === "Down" && normalizedDelta === -1)
    ) {
      this.onCardIncorrect();
    } else if (
      (selectedSwipeDirection === "Right" && normalizedDelta === 1) ||
      (selectedSwipeDirection === "Left" && normalizedDelta === -1) ||
      (selectedSwipeDirection === "Up" && normalizedDelta === -1) ||
      (selectedSwipeDirection === "Down" && normalizedDelta === 1)
    ) {
      this.onCardCorrect();
    }
  }

  onKeyUp({ key }: KeyboardEvent): void {
    const { state } = this;

    if (state.stateType !== StateType.WritingDrill) {
      return;
    }

    if (state.isTopCardRevealed) {
      const isSwipeDirectionHorizontal = ["Right", "Left"].includes(
        state.selectedSwipeDirection,
      );

      if (isSwipeDirectionHorizontal) {
        if (key === "ArrowRight" || key === "Right") {
          this.simulateRightSwipe();
        } else if (key === "ArrowLeft" || key === "Left") {
          this.simulateLeftSwipe();
        }
      } else {
        if (key === "ArrowUp" || key === "Up") {
          this.simulateUpSwipe();
        } else if (key === "ArrowDown" || key === "Down") {
          this.simulateDownSwipe();
        }
      }
    }
  }

  onCardReveal(): void {
    const updatedState: Partial<WritingDrillState> = {
      isTopCardRevealed: true,
      normalizedDelta: 0,
    };
    this.updateState(StateType.WritingDrill, updatedState);
  }

  onCardCorrect(): void {
    this.clearCanvas();

    const state = this.state as WritingDrillState;

    if (state.remainingCards.length > 1) {
      this.updateState(state.stateType, {
        remainingCards: state.remainingCards.slice(1),
        isTopCardRevealed: false,
      });
    } else if (state.cardsToRepractice.length > 0) {
      this.updateState(state.stateType, {
        remainingCards: randomlySort(state.cardsToRepractice),
        cardsToRepractice: [],
        isTopCardRevealed: false,
      });
    } else {
      const newState: PostDrillMenuState = {
        stateType: StateType.PostDrillMenu,
        deck: state.deck,
        initialCards: state.initialCards,
      };
      this.setState(newState);
    }
  }

  clearCanvas(): void {
    const { width, height } = this.canvasRef.current!;
    const ctx = this.canvasRef.current!.getContext("2d")!;
    ctx.clearRect(0, 0, width, height);
  }

  onCardIncorrect(): void {
    this.clearCanvas();

    const state = this.state as WritingDrillState;

    if (state.remainingCards.length > 1) {
      this.updateState(state.stateType, {
        remainingCards: state.remainingCards.slice(1),
        cardsToRepractice: state.cardsToRepractice.concat([
          state.remainingCards[0],
        ]),
        isTopCardRevealed: false,
      });
    } else {
      this.updateState(state.stateType, {
        remainingCards: randomlySort(
          state.cardsToRepractice.concat([state.remainingCards[0]]),
        ),
        cardsToRepractice: [],
        isTopCardRevealed: false,
      });
    }
  }

  onDrillRestart(): void {
    const state = this.state as PostDrillMenuState;
    this.setState({
      stateType: StateType.WritingDrill,
      deck: state.deck,
      remainingCards: randomlySort(state.initialCards),
      isTopCardRevealed: false,
      normalizedDelta: 0,
      cardsToRepractice: [],
    });
  }

  onHome(): void {
    this.setState({
      stateType: StateType.DeckMenu,
    });
  }

  onPenStart(event: PointerDownEvent): void {
    const state = this.state as WritingDrillState;

    const [clientX, clientY] =
      event.type === "touchstart"
        ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
        : [event.clientX, event.clientY];
    const offsetY = window.innerHeight * 0.11;
    const adjustedY = clientY - offsetY;
    this.previousPenLocation = {
      x: clientX,
      y: adjustedY,
    };
    const ctx = this.canvasRef.current!.getContext("2d")!;
    ctx.fillStyle = state.isTopCardRevealed
      ? PEN_CORRECTION_COLOR
      : PEN_GUESS_COLOR;
    ctx.fillRect(
      clientX,
      clientY - offsetY,
      PEN_STROKE_WIDTH,
      PEN_STROKE_WIDTH,
    );
  }

  onPenMove(event: PointerMoveEvent): void {
    event.preventDefault();

    const state = this.state as WritingDrillState;

    if (this.previousPenLocation === null) {
      return;
    }

    const [clientX, clientY] =
      event.type === "touchmove"
        ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
        : [event.clientX, event.clientY];
    const offsetY = window.innerHeight * 0.11;
    const adjustedY = clientY - offsetY;
    const ctx = this.canvasRef.current!.getContext("2d")!;
    ctx.fillRect(clientX, clientY - offsetY, 1, 1);
    ctx.beginPath();
    ctx.moveTo(this.previousPenLocation.x, this.previousPenLocation.y);
    ctx.lineTo(clientX, adjustedY);
    ctx.closePath();
    ctx.lineWidth = PEN_STROKE_WIDTH;
    ctx.strokeStyle = state.isTopCardRevealed
      ? PEN_CORRECTION_COLOR
      : PEN_GUESS_COLOR;
    ctx.stroke();
    this.previousPenLocation = {
      x: clientX,
      y: adjustedY,
    };
  }

  onPenEnd(): void {
    this.previousPenLocation = null;
  }

  simulateRightSwipe(): void {
    const state = this.state as WritingDrillState;

    const start = Date.now();
    const render = () => {
      const now = Date.now();
      const completionFactor = (now - start) / SIMULATED_SWIPE_DURATION;
      if (completionFactor < 1 + SIMULATED_SWIPE_PAUSE_FACTOR) {
        requestAnimationFrame(render);
      } else {
        if (state.selectedSwipeDirection === "Right") {
          this.onCardCorrect();
        } else {
          this.onCardIncorrect();
        }
      }
      this.updateState(state.stateType, {
        normalizedDelta: Math.min(1, completionFactor),
      });
    };
    render();
  }

  simulateLeftSwipe(): void {
    const state = this.state as WritingDrillState;

    const start = Date.now();
    const render = () => {
      const now = Date.now();
      const completionFactor = (now - start) / SIMULATED_SWIPE_DURATION;
      if (completionFactor < 1 + SIMULATED_SWIPE_PAUSE_FACTOR) {
        requestAnimationFrame(render);
      } else {
        if (state.selectedSwipeDirection === "Left") {
          this.onCardCorrect();
        } else {
          this.onCardIncorrect();
        }
      }
      this.updateState(state.stateType, {
        normalizedDelta: Math.max(-1, -completionFactor),
      });
    };
    render();
  }

  simulateUpSwipe(): void {
    const state = this.state as WritingDrillState;
    const start = Date.now();
    const render = () => {
      const now = Date.now();
      const completionFactor = (now - start) / SIMULATED_SWIPE_DURATION;
      if (completionFactor < 1 + SIMULATED_SWIPE_PAUSE_FACTOR) {
        requestAnimationFrame(render);
      } else {
        if (state.selectedSwipeDirection === "Up") {
          this.onCardCorrect();
        } else {
          this.onCardIncorrect();
        }
      }
      this.updateState(state.stateType, {
        normalizedDelta: Math.max(-1, -completionFactor),
      });
    };
    render();
  }

  simulateDownSwipe() {
    const state = this.state as WritingDrillState;

    const start = Date.now();
    const render = () => {
      const now = Date.now();
      const completionFactor = (now - start) / SIMULATED_SWIPE_DURATION;
      if (completionFactor < 1 + SIMULATED_SWIPE_PAUSE_FACTOR) {
        requestAnimationFrame(render);
      } else {
        if (state.selectedSwipeDirection === "Down") {
          this.onCardCorrect();
        } else {
          this.onCardIncorrect();
        }
      }
      this.updateState(state.stateType, {
        normalizedDelta: Math.min(1, completionFactor),
      });
    };
    render();
  }
}

const categorySetUtils = {
  stringify(set: ImmutableSet<MoraCategory>): string {
    return JSON.stringify([...set.keys()]);
  },
  parse(string: string): ImmutableSet<MoraCategory> {
    return ImmutableSet(JSON.parse(string));
  },
};

function getInitialCards(
  categories: ImmutableSet<MoraCategory>,
  deck: Deck,
): Card[] {
  const cards = [];
  for (const category of categories) {
    for (const romaji of RomajiMap[category]) {
      cards.push({
        romaji,
        image: kanaMaps[deck]
          .expect("Kana image map has not loaded yet")
          .get(romaji)!,
      });
    }
  }
  return cards;
}
