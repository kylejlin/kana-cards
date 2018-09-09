import React from 'react';
import lessons from './lessons/index';
import randomlySort from './randomlySort';
import LessonSelector from './LessonSelector';
import Reviewer from './Reviewer';

const SWIPE_SIZE = window.innerWidth * 0.40;

const SIMULATED_SWIPE_DURATION = 0.15e3;
const SIMULATED_SWIPE_PAUSE_FACTOR = 0.2;

const SUPPORTS_TOUCH = 'ontouchstart' in window;

class CardsAgainstIlliteracy extends React.Component {
  constructor() {
    super();

    this.state = {
      lessonId: null,
    };

    [
      'onLessonSelect',
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
    const { lessonId } = this.state;
    if (lessonId === null) {
      return (
        <LessonSelector
          lessons={lessons}

          onSelect={this.onLessonSelect}
        />
      );
    } else {
      const { remaining, isRevealed } = this.state;
      return (
        <Reviewer
          lessonId={lessonId}
          remaining={remaining}
          isRevealed={isRevealed}
          normalizedDeltaX={this.state.normalizedDeltaX}

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

  onLessonSelect(lessonId) {
    this.setState({
      lessonId,
      remaining: randomlySort(lessons[lessonId]),
      isRevealed: false,
      normalizedDeltaX: 0,
      repractice: [],
    });
  }

  onCardTouchStart({ changedTouches }) {
    if (!this.state.isRevealed) {
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
    if (this.state.lessonId !== null && this.state.isRevealed) {
      if (key === 'ArrowRight' || key === 'Right') {
        this.simulateRightSwipe();
      } else if (key === 'ArrowLeft' || key === 'Left') {
        this.simulateLeftSwipe();
      }
    }
  }

  onCardReveal() {
    this.setState({
      isRevealed: true,
      normalizedDeltaX: 0,
    });
  }

  onCardCorrect() {
    this.setState(prevState => {
      if (prevState.remaining.length > 1) {
        return {
          remaining: prevState.remaining.slice(1),
          isRevealed: false,
        };
      }
      return {
        remaining: randomlySort(prevState.repractice),
        repractice: [],
        isRevealed: false,
      };
    });
  }

  onCardIncorrect() {
    this.setState(prevState => {
      if (prevState.remaining.length > 1) {
        return {
          remaining: prevState.remaining.slice(1),
          repractice: prevState.repractice.concat([prevState.remaining[0]]),
          isRevealed: false,
        };
      }
      return {
        remaining: randomlySort(prevState.repractice
          .concat([prevState.remaining[0]])),
        repractice: [],
        isRevealed: false,
      };
    });
  }

  onLessonRestart() {
    this.onLessonSelect(this.state.lessonId);
  }

  onHome() {
    this.setState({
      lessonId: null,
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
