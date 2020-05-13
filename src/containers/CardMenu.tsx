import { Set as ImmutableSet } from "immutable";
import React from "react";
import Body from "../components/Body";
import Checkbox from "../components/Checkbox";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import Section from "../components/Section";
import getDeckName from "../getDeckName";
import { Deck, MoraCategory } from "../types";
import Button from "../components/Button";

export interface Props {
  deck: Deck;
  includedCategories: ImmutableSet<MoraCategory>;
  onToggleCategory(category: MoraCategory): void;
  onHome(): void;
  onDrillStart(): void;
}

const CATEGORIES: [MoraCategory, string][] = [
  [MoraCategory.v, "Vowels"],
  [MoraCategory.Kv, "k-"],
  [MoraCategory.Sv, "s-"],
  [MoraCategory.Tv, "t-"],
  [MoraCategory.Nv, "n-"],
  [MoraCategory.Hv, "h-"],
  [MoraCategory.Mv, "m-"],
  [MoraCategory.Yv, "y-"],
  [MoraCategory.Rv, "r-"],
  [MoraCategory.Wv, "w-"],
  [MoraCategory.N, "n"],
];

export default function CardMenu({
  deck,
  includedCategories,
  onToggleCategory,
  onHome,
  onDrillStart,
}: Props): React.ReactElement {
  return (
    <>
      <Header background="blue">{getDeckName(deck)}</Header>
      <HomeButton color="blue" onClick={onHome} />
      <Body>
        <Section header="Categories">
          {CATEGORIES.map(([category, categoryName]) => (
            <Checkbox
              checked={includedCategories.has(category)}
              onClick={() => onToggleCategory(category)}
              key={category}
            >
              {categoryName}
            </Checkbox>
          ))}
        </Section>
        <Button modifierName="blue shadow" onClick={onDrillStart}>
          Start
        </Button>
      </Body>
    </>
  );
}
