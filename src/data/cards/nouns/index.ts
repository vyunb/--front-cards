import { createNounProps, NounProps } from "../../../helpers/create-noun-props";

export const nouns = Array<NounProps>();

nouns.push(
  createNounProps({
    title: "Узбек",
    can_hurt: false,
    armor: 0,
    health: 2,
    description: "хуярит неплохо",
  }),
);

nouns.push(
  createNounProps({
    title: "не Узбек",
    can_hurt: false,
    armor: 0,
    health: 2,
    description: "хуярит неплохо",
  }),
);
