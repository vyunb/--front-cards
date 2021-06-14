export type RoleProps = {
  title: string;
  can_hurt?: boolean;
  has_interaction_with: string;
  interaction: {
    add_health: number;
    charges: number;
  };
};

export const createRoleProps = (props: RoleProps) => ({ ...props });
