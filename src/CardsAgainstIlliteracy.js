import React from 'react';
import decks from './decks/index';
import randomlySort from './randomlySort';
import DeckMenu from './DeckMenu';
import ReadingDrill from './ReadingDrill';

const SWIPE_SIZE = window.innerWidth * 0.40;

const SIMULATED_SWIPE_DURATION = 0.15e3;
const SIMULATED_SWIPE_PAUSE_FACTOR = 0.2;

const SUPPORTS_TOUCH = 'ontouchstart' in window;

class CardsAgainstIlliteracy extends React.Component {
  constructor() {
    super();

    this.state = {
      type: 'DECK_MENU',
    };

    [
      'onDeckSelect',
      'onCardReveal',
      'onCardTouchStart',
      'onCardTouchMove',
      'onCardTouchEnd',
      'onKeyUp',
      'onCardCorrect',
      'onCardIncorrect',
      'onLessonRestart',
      'onHome',
    ].forEach((methodName) => {
      this[methodName] = this[methodName].bind(this);
    });
  }

  componentDidMount() {
    if (!SUPPORTS_TOUCH) {
      window.addEventListener('keyup', this.onKeyUp);
    }
  }

  componentWillUnmount() {
    if (!SUPPORTS_TOUCH) {
      window.removeEventListener('keyup', this.onKeyUp);
    }
  }

  render() {
    const { type } = this.state;
    if (type === 'DECK_MENU') {
      return (
        <DeckMenu
          decks={decks}

          onSelect={this.onDeckSelect}
        />
      );
    } else if (type === 'READING_DRILL') {
      const {
        deckName,
        remainingCards,
        isTopCardRevealed,
        normalizedDeltaX,
      } = this.state;
      return (
        <ReadingDrill
          deckName={deckName}
          remainingCards={remainingCards}
          isTopCardRevealed={isTopCardRevealed}
          normalizedDeltaX={normalizedDeltaX}

          onReveal={this.onCardReveal}
          onTouchStart={this.onCardTouchStart}
          onTouchMove={this.onCardTouchMove}
          onTouchEnd={this.onCardTouchEnd}
          onRestart={this.onLessonRestart}
          onHome={this.onHome}
        />
      );
    }
  }

  onDeckSelect(deck) {
    const { name, cards } = deck;

    this.setState({
      type: 'READING_DRILL',
      deckName: name,
      remainingCards: randomlySort(cards),
      isTopCardRevealed: false,
      normalizedDeltaX: 0,
      cardsToRepractice: [],
    });
  }

  onCardTouchStart({ changedTouches }) {
    if (!this.state.isTopCardRevealed) {
      return;
    }

    const touch = {
      id: changedTouches[0].identifier,
      x: changedTouches[0].clientX,
    };

    this.setState({
      startingTouch: touch,
      normalizedDeltaX: 0,
    });
  }

  onCardTouchMove({ changedTouches }) {
    const { id } = this.state.startingTouch;
    const newTouch = Array.from(changedTouches)
      .find(t => t.identifier === id);
    if (!newTouch) {
      return;
    }
    const deltaX = newTouch.clientX - this.state.startingTouch.x;
    const normalizedDeltaX = Math.max(-1, Math.min(1, deltaX / SWIPE_SIZE));
    this.setState({
      normalizedDeltaX,
    });
  }

  onCardTouchEnd() {
    this.setState({
      startingTouch: null,
      normalizedDeltaX: 0,
    });
    if (this.state.normalizedDeltaX === -1) {
      this.onCardIncorrect();
    } else if (this.state.normalizedDeltaX === 1) {
      this.onCardCorrect();
    }
  }

  onKeyUp({ key }) {
    if (this.state.lessonId !== null && this.state.isTopCardRevealed) {
      if (key === 'ArrowRight' || key === 'Right') {
        this.simulateRightSwipe();
      } else if (key === 'ArrowLeft' || key === 'Left') {
        this.simulateLeftSwipe();
      }
    }
  }

  onCardReveal() {
    this.setState({
      isTopCardRevealed: true,
      normalizedDeltaX: 0,
    });
  }

  onCardCorrect() {
    this.setState(prevState => {
      if (prevState.remainingCards.length > 1) {
        return {
          remainingCards: prevState.remainingCards.slice(1),
          isTopCardRevealed: false,
        };
      }
      return {
        remainingCards: randomlySort(prevState.cardsToRepractice),
        cardsToRepractice: [],
        isTopCardRevealed: false,
      };
    });
  }

  onCardIncorrect() {
    this.setState(prevState => {
      if (prevState.remainingCards.length > 1) {
        return {
          remainingCards: prevState.remainingCards.slice(1),
          cardsToRepractice: prevState.cardsToRepractice.concat([
            prevState.remainingCards[0]
          ]),
          isTopCardRevealed: false,
        };
      }
      return {
        remainingCards: randomlySort(prevState.cardsToRepractice
          .concat([prevState.remainingCards[0]])),
        cardsToRepractice: [],
        isTopCardRevealed: false,
      };
    });
  }

  onLessonRestart() {
    this.onDeckSelect(decks.find(d => d.name === this.state.deckName));
  }

  onHome() {
    this.setState({
      type: 'DECK_MENU',
    });
  }

  simulateRightSwipe() {
    const start = Date.now();
    const render = () => {
      const now = Date.now();
      const completionFactor = (now - start) / SIMULATED_SWIPE_DURATION;
      if (completionFactor < 1 + SIMULATED_SWIPE_PAUSE_FACTOR) {
        requestAnimationFrame(render);
      } else {
        this.onCardCorrect();
      }
      this.setState({
        normalizedDeltaX: completionFactor,
      });
    };
    render();
  }

  simulateLeftSwipe() {
    const start = Date.now();
    const render = () => {
      const now = Date.now();
      const completionFactor = (now - start) / SIMULATED_SWIPE_DURATION;
      if (completionFactor < 1 + SIMULATED_SWIPE_PAUSE_FACTOR) {
        requestAnimationFrame(render);
      } else {
        this.onCardIncorrect();
      }
      this.setState({
        normalizedDeltaX: -completionFactor,
      });
    };
    render();
  }
}

export default CardsAgainstIlliteracy;
