import { createRoleProps, RoleProps } from "../../../helpers/create-role-props";

export const roles = Array<RoleProps>();

roles.push(
  createRoleProps({
    title: "Человек",
    can_hurt: false,
    has_interaction_with: "Человек",
    interaction: {
      add_health: 23,
      charges: 10,
    },
  }),
);
