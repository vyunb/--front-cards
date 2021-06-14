import { atom, WritableAtom } from "jotai";
import axios from "axios";
import { CardType } from "../types.d";

type metaEnv = string | boolean;

const URL: metaEnv = import.meta.env.VITE_API_URL;
const API_PREFIX: metaEnv = import.meta.env.VITE_API_PREFIX;
const API_PORT: metaEnv = import.meta.env.VITE_API_PORT;

export const origin: string = `http://${URL}:${API_PORT}`;
export const requestUrl: string = `http://${URL}:${API_PORT}/${API_PREFIX}`;

export const cacheInfo: WritableAtom<any, any> = atom({ data: {}, loading: false });
export const cacheInfoRequest = atom(
  (get) => get(cacheInfo),
  (_, set: Function): void => {
    set(cacheInfo, { data: {}, loading: true });
    const fetchData = async (): Promise<void> => {
      const response = await axios.get(`${requestUrl}/cache`);
      set(cacheInfo, { data: await response.data, loading: false });
    };
    fetchData();
  },
);

export const cards: WritableAtom<any, any> = atom({
  data: { nouns: [], adjectives: [], roles: [], created: [] },
  loading: {
    nouns: true,
    adjectives: true,
    roles: true,
    created: true,
  },
});
export const getCardsRequest = atom(
  (get) => get(cards),
  (get, set: Function, cardType: CardType): void => {
    set(cards, { ...get(cards), ...{ loading: { [cardType]: true } } });
    const fetchData = async (): Promise<void> => {
      const response = await axios.get(`${requestUrl}/get-cards`, { params: { type: cardType } });
      const prev = get(cards);
      set(cards, {
        ...prev,
        ...{
          data: { ...prev.data, ...{ [cardType]: await response.data } },
          loading: { ...prev.loading, ...{ [cardType]: false } },
        },
      });
    };
    fetchData();
  },
);

export const newCardResponse: WritableAtom<any, any> = atom({
  loading: false,
  message: null,
});
export const newCard: WritableAtom<any, any> = atom({
  noun: { name: "", id: "" },
  adjective: { name: "", id: "" },
  role: { name: "", id: "" },
});
export const createNewCard = atom(
  (get) => get(newCard),
  (get, set) => {
    set(newCardResponse, { ...get(newCardResponse), ...{ loading: true } });
    const fetchData = async () => {
      const response = await axios.post(`${requestUrl}/create-card`, { ...get(newCard) });
      set(newCardResponse, { loading: false, message: await response.data });
    };
    fetchData();
  },
);

export const getCreatedCards = atom(
  (get) => get(cards),
  (get, set: Function): void => {
    set(cards, { ...get(cards), ...{ loading: { created: true } } });
    const fetchData = async (): Promise<void> => {
      const response = await axios.get(`${requestUrl}/get-created-cards`);
      const prev = get(cards);
      set(cards, {
        ...prev,
        ...{
          data: { ...prev.data, ...{ created: await response.data } },
          loading: { ...prev.loading, ...{ created: false } },
        },
      });
    };
    fetchData();
  },
);

export const newCardTypeResponse: WritableAtom<any, any> = atom({
  response: null,
  loading: false,
});
export const newCardType: WritableAtom<any, any> = atom({
  type: null,
  cardActions: {},
});
export const createNewCardType = atom(
  (get) => get(newCardTypeResponse),
  (get, set) => {
    set(newCardTypeResponse, {
      ...get(newCardTypeResponse),
      ...{
        loading: true,
      },
    });
    const fetchData = async () => {
      const newType = get(newCardType);
      const response = await axios.post(`${requestUrl}/create-type/${newType.type}`, { ...newType.cardActions });
      set(newCardTypeResponse, {
        ...get(newCardTypeResponse),
        ...{
          loading: false,
          response: response,
        },
      });
    };
    fetchData();
  },
);
