import React from 'react';
import './styles/LessonSelector.css';
import Header from './Header';

const LessonSelector = ({
  lessons,

  onSelect,
}) => (
  <div className="LessonSelector">
    <Header background="white">Lessons</Header>

    <div className="LessonSelector__LessonList">
      {Object.keys(lessons).map(lessonId => (
        <div
          className="LessonSelector__Lesson"
          key={lessonId}
          onClick={() => onSelect(lessonId)}
        >
          {lessonId}
        </div>
      ))}
    </div>
  </div>
);

export default LessonSelector;
