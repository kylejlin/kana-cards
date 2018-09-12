import React from 'react';
import './styles/DeckMenu.css';
import Header from './Header';

export default ({
  decks,

  onSelect,
}) => (
  <div className="DeckMenu">
    <Header background="white">Lessons</Header>

    <div className="DeckMenu__LessonList">
      {decks.map(deck => (
        <div
          className="DeckMenu__Lesson"
          key={deck.name}
          onClick={() => onSelect(deck)}
        >
          {deck.name}
        </div>
      ))}
    </div>
  </div>
);
