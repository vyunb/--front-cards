import { createMenuConfig } from "__/helpers/create-menu-config";

export const myCardsConfig = createMenuConfig({
  title: "My cards",

  expandable: true,
  resizable: false,

  height: 300 * 1.414,
  width: 300,

  trafficLightsStyle: {
    top: "0.7rem",
    left: "0.7rem",
  },
});
