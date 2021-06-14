import React from "react";
import { Arrow } from "react-konva";
import { animated, Spring } from "@react-spring/konva";
import { Motion, spring } from "react-motion";

class Drawable {
  startx: number;
  starty: number;
  constructor(startx, starty) {
    this.startx = startx;
    this.starty = starty;
  }
}

export class ArrowDrawable extends Drawable {
  x: number;
  y: number;
  ref: any;
  arrowCurve: {
    x: number;
    y: number;
  };
  constructor(startx, starty) {
    super(startx, starty);
    this.x = startx;
    this.y = starty;
    this.arrowCurve = this.calcCurve();
  }
  calcCurve() {
    return {
      x: (this.startx + this.x) / 2 + 50 + Math.cos(Math.PI),
      y: (this.starty + this.y) / 2 + 50 + Math.sin(Math.PI),
    };
  }

  registerMovement(x, y) {
    this.x = x;
    this.y = y;
    this.arrowCurve = this.calcCurve();
  }
  render() {
    return (
      <Motion
        style={{
          startX: this.startx,
          startY: this.starty,
          endX: spring(this.x),
          endY: spring(this.y),
        }}
      >
        {(props) => {
          const points = [props.startX, props.startY, this.arrowCurve.x, this.arrowCurve.y, props.endX, props.endY];
          return <Arrow tension={0.7} points={points} fill="red" stroke="red" />;
        }}
      </Motion>
    );
  }
}
