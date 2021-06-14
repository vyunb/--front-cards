import { atom, WritableAtom, Atom } from "jotai";
import { menuStoreItems } from "./menu.store";
// meniItems: new Array(menuStoreItems),
// (get, set, _arg)  => {}

const loadingQueue: WritableAtom<any, any> = atom(["Rendering Menu", "Loading Images"]);

export const loadingStatus: Atom<any> = atom((get) => get(loadingQueue)[0]);

const images: WritableAtom<any, any> = atom(0);
export const imagesAtom = atom(
  (get) => get(images) === menuStoreItems - 1,
  (get, set, _arg) => {
    const [, ...queue] = get(loadingQueue);
    const next = get(images) + 1;
    set(loadingQueue, queue);
    set(images, next);
  },
);

const menu: WritableAtom<any, any> = atom(true);
export const menuRenderingAtom = atom(
  (get) => get(menu),
  (get, set, _arg) => {
    const [, ...queue] = get(loadingQueue);
    set(loadingQueue, queue);
    set(images, false);
  },
);
