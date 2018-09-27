import sample from './sample';
import lesson1_1phrases from './lesson1_1phrases';
import lesson1_2phrases from './lesson1_2phrases';
import lesson1_2essentials from './lesson1_2essentials';
import lesson1_3essentials from './lesson1_3essentials';

const productionDecks = [
  lesson1_1phrases,
  lesson1_2phrases,
  lesson1_2essentials,
  lesson1_3essentials,
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
