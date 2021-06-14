import React, { useEffect, useState } from "react";
import { CardType } from "../../types.d";
import { Adjectives } from "./Adjectives.constructor";
import { useAtom } from "jotai";
import { createNewCardType as atom } from "../../stores/api.store";

export function Constructor() {
  const [response, request] = useAtom(atom);
  const types = [
    {
      name: "adjectives" as CardType,
      component: <Adjectives />,
    },
    {
      name: "nouns" as CardType,
      component: "",
    },
    {
      name: "roles" as CardType,
      component: <div>Hello world</div>,
    },
  ];

  useEffect(() => {
    console.log(response);
  }, [response.loading]);
  const [state, setState] = useState(null);

  return (
    <div>
      {types.map(({ name, component }) => (
        <button onClick={() => setState(component)}>{name}</button>
      ))}
      {state}

      {state && <button onClick={request}>Create</button>}
    </div>
  );
}
