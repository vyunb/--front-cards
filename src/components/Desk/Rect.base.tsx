import { Rect } from "react-konva";
import React from "react";

import { Arrow } from "react-konva";
import { grid } from "./Grid.props";
import { Motion, spring } from "react-motion";

export class RectDrawable {
  x: number;
  y: number;
  isDestroyed: boolean;
  handleCardDragEnd: any;
  handleCardDragStart: any;
  handleCardOver: any;
  handleCardClick: any;
  handleCardLeave: any;
  draggable: boolean;

  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.draggable = props.draggable;
  }

  registerEvents(event) {
    this.handleCardDragEnd = event.dragEnd;
    this.handleCardDragStart = event.handleCardDragStart;
    this.handleCardOver = event.handleCardOver;
    this.handleCardClick = event.handleCardClick;
    this.handleCardLeave = event.handleCardLeave;
  }

  registerMovement(x, y) {
    this.x = x;
    this.y = y;
  }

  destroy() {
    this.isDestroyed = true;
  }

  render() {
    return (
      <Motion
        style={{
          x: spring(this.x),
          y: spring(this.y),
        }}
      >
        {(props) => {
          return (
            <Rect
              onDragEnd={this.handleCardDragEnd}
              onDragStart={this.handleCardDragStart}
              visible={this.isDestroyed}
              x={this.x}
              y={this.y}
              draggable={true}
              onMouseUp={this.handleCardClick}
              onMouseOver={this.handleCardOver}
              onMouseLeave={this.handleCardLeave}
              width={grid - 10}
              height={grid * 2 - 10}
              fill="rgba(0, 0, 0, 1)"
              strokeWidth={10}
            />
          );
        }}
      </Motion>
    );
  }
}
