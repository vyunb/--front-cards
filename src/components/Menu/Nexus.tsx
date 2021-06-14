import { AppID } from "__/stores/menu.store";
import { getCardsRequest, newCard, newCardResponse, createNewCard, getCreatedCards } from "__/stores/api.store";
import { useAtom } from "jotai";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import React, { useEffect } from "react";
import { Desk } from "../Desk";
import { Constructor } from "../CardsConstructor/Constructor";

import "react-tabs/style/react-tabs.css";

type NexusProps = {
  appID: AppID;
};

export const Nexus = ({ appID }: NexusProps) => {
  const [{ loading, data }, request] = useAtom(getCardsRequest);
  const [card, setNewCard] = useAtom(newCard);
  const [createdCards, getCreated] = useAtom(getCreatedCards);
  const [, create] = useAtom(createNewCard);

  useEffect(() => {
    request("nouns");
  }, []);

  if (appID === "cardContstructor") return <Constructor />;
  if (appID === "play") return <Desk />;
  if (appID === "myCards")
    return (
      <>
        <div>{`${card.noun.name} ${card.adjective.name} ${card.role.name}`}</div>
        <button onClick={() => create()}>create</button>
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab onClick={() => request("nouns")}>Nouns</Tab>
            <Tab onClick={() => request("adjectives")}>Adjectives</Tab>
            <Tab onClick={() => request("roles")}>Roles</Tab>
            <Tab onClick={() => getCreated()}>Created cards</Tab>
          </TabList>

          <TabPanel>
            {!loading.nouns &&
              data.nouns.map((n, k) => (
                <p onClick={() => setNewCard({ ...card, ...{ noun: { name: n.name, id: n._id } } })} key={k}>
                  {n.name}
                </p>
              ))}
          </TabPanel>
          <TabPanel>
            {!loading.adjectives &&
              data.adjectives.map((n, k) => (
                <p onClick={() => setNewCard({ ...card, ...{ adjective: { name: n.name, id: n._id } } })} key={k}>
                  {n.name}
                </p>
              ))}
          </TabPanel>
          <TabPanel>
            {!loading.roles &&
              data.roles.map((n, k) => (
                <p onClick={() => setNewCard({ ...card, ...{ role: { name: n.name, id: n._id } } })} key={k}>
                  {n.name}
                </p>
              ))}
          </TabPanel>
          <TabPanel>{!loading.created && data.created.map((n, k) => <p key={k}>{n.c_name}</p>)}</TabPanel>
        </Tabs>
      </>
    );
};
