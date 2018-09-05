import React from 'react';
import './styles/LessonSelector.css';

const LessonSelector = ({
  lessons,

  onSelect,
}) => (
  <div className="LessonSelector">
    <div className="LessonSelector__Header">
      Lessons
    </div>

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
