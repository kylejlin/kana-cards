import sample from "./sample";
import lesson1_1phrases from "./lesson1_1phrases";
import lesson1_2phrases from "./lesson1_2phrases";
import lesson1_2essentials from "./lesson1_2essentials";
import lesson1_3phrases from "./lesson1_3phrases";
import lesson1_3essentials from "./lesson1_3essentials";
import lesson1_4phrases from "./lesson1_4phrases";
import lesson1_4essentials from "./lesson1_4essentials";
import lesson1_5phrases from "./lesson1_5phrases";
import lesson1_5essentials from "./lesson1_5essentials";
import lesson1_6phrases from "./lesson1_6phrases";
import lesson1_6essentials from "./lesson1_6essentials";
import lesson2_1phrases from "./lesson2_1phrases";
import lesson2_1essentials from "./lesson2_1essentials";

const productionDecks = [
  lesson1_1phrases,
  lesson1_2phrases,
  lesson1_2essentials,
  lesson1_3phrases,
  lesson1_3essentials,
  lesson1_4phrases,
  lesson1_4essentials,
  lesson1_5phrases,
  lesson1_5essentials,
  lesson1_6phrases,
  lesson1_6essentials,
  lesson2_1phrases,
  lesson2_1essentials,
];

const devDecks = [sample, ...productionDecks];

const isProduction = !(
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
);

export default (isProduction ? productionDecks : devDecks);
