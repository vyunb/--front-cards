export type NounProps = {
  title: string;
  can_hurt?: boolean;
  armor: number;
  health: number;
  description: string;
};

export const createNounProps = (props: NounProps) => ({ ...props });
