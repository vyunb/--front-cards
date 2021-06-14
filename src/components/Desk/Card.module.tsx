import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Rect } from "react-konva";
import { grid } from "./Grid.props";
import { RectDrawable } from "./Rect.base";
import { Trail } from "@react-spring/konva";

export function Cards(props) {
  const { handleCardClick, handleCardDragEnd, handleCardDragStart, handleCardOver, handleCardLeave, serverState } = props;
  const [enemyCards, setEnemyCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [cardsLoaded, setCardLoaded] = useState(false);

  useLayoutEffect(() => {
    const enemy = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
      (_, i) =>
        new RectDrawable({
          x: i * grid + 5,
          y: 5,
          draggable: false,
        }),
    );
    const user = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
      (_, i) =>
        new RectDrawable({
          x: i * grid + 5,
          y: 800 - grid * 2 + 5,
          draggable: true,
        }),
    );
    setEnemyCards(enemy);
    setUserCards(user);
    setCardLoaded(true);
  }, []);
  useEffect(() => {
    if (cardsLoaded) {
      const enemy = enemyCards.map((card) => {
        const dragEnd = handleCardDragEnd(card);

        card.registerEvents({
          dragEnd,
          handleCardDragStart,
          handleCardClick,
          handleCardOver,
          handleCardLeave,
        });
        return card;
      });

      const user = userCards.map((card) => {
        const dragEnd = handleCardDragEnd(card);
        card.registerEvents({
          dragEnd,
          handleCardDragStart,
          handleCardClick,
          handleCardOver,
          handleCardLeave,
        });
        return card;
      });

      setEnemyCards(enemy);
      setUserCards(user);
    }
  }, [props]);
  useEffect(() => {
    cardsLoaded &&
      setEnemyCards((prev) => {
        const newCards = prev.map((card, i) => {
          if (serverState.index - 9 === i) serverState.destroy ? card.destroy() : card.registerMovement(serverState.x, serverState.y);
          return card;
        });
        return newCards;
      });
  }, [serverState]);
  return (
    <>
      {enemyCards.map((card) => card.render())}
      {userCards.map((card) => card.render())}
    </>
  );
}
