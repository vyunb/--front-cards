import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { newCardType as atom } from "../../stores/api.store";

export function Adjectives() {
  const [newType, setNewType] = useAtom(atom);
  useEffect(() => {
    setNewType({ type: "adjectives" });
  }, []);

  const handleChange = (e) => {
    setNewType({
      ...newType,
      ...{
        cardActions: {
          ...newType.cardActions,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  return (
    <div>
      <input placeholder="name" onChange={handleChange} name="name" />
      <input placeholder="dmg" onChange={handleChange} name="damage" />
      <input placeholder="give hp" onChange={handleChange} name="gives_hp" />
    </div>
  );
}
