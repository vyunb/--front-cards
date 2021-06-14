import { atom } from "jotai";
import { menuConfig } from "__/data/menu/menu-config";
const menuStore = {
  play: false,
  myCards: false,
  myCardsTest1: false,
  myCardsTest2: false,
  cardContstructor: false,
};
export const menuStoreItems = Object.keys(menuStore).length + 1;
export type AppID = keyof typeof menuConfig;
export const openMenuStore = atom<Record<AppID, boolean>>(menuStore);

export const activeMenuStore = atom<AppID>("play");
export const activeMenuZIndexStore = atom(-2);
