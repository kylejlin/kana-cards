import React from 'react';
import lessons from './lessons/index';
import LessonSelector from './LessonSelector';
import Reviewer from './Reviewer';

const SWIPE_SIZE = window.innerHeight * 0.40;

class Flash407 extends React.Component {
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
      'onCardCorrect',
      'onCardIncorrect',
      'onLessonRestart',
      'onHome',
    ].forEach((methodName) => {
      this[methodName] = this[methodName].bind(this);
    });
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
          normalizedDeltaY={this.state.normalizedDeltaY}

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
      remaining: lessons[lessonId],
      isRevealed: false,
      normalizedDeltaY: 0,
      repractice: [],
    });
  }

  onCardTouchStart({ changedTouches }) {
    if (!this.state.isRevealed) {
      return;
    }

    const touch = {
      id: changedTouches[0].identifier,
      y: changedTouches[0].clientY,
    };

    this.setState({
      startingTouch: touch,
      normalizedDeltaY: 0,
    });
  }

  onCardTouchMove({ changedTouches }) {
    const { id } = this.state.startingTouch;
    const newTouch = Array.from(changedTouches)
      .find(t => t.identifier === id);
    if (!newTouch) {
      return;
    }
    const deltaY = newTouch.clientY - this.state.startingTouch.y;
    const normalizedDeltaY = Math.max(-1, Math.min(1, deltaY / SWIPE_SIZE));
    this.setState({
      normalizedDeltaY,
    });
  }

  onCardTouchEnd() {
    this.setState({
      startingTouch: null,
      normalizedDeltaY: 0,
    });
    if (this.state.normalizedDeltaY === 1) {
      this.onCardIncorrect();
    } else if (this.state.normalizedDeltaY === -1) {
      this.onCardCorrect();
    }
  }

  onCardReveal() {
    this.setState({
      isRevealed: true,
      normalizedDeltaY: 0,
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
        remaining: prevState.repractice,
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
        remaining: prevState.repractice.concat([prevState.remaining[0]]),
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
}

export default Flash407;
