import React from 'react';
import Header from './Header';
import HomeButton from './HomeButton';
import Radio from './Radio';

const DIRECTIONS = ['Right', 'Left', 'Up', 'Down'];

export default ({
  selectedSwipeDirection,

  onHome,
  onSelectSwipeDirection,
}) => [
  <Header background="blue">Swipe Direction</Header>,
  <HomeButton color="blue" onClick={onHome} />,
  DIRECTIONS.map((direction) => (
    <Radio
      checked={direction === selectedSwipeDirection}
      onClick={() => onSelectSwipeDirection(direction)}
    >
      {direction}
    </Radio>
  )),
];
