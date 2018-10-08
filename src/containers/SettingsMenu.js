import React from 'react';
import Header from '../components/Header';
import HomeButton from '../components/HomeButton';
import Section from '../components/Section';
import Radio from '../components/Radio';

const DIRECTIONS = ['Right', 'Left', 'Up', 'Down'];

export default ({
  selectedSwipeDirection,

  onHome,
  onSelectSwipeDirection,
}) => [
  <Header background="blue">Settings</Header>,
  <HomeButton color="blue" onClick={onHome} />,
  <Section header="Correct Answer Swipe Direction">
    {
      DIRECTIONS.map((direction) => (
        <Radio
          checked={direction === selectedSwipeDirection}
          onClick={() => onSelectSwipeDirection(direction)}
        >
          {direction}
        </Radio>
      ))
    }
  </Section>,
];
