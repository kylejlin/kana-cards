import React from 'react';
import Header from '../components/Header';
import HomeButton from '../components/HomeButton';
import Section from '../components/Section';
import Checkbox from '../components/Checkbox';

const DIRECTIONS = ['Right', 'Left', 'Up', 'Down'];

export default ({
  selectedSwipeDirection,

  onHome,
  onSelectSwipeDirection,
}) => [
  <Header background="blue" key="Header">Settings</Header>,
  <HomeButton color="blue" onClick={onHome} key="HomeButton" />,
  <Section header="Correct Answer Swipe Direction" key="SwipeDirectionSection">
    {
      DIRECTIONS.map((direction) => (
        <Checkbox
          checked={direction === selectedSwipeDirection}
          onClick={() => onSelectSwipeDirection(direction)}
          key={direction}
        >
          {direction}
        </Checkbox>
      ))
    }
  </Section>,
];
