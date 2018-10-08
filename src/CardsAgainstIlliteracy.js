import React from 'react';
import decks from './decks/index';
import randomlySort from './randomlySort';
import SettingsMenu from './containers/SettingsMenu';
import DeckMenu from './containers/DeckMenu';
import DrillMenu from './containers/DrillMenu';
import ReadingDrill from './containers/ReadingDrill';
import WritingDrill from './containers/WritingDrill';
import PostDrillMenu from './containers/PostDrillMenu';

const HORIZONTAL_SWIPE_SIZE = window.innerWidth * 0.30;
const VERTICAL_SWIPE_SIZE = window.innerHeight * 0.20;

const SIMULATED_SWIPE_DURATION = 0.15e3;
const SIMULATED_SWIPE_PAUSE_FACTOR = 0.2;

const PEN_STROKE_WIDTH = 2;

const SUPPORTS_TOUCH = 'ontouchstart' in window;

class CardsAgainstIlliteracy extends React.Component {
  constructor() {
    super();

    this.state = {
      type: 'DECK_MENU',
      selectedSwipeDirection: localStorage.selectedSwipeDirection || 'Right',
    };

    [
      'onSettings',
      'onSelectSwipeDirection',
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
      'onPenMove',
      'onPenEnd',
    ].forEach((methodName) => {
      this[methodName] = this[methodName].bind(this);
    });

    this.canvasRef = React.createRef();
    this.previousPenLocation = null;
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
    if (type === 'SETTINGS_MENU') {
      return (
        <SettingsMenu
          selectedSwipeDirection={this.state.selectedSwipeDirection}
          onHome={this.onHome}
          onSelectSwipeDirection={this.onSelectSwipeDirection}
        />
      );
    } else if (type === 'DECK_MENU') {
      return (
        <DeckMenu
          decks={decks}

          onSettings={this.onSettings}
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
      ['READING_DRILL', 'WRITING_DRILL'].includes(type)
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
        selectedSwipeDirection,
        normalizedDelta,
      } = this.state;

      return (
        <ReadingDrill
          deckName={deckName}
          remainingCards={remainingCards}
          isTopCardRevealed={isTopCardRevealed}
          selectedSwipeDirection={selectedSwipeDirection}
          normalizedDelta={normalizedDelta}

          onHome={this.onHome}
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
        selectedSwipeDirection,
        normalizedDelta,
      } = this.state;

      return (
        <WritingDrill
          deckName={deckName}
          remainingCards={remainingCards}
          isTopCardRevealed={isTopCardRevealed}
          selectedSwipeDirection={selectedSwipeDirection}
          normalizedDelta={normalizedDelta}

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
  }

  onSettings() {
    this.setState({
      type: 'SETTINGS_MENU',
    });
  }

  onSelectSwipeDirection(selectedSwipeDirection) {
    this.setState({
      selectedSwipeDirection,
    });
    localStorage.selectedSwipeDirection = selectedSwipeDirection;
  }

  onDeckSelect(deck) {
    this.setState({
      type: 'DRILL_MENU',
      deck,
    });
  }

  onDrillSelect(drill) {
    if (drill === 'READING_DRILL' || drill === 'WRITING_DRILL') {
      const { name, cards } = this.state.deck;
      this.setState({
        type: drill,
        deckName: name,
        remainingCards: randomlySort(cards),
        isTopCardRevealed: false,
        normalizedDelta: 0,
        cardsToRepractice: [],
      });
    }
  }

  onAffirmationSwipeStart({ changedTouches }) {
    if (!this.state.isTopCardRevealed) {
      return;
    }

    const isSwipeDirectionHorizontal = ['Right', 'Left']
      .includes(this.state.selectedSwipeDirection);

    const touch = isSwipeDirectionHorizontal
      ? {
        id: changedTouches[0].identifier,
        x: changedTouches[0].clientX,
      }
      : {
        id: changedTouches[0].identifier,
        y: changedTouches[0].clientY,
      };

    this.setState({
      startingTouch: touch,
      normalizedDelta: 0,
    });
  }

  onAffirmationSwipeMove({ changedTouches }) {
    const { id } = this.state.startingTouch;
    const newTouch = Array.from(changedTouches)
      .find(t => t.identifier === id);
    if (!newTouch) {
      return;
    }
    const isSwipeDirectionHorizontal = ['Right', 'Left']
      .includes(this.state.selectedSwipeDirection);
    if (isSwipeDirectionHorizontal) {
      const deltaX = newTouch.clientX - this.state.startingTouch.x;
      const normalizedDelta = Math.max(
        -1,
        Math.min(1, deltaX / HORIZONTAL_SWIPE_SIZE),
      );
      this.setState({
        normalizedDelta,
      });
    } else {
      const deltaY = newTouch.clientY - this.state.startingTouch.y;
      const normalizedDelta = Math.max(
        -1,
        Math.min(1, deltaY / VERTICAL_SWIPE_SIZE),
      );
      this.setState({
        normalizedDelta,
      });
    }
  }

  onAffirmationSwipeEnd() {
    const { selectedSwipeDirection, normalizedDelta } = this.state;
    this.setState({
      startingTouch: null,
      normalizedDelta: 0,
    });
    if (
      (selectedSwipeDirection === 'Right' && normalizedDelta === -1)
        || (selectedSwipeDirection === 'Left' && normalizedDelta === 1)
        || (selectedSwipeDirection === 'Up' && normalizedDelta === 1)
        || (selectedSwipeDirection === 'Down' && normalizedDelta === -1)
    ) {
      this.onCardIncorrect();
    } else if (
      (selectedSwipeDirection === 'Right' && normalizedDelta === 1)
        || (selectedSwipeDirection === 'Left' && normalizedDelta === -1)
        || (selectedSwipeDirection === 'Up' && normalizedDelta === -1)
        || (selectedSwipeDirection === 'Down' && normalizedDelta === 1)
    ) {
      this.onCardCorrect();
    }
  }

  onKeyUp({ key }) {

    if (this.state.lessonId !== null && this.state.isTopCardRevealed) {
      const isSwipeDirectionHorizontal = ['Right', 'Left']
        .includes(this.state.selectedSwipeDirection);

      if (isSwipeDirectionHorizontal) {
        if (key === 'ArrowRight' || key === 'Right') {
          this.simulateRightSwipe();
        } else if (key === 'ArrowLeft' || key === 'Left') {
          this.simulateLeftSwipe();
        }
      } else {
        if (key === 'ArrowUp' || key === 'Up') {
          this.simulateUpSwipe();
        } else if (key === 'ArrowDown' || key === 'Down') {
          this.simulateDownSwipe();
        }
      }
    }
  }

  onCardReveal() {
    this.setState({
      isTopCardRevealed: true,
      normalizedDelta: 0,
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
    if (
      this.state.type === 'READING_DRILL'
      || this.state.type === 'WRITING_DRILL'
    ) {
      const deck = decks.find(d => d.name === this.state.deckName);
      const { name, cards } = deck;
      this.setState({
        type: this.state.type,
        deckName: name,
        remainingCards: randomlySort(cards),
        isTopCardRevealed: false,
        normalizedDelta: 0,
        cardsToRepractice: [],
      });
    }
  }

  onHome() {
    this.setState({
      type: 'DECK_MENU',
    });
  }

  onPenStart(event) {
    const [clientX, clientY] = event.type === 'touchstart'
      ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
      : [event.clientX, event.clientY];
    const offsetY = window.innerHeight * 0.11;
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

  onPenMove(event) {
    if (this.previousPenLocation === null) {
      return;
    }

    const [clientX, clientY] = event.type === 'touchmove'
      ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
      : [event.clientX, event.clientY];
    const offsetY = window.innerHeight * 0.11;
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

  onPenEnd() {
    this.previousPenLocation = null;
  }

  simulateRightSwipe() {
    const start = Date.now();
    const render = () => {
      const now = Date.now();
      const completionFactor = (now - start) / SIMULATED_SWIPE_DURATION;
      if (completionFactor < 1 + SIMULATED_SWIPE_PAUSE_FACTOR) {
        requestAnimationFrame(render);
      } else {
        if (this.state.selectedSwipeDirection === 'Right') {
          this.onCardCorrect();
        } else {
          this.onCardIncorrect();
        }
      }
      this.setState({
        normalizedDelta: Math.min(1, completionFactor),
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
        if (this.state.selectedSwipeDirection === 'Left') {
          this.onCardCorrect();
        } else {
          this.onCardIncorrect();
        }
      }
      this.setState({
        normalizedDelta: Math.max(-1, -completionFactor),
      });
    };
    render();
  }

  simulateUpSwipe() {
    const start = Date.now();
    const render = () => {
      const now = Date.now();
      const completionFactor = (now - start) / SIMULATED_SWIPE_DURATION;
      if (completionFactor < 1 + SIMULATED_SWIPE_PAUSE_FACTOR) {
        requestAnimationFrame(render);
      } else {
        if (this.state.selectedSwipeDirection === 'Up') {
          this.onCardCorrect();
        } else {
          this.onCardIncorrect();
        }
      }
      this.setState({
        normalizedDelta: Math.max(-1, -completionFactor),
      });
    };
    render();
  }

  simulateDownSwipe() {
    const start = Date.now();
    const render = () => {
      const now = Date.now();
      const completionFactor = (now - start) / SIMULATED_SWIPE_DURATION;
      if (completionFactor < 1 + SIMULATED_SWIPE_PAUSE_FACTOR) {
        requestAnimationFrame(render);
      } else {
        if (this.state.selectedSwipeDirection === 'Down') {
          this.onCardCorrect();
        } else {
          this.onCardIncorrect();
        }
      }
      this.setState({
        normalizedDelta: Math.min(1, completionFactor),
      });
    };
    render();
  }
}

export default CardsAgainstIlliteracy;
