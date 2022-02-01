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
    this.order = 0;
    this.history = [];
    this.canvas.addEventListener('click', (e) => {
      this.mouseX = Math.floor(e.offsetX / this.pixcel);
      this.mouseY = Math.floor(e.offsetY / this.pixcel);
    });
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
    this.history.push([x, y]);
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

let othello = new Othello(canvas).drowGrid().drow().putOn(4, 2);
