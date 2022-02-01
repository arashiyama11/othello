let size = Math.min(innerHeight, innerWidth);
size = (size * 2) / 3;
let canvas = document.getElementById('can');
let ctx = canvas.getContext('2d');
canvas.height = size;
canvas.width = size;
ctx.fillStyle = 'grey';
ctx.fillRect(0, 0, 600, 600);
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
    this.history = [];
    this.canvas.addEventListener('click', (e) => {
      this.mouseX = Math.floor(e.offsetX / this.pixcel);
      this.mouseY = Math.floor(e.offsetY / this.pixcel);
    });
  }
  at(x, y) {
    if (this.board[y] === undefined) return undefined;
    return this.board[y][x];
  }
  drow() {
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
  putOn(x, y) {
    //置けるか判定する
    let canPut = (() => {
      //上下左右
      let coo = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
      ];
      let directions = [false, false, false, false];
      directions = directions.map((_, i) => {
        let co = coo[i];
        let other = (() => {
          if (this.order === 1) {
            return 2;
          }
          if (this.order === 2) {
            return 1;
          }
        })();
        if (this.at(x + co[0], y + co[1]) === other) {
          return true;
        } else {
          return false;
        }
      });
      
      directions = directions.map((value, index) => {
        if (!value) return false;
        let i = 1;
        while (true) {
          let co = coo[index];
          let it = this.at(x + co[0] * i, y + co[1] * i);
          if (it === undefined) return false;
          if (it === this.order) return true;
          i++;
        }
      });
      return directions;
    })();
    if(canPut.includes(true))this.history.push([x, y]);
    return this;
  }
  readHistry() {
    //historyから最新の盤面を計算する
  }
  drowGrid() {
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

let othello = new Othello(canvas).drowGrid().drow().putOn(3,5);
