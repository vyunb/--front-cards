export type AdjectiveProps = {
  title: string;
  can_hurt?: boolean;
  add_armor: number;
  add_health: number;
};

export const createAdjectiveProps = (props: AdjectiveProps) => ({ ...props });
