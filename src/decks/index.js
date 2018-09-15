import sample from './sample';
import lesson1_1phrases from './lesson1_1phrases';

const productionDecks = [
  lesson1_1phrases,
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
