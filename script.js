let size = Math.min(innerHeight, innerWidth);
size = (size * 2) / 3;
let canvas = document.getElementById('can');
let ctx = canvas.getContext('2d');
canvas.height = size;
canvas.width = size;
class Othello {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.size = canvasElement.height;
    this.pixcel = this.canvas.height / 8;
    this.backgroundColor = 'green';
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.order = 1;
    this.color = [null, 'black', 'white'];
    this.history = [];
    this.clickEvent = (e) => {
      this.mouseX = Math.floor(e.offsetX / this.pixcel);
      this.mouseY = Math.floor(e.offsetY / this.pixcel);
      if (0 <= this.mouseX <= 8 && 0 <= this.mouseY <= 8) {
        this.putOn(this.mouseX, this.mouseY);
        console.log(this.history);
        this.readHistry();
      }
    };
  }
  get winner() {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.win == 'decide') {
          let white = 0;
          let black = 0;
          this.board
            .reduce((a, b) => [...a, ...b])
            .forEach((v) => {
              if (v === 1) {
                black++;
              }
              if (v === 2) {
                white++;
              }
            });
          if (white < black) {
            resolve('black');
          }
          if (black < white) {
            resolve('white');
          }
          if (black === white) {
            resolve('draw');
          }
        }
      }, 1000);
    });
  }
  enableClickToPut() {
    this.canvas.addEventListener('click', this.clickEvent);
    return this;
  }
  disableClickToPut() {
    this.canvas.removeEventListener('click', this.clickEvent);
  }
  at(x, y) {
    if (this.board[y] === undefined) return undefined;
    return this.board[y][x];
  }
  setAt(x, y, value) {
    if (this.board[y] !== undefined) {
      if (this.board[y][x] !== undefined) {
        this.board[y][x] = value;
      }
    }
  }
  drow() {
    this.drowGrid();
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.board[i][j] === 1) {
          this.ctx.beginPath();
          this.ctx.fillStyle = 'black';
          this.ctx.arc(
            (j + 0.5) * this.pixcel,
            (i + 0.5) * this.pixcel,
            (this.pixcel * 2) / 5,
            0,
            Math.PI * 2
          );
          this.ctx.fill();
        } else if (this.board[i][j] === 2) {
          this.ctx.beginPath();
          this.ctx.fillStyle = 'white';
          this.ctx.arc(
            (j + 0.5) * this.pixcel,
            (i + 0.5) * this.pixcel,
            (this.pixcel * 2) / 5,
            0,
            Math.PI * 2
          );
          this.ctx.fill();
        }
      }
    }
    return this;
  }

  canPutAt(x, y, color) {
    //上から時計回り
    if (this.at(x, y) !== 0)
      return Array(8)
        .fill(0)
        .map(() => [false, 0]);
    let coo = [
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
    ];
    let other;
    if (color === 1) {
      other = 2;
    } else if (color === 2) {
      other = 1;
    }
    let directions = Array(8).fill(false);
    directions = directions.map((_, i) => {
      let co = coo[i];
      if (this.at(x + co[0], y + co[1]) === other) {
        return true;
      } else {
        return false;
      }
    });
    directions = directions.map((value, index) => {
      if (!value) return [false, 0];
      let i = 2;
      while (true) {
        let co = coo[index];
        let it = this.at(x + co[0] * i, y + co[1] * i);
        if (it === undefined || it === 0) return [false, 0];
        if (it === color) return [true, i];
        i++;
      }
    });
    return directions;
  }
  putOn(x, y) {
    this.history.push([x, y]);
    return this;
  }
  readHistry() {
    //historyから最新の盤面を計算する
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    let coo = [
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
    ];
    for (let i = 0; i < this.history.length; i++) {
      let vs = this.canPutAt(...this.history[i], (i % 2) + 1);
      //console.log(vs);
      if (!vs.map((v) => v[0]).includes(true)) {
        /*throw new Error(
          `cannnot put ${this.color[(i % 2) + 1]} on (${this.history[i][0]},${
            this.history[i][1]
          })`
        );*/
        alert(
          `cannnot put ${this.color[(i % 2) + 1]} on (${this.history[i][0]},${
            this.history[i][1]
          })`
        );
        this.history.pop();
        return this;
      }
      for (let k = 0; k < vs.length; k++) {
        let co = coo[k];
        for (let l = 0; l <= vs[k][1]; l++) {
          this.setAt(
            this.history[i][0] + co[0] * l,
            this.history[i][1] + co[1] * l,
            (i % 2) + 1
          );
        }
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.size, this.size);
        this.drow();
      }
      //console.log
      this.board
        .map((value, i) =>
          value
            .map((_, j) =>
              [...this.canPutAt(i, j, 1), ...this.canPutAt(i, j, 2)].map(
                (v) => v[0]
              )
            )
            .reduce((a, b) => [...a, ...b])
        )
        .reduce((a, b) => [...a, ...b]);
      if (
        !this.board
          .map((value, i) =>
            value
              .map((_, j) =>
                this.canPutAt(i, j, (this.history.length % 2) + 1).map(
                  (v) => v[0]
                )
              )
              .reduce((a, b) => [...a, ...b])
          )
          .reduce((a, b) => [...a, ...b])
          .includes(true)
      )
        this.win = 'decide';
    }
    return this;
  }

  drowGrid() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.size, this.size);
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    for (let i = 0; i < 8; i++) {
      this.ctx.moveTo(i * this.pixcel, 0);
      this.ctx.lineTo(i * this.pixcel, size);
    }
    for (let i = 0; i < 8; i++) {
      this.ctx.moveTo(0, i * this.pixcel);
      this.ctx.lineTo(size, i * this.pixcel);
    }
    this.ctx.stroke();
    this, ctx.closePath();
    return this;
  }
}

let othello = new Othello(canvas).drow().enableClickToPut();

//othello.history =
[
  [4, 2],
  [5, 2],
  [3, 5],
  [2, 5],
  [2, 4],
  [4, 5],
  [5, 3],
  [2, 3],
  [3, 6],
  [4, 6],
  [5, 4],
  [4, 1],
  [5, 5],
  [6, 5],
  [6, 4],
  [7, 4],
  [5, 6],
  [6, 6],
  [7, 7],
  [6, 3],
  [6, 2],
  [7, 5],
  [5, 1],
  [6, 1],
  [1, 4],
  [4, 7],
  [7, 0],
  [3, 2],
  [5, 0],
  [4, 0],
  [6, 0],
  [7, 1],
  [7, 2],
  [3, 7],
  [3, 1],
  [7, 3],
  [3, 0],
  [7, 6],
  [6, 7],
  [5, 7],
  [2, 7],
  [2, 6],
  [1, 7],
  [1, 6],
  [1, 5],
  [2, 1],
  [2, 0],
  [2, 2],
  [1, 2],
  [1, 3],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
  [1, 1],
  [0, 2],
  [1, 0],
  [0, 1],
  [0, 0],
];
othello.readHistry();
othello.winner.then((d) => {
  console.log(`${d} win`);
});
