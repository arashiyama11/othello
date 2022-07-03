import { Othello } from './othello.js';
let size = Math.min(innerHeight, innerWidth);
size = (size * 2) / 3;
let canvas = document.getElementById('can');
canvas.height = size;
canvas.width = size;

const othello = new Othello().writeOn(canvas).drow().enableClickToPut();
console.log(
  othello.getPutablePlace(1).forEach(([x, y]) => {
    console.log(x, y);
    othello.hightlightCell(x, y);
  })
);
othello.readHistory();
othello.winner.then((win) => {
  winner.value = win;
});
document.getElementById('back').addEventListener('click', () => {
  if (othello.history.length > 0) {
    othello.history.pop();
    othello.readHistory();
    othello.drow();
  }
});
