import socketIOClient from "socket.io-client";
import { origin } from "./api.store";
import { atom } from "jotai";

export const socketAtom = atom(
  socketIOClient(origin, {
    transports: ["websocket"],
  }),
);
