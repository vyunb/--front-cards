import { Line } from "react-konva";
import React from "react";

const grid = 100;
const gridWidth = 1191;
const gaps = grid + 5;

const linesA = [];
const linesB = [];

for (let i = 0; i < 10; i++) {
  linesA.push(<Line strokeWidth={2} key={i} stroke={"black"} points={[i * grid, 0, i * grid, gridWidth / 1.5]} />);
}
for (let i = 0; i < 5; i++) {
  linesB.push(<Line strokeWidth={2} key={i} stroke={"black"} points={[0, i * grid * 2, gridWidth, i * grid * 2]} />);
}

export { linesA, linesB, grid, gridWidth, gaps };
