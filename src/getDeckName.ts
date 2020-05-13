import { Deck } from "./types";

export default function getDeckName(deck: Deck): string {
  return Deck[deck];
}
