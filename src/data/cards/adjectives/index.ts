import { createAdjectiveProps, AdjectiveProps } from "../../../helpers/create-adjective-props";

export const adjectives = Array<AdjectiveProps>();

adjectives.push(
  createAdjectiveProps({
    title: "Жирный",
    can_hurt: false,
    add_armor: 10,
    add_health: 10,
  }),
);
