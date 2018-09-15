import sample from './sample';
import lesson1_1phrases from './lesson1_1phrases';
import lesson1_2phrases from './lesson1_2phrases';

const productionDecks = [
  lesson1_1phrases,
  lesson1_2phrases,
];

const devDecks = [
  sample,
  ...productionDecks
];

const isProduction = !(
  !process.env.NODE_ENV
  || process.env.NODE_ENV === 'development'
);

export default isProduction ? productionDecks : devDecks;
