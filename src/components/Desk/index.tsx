import React, { Fragment, Suspense, useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Line, Arrow } from "react-konva";
import { ArrowDrawable } from "./Arrow.module";
import { linesA, linesB, grid, gridWidth } from "./Grid.props";
import { Portal } from "react-konva-utils";
import { socketAtom } from "../../stores//socket.store";
import { useAtom } from "jotai";
import { Cards } from "./Card.module";

export function Desk() {
  const [socket] = useAtom(socketAtom);
  const [isSearching, setSearching] = useState(false);
  const [hasFound, setFound] = useState(false);
  const [serverState, setServerState] = useState({
    x: 5,
    y: 5,
    index: 0,
    destroy: false,
  });
  const [state, setState] = useState({
    arrow: null,
    newDrawableType: "FreePathDrawable",
    parent: null,
    isMoving: false,
    transform: false,
    isOverCard: false,
    dragging: false,
    curXY: {
      x: null,
      y: null,
    },
  });

  function defineY(calc) {
    const gr = grid * 2;
    calc = 400;
    if (calc < 0) return state.curXY.y;
    if (calc > 800) return state.curXY.y;
    return Math.round(calc / gr) * gr + 5;
  }
  function defineX(calc) {
    if (calc < 0) return state.curXY.x;
    if (calc > 900) return state.curXY.x;
    return Math.round(calc / grid) * grid + 5;
  }
  function haveIntersection(r1, r2) {
    return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
  }
  useEffect(() => {
    socket.on("found_game", (data) => {
      alert(data.message);
      setFound(true);
      setSearching(false);
    });
  }, []);
  useEffect(() => {
    socket.on("new_card_position", (pos) => setServerState(pos));
  }, []);

  const handleMouseDown = (x, y) => {
    setState({
      ...state,
      ...{ arrow: new ArrowDrawable(x, y) },
    });
  };

  const handleMouseUp = (e) => {
    const { arrow } = state;
    if (arrow) {
      setState({
        ...state,
        ...{ arrow: null, transform: true },
      });
    }
  };

  const handleMouseMove = (e) => {
    const { arrow } = state;
    const { x, y } = e.target.getStage().getPointerPosition();

    if (arrow && !state.isOverCard) {
      const updatedNewDrawable = arrow;
      updatedNewDrawable.registerMovement(x, y);
      setState({
        ...state,
        ...{ arrow: updatedNewDrawable },
      });
    }
  };

  const handleCardClick = (e) => {
    const index = e.target.index - 1;
    handleMouseUp(e);
    if (state.parent !== e.target) {
      socket.emit("new_card_position", { destroy: true, index });
      e.target.destroy();
    }
  };

  const handleCardDragEnd = (element) => (e) => {
    const index = e.target.index - 1;
    const x = defineX(e.target.x());
    const y = defineY(e.target.y());
    e.target.to({
      x: x,
      y: y,
    });
    setState({
      ...state,
      ...{
        isMoving: true,
        dragging: false,
        parent: e.target,
      },
    });
    handleMouseDown(x + grid / 2, y + grid);
    socket.emit("move_card", { x, y, index });
  };

  const handleCardDragStart = (e) => {
    const x = e.target.x();
    const y = e.target.y();
    e.target.to({
      stroke: "orange",
      strokeWidth: 10,
    });
    setState({
      ...state,
      dragging: true,
      parent: e.target,
      curXY: {
        x: x,
        y: y,
      },
    });
  };

  const moveArrow = (x, y) => {
    const { arrow } = state;
    if (arrow) {
      const updatedNewDrawable = arrow;
      updatedNewDrawable.registerMovement(x, y);

      setState({
        ...state,
        ...{ isOverCard: true, arrow: updatedNewDrawable },
      });
    }
  };

  const handleCardOver = (e) => {
    moveArrow(e.target.x() + grid / 2, e.target.y() + grid);
    if (state.isOverCard) {
      if (e.target === state.parent) {
        e.target.to({
          stroke: "orange",
          strokeWidth: 10,
        });
      } else {
        e.target.to({
          stroke: "red",
          strokeWidth: 10,
        });
      }
    }
  };

  const handleCardLeave = (e) => {
    e.target.to({
      stroke: null,
      strokeWidth: 0,
    });
    setState({ ...state, ...{ isOverCard: false } });
  };

  const handleDragMove = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    const index = e.target.index - 1;

    // socket.emit("move_card", { x, y, index });
  };
  return (
    <Fragment>
      <button
        onClick={(e) => {
          socket.emit("player_find_game", socket.id);
          setSearching(true);
        }}
        disabled={isSearching}
      >
        player_find_game
      </button>

      {isSearching && "Searching for a opponent"}
      {hasFound && "Found a opponent"}

      <Stage
        onMouseMove={handleMouseMove}
        onMouseUp={() => setState({ ...state, ...{ transform: false } })}
        onMouseDown={handleMouseUp}
        onDragMove={handleDragMove}
        width={900}
        height={800}
      >
        <Layer>
          {linesA}
          {linesB}
        </Layer>
        <Layer>
          <Portal selector=".top-layer" enabled={state.isOverCard}>
            <Fragment>{state.arrow && state.arrow.render()}</Fragment>
          </Portal>
          <Cards
            handleCardClick={handleCardClick}
            handleCardDragEnd={handleCardDragEnd}
            handleCardDragStart={handleCardDragStart}
            handleCardOver={handleCardOver}
            handleCardLeave={handleCardLeave}
            serverState={serverState}
          />
        </Layer>
        <Layer name="top-layer" />
      </Stage>
    </Fragment>
  );
}
