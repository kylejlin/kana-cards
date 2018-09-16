import React from 'react';
import decks from './decks/index';
import randomlySort from './randomlySort';
import DeckMenu from './DeckMenu';
import DrillMenu from './DrillMenu';
import ReadingDrill from './ReadingDrill';
import WritingDrill from './WritingDrill';
import PostDrillMenu from './PostDrillMenu';

const SWIPE_SIZE = window.innerWidth * 0.40;

const SIMULATED_SWIPE_DURATION = 0.15e3;
const SIMULATED_SWIPE_PAUSE_FACTOR = 0.2;

const PEN_STROKE_WIDTH = 2;

const SUPPORTS_TOUCH = 'ontouchstart' in window;

class CardsAgainstIlliteracy extends React.Component {
  constructor() {
    super();

    this.state = {
      type: 'DECK_MENU',
    };

    [
      'onDeckSelect',
      'onDrillSelect',
      'onCardReveal',
      'onAffirmationSwipeStart',
      'onAffirmationSwipeMove',
      'onAffirmationSwipeEnd',
      'onKeyUp',
      'onCardCorrect',
      'onCardIncorrect',
      'onDrillRestart',
      'onHome',
      'onPenStart',
      'onPenMove'
    ].forEach((methodName) => {
      this[methodName] = this[methodName].bind(this);
    });

    this.canvasRef = React.createRef();
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
    } else if (type === 'DRILL_MENU') {
      const { name } = this.state.deck;
      return (
        <DrillMenu
          deckName={name}

          onDrillSelect={this.onDrillSelect}
          onHome={this.onHome}
        />
      );
    } else if (
      ['READING_DRILL'].includes(type)
      && this.state.remainingCards.length === 0
    ) {
      return (
        <PostDrillMenu
          deckName={this.state.deckName}
          onRestart={this.onDrillRestart}
          onHome={this.onHome}
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
          onAffirmationSwipeStart={this.onAffirmationSwipeStart}
          onAffirmationSwipeMove={this.onAffirmationSwipeMove}
          onAffirmationSwipeEnd={this.onAffirmationSwipeEnd}
        />
      );
    } else if (type === 'WRITING_DRILL') {
      const {
        deckName,
        remainingCards,
        isTopCardRevealed,
        normalizedDeltaX,
      } = this.state;

      return (
        <WritingDrill
          deckName={deckName}
          remainingCards={remainingCards}
          isTopCardRevealed={isTopCardRevealed}
          normalizedDeltaX={normalizedDeltaX}

          onPenStart={this.onPenStart}
          onPenMove={this.onPenMove}
          onReveal={this.onCardReveal}
          onAffirmationSwipeStart={this.onAffirmationSwipeStart}
          onAffirmationSwipeMove={this.onAffirmationSwipeMove}
          onAffirmationSwipeEnd={this.onAffirmationSwipeEnd}

          canvasRef={this.canvasRef}
        />
      );
    }
  }

  onDeckSelect(deck) {
    this.setState({
      type: 'DRILL_MENU',
      deck,
    });
  }

  onDrillSelect(drill) {
    if (drill === 'READING_DRILL') {
      const { name, cards } = this.state.deck;
      this.setState({
        type: 'READING_DRILL',
        deckName: name,
        remainingCards: randomlySort(cards),
        isTopCardRevealed: false,
        normalizedDeltaX: 0,
        cardsToRepractice: [],
      });
    } else if (drill === 'WRITING_DRILL') {
      const { name, cards } = this.state.deck;
      this.setState({
        type: 'WRITING_DRILL',
        deckName: name,
        remainingCards: randomlySort(cards),
        isTopCardRevealed: false,
        normalizedDeltaX: 0,
        cardsToRepractice: [],
      });
    }
  }

  onAffirmationSwipeStart({ changedTouches }) {
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

  onAffirmationSwipeMove({ changedTouches }) {
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

  onAffirmationSwipeEnd() {
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
    if (this.state.type === 'WRITING_DRILL') {
      const { width, height } = this.canvasRef.current;
      const ctx = this.canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, width, height);
    }

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
    if (this.state.type === 'WRITING_DRILL') {
      const { width, height } = this.canvasRef.current;
      const ctx = this.canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, width, height);
    }
    
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

  onDrillRestart() {
    if (this.state.type === 'READING_DRILL') {
      const deck = decks.find(d => d.name === this.state.deckName);
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
  }

  onHome() {
    this.setState({
      type: 'DECK_MENU',
    });
  }

  onPenStart({ changedTouches }) {
    const { clientX, clientY } = changedTouches[0];
    const offsetY = window.innerHeight * 0.20;
    const adjustedY = clientY - offsetY;
    this.previousPenLocation = {
      x: clientX,
      y: adjustedY,
    };
    const ctx = this.canvasRef.current.getContext('2d');
    ctx.fillStyle = '#000088';
    ctx.fillRect(
      clientX,
      clientY - offsetY,
      PEN_STROKE_WIDTH,
      PEN_STROKE_WIDTH,
    );
  }

  onPenMove({ changedTouches }) {
    const { clientX, clientY } = changedTouches[0];
    const offsetY = window.innerHeight * 0.20;
    const adjustedY = clientY - offsetY;
    const ctx = this.canvasRef.current.getContext('2d');
    ctx.fillRect(clientX, clientY - offsetY, 1, 1);
    ctx.beginPath();
    ctx.moveTo(this.previousPenLocation.x, this.previousPenLocation.y);
    ctx.lineTo(clientX, adjustedY);
    ctx.closePath();
    ctx.lineWidth = PEN_STROKE_WIDTH;
    ctx.strokeStyle = '#000088';
    ctx.stroke();
    this.previousPenLocation = {
      x: clientX,
      y: adjustedY,
    };
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
