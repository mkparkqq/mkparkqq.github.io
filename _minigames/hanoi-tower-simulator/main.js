/*
 * variables for the towers and disks.
*/

class Bar {
  /*
    * @param {number} x - x coordinate of the bar
    * @param {number} y - y coordinate of the bar
    * @param {number} xu - unit vector for x axis
    * @param {number} yu - unit vector for y axis
    * @param {string} color - color of the bar
  */
  constructor(x, y, xu, yu, color) {
    this.width = 2.5 * xu; // tower width
    this.height = 65 * yu; // tower height
    this.x = x - this.width / 2;
    this.y = y - this.height;
    this.color = color;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Cornerstone {
  /*
    * @param {number} x - x coordinate of the bar
    * @param {number} y - y coordinate of the bar
    * @param {number} xu - unit vector for x axis
    * @param {number} yu - unit vector for y axis
    * @param {string} color - color of the bar
    */
  constructor(x, y, xu, yu, color) {
    this.gc = 10 * xu; // gap between cornerstones
    this.width = 28 * xu; // cornerstones width
    this.height = 5 * yu; // cornerstones height
    this.x = x - this.width / 2;
    this.y = y;
    this.color = color;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Tower {
  constructor(x, y, xu, yu, i) {
    this.x = x;
    this.y = y;
    this.xu = xu;
    this.yu = yu;
    this.bar = new Bar(x, y, xu, yu, "#7f7f85");
    this.cornerstone = new Cornerstone(x, y, xu, yu, "#353538");
    this.discs = [];
    this.name = i + 1;
  }
  draw(ctx) {
    ctx.fillStyle = "#000000";
    ctx.fillText(this.name, this.x - 0.5 * this.cornerstone.height, this.y + 4 * this.cornerstone.height);
    this.bar.draw(ctx);
    this.cornerstone.draw(ctx);
    this.discs.forEach(disc => disc.draw(ctx));
  }
  putDisc(disc) {
    const updatedX = this.x - disc.width / 2;
    const updatedY = this.y - (this.discs.length + 1) * disc.height;
    disc.updateCoordinate(updatedX, updatedY);
    this.discs.push(disc);
  }
  initializeDiscs(n) {
    for (let i = 0; i < n; i++) {
      this.putDisc(new Disc(this.x, this.y, this.yu, this.cornerstone, this.bar, i, n));
    }
  }
  eraseDiscs(ctx) {
    ctx.clearRect(this.x - this.cornerstone.width / 2, this.y - this.bar.height, this.cornerstone.width, this.bar.height + this.cornerstone.height);
  }
  clearDiscs() {
    this.discs = [];
  }
  popDisc() {
    return this.discs.pop();
  }
}

class Disc {
  constructor(x, y, yu, cornerstone, tower, i, n) {
    this.diff = (cornerstone.width - tower.width) / Math.min(n, SimulatorView.MAX_DISCS); // difference between disc width
    this.width = cornerstone.width - (i + 1) * this.diff; // disc width
    this.height = Math.min(tower.height / n, 5 * yu); // disc height
    this.x = x - this.width / 2;
    this.y = y - (i + 1) * this.height;
    this.color = this.randomColor(i, x, y);
  }
  static defaultHeight(yu) {
    return 5 * yu;
  }
  randomColor(i, x, y) {
    x = parseInt(x);
    y = parseInt(y);
    const rNumber = Math.floor(Math.random() * 255);
    const r = (i * rNumber) % 255;
    const g = (x * rNumber) % 255;
    const b = (y * rNumber) % 255;
    const a = 1;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  erase(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height);
  }
  updateCoordinate(x, y) {
    this.x = x;
    this.y = y;
  }
}

class SimulatorView {
  static MAX_DISCS = 20;
  constructor() {
    this.canvas = document.getElementById("tower-canvas");
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.xu = this.w / 100;
    this.yu = this.h / 100;
    this.gc = 5 * this.xu; // gap between cornerstones
    this.cw = (this.w - 4 * this.gc) / 3; // cornerstones width
    this.ch = 5 * this.yu; // cornerstones height
    this.gl = this.h - 20 * this.yu; // ground level
    this.tw = 60 * this.yu; // tower width
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "20px Arial";
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.lineWidth = 1;
    this.towers = new Array(3).fill(null).map((_, i) => {
      return new Tower(i * (this.cw + this.gc) + this.gc + this.cw / 2, this.gl - this.ch, this.xu, this.yu, i);
    });
  }
  initializeDiscs(n) {
    this.towers.forEach(tower => tower.clearDiscs());
    this.n = n;
    this.towers[0].initializeDiscs(n);
  }
  drawTowers() {
    this.towers.forEach(tower => tower.eraseDiscs(this.ctx));
    this.towers.forEach(tower => tower.draw(this.ctx));
  }
  /*
    * @parameter {number} from - 1-index
    * @parameter {number} to - 1- index
    */
  moveDisc(from, to) {
    const disc = this.towers[from - 1].popDisc();
    if (disc == null) {
      return;
    }
    this.towers[to - 1].putDisc(disc);
    // this.towers.forEach(tower => console.log(tower.discs));
    this.drawTowers();
  }
}

let simulator = null;
let mainView = new SimulatorView();
mainView.drawTowers();

function readNumberOfDisc() {
  let N = document.getElementById("integerInput").value;
  if (N > SimulatorView.MAX_DISCS || N < 1) {
    alert(`1 ~ ${SimulatorView.MAX_DISCS} 까지의 정수를 입력해주세요.`);
    return;
  }
  mainView.initializeDiscs(N);
  simulator = new Simulator(N);
  simulator.moveDiscs(N, 1, 3, 2);
  document.getElementById("progress-number").innerText = `(0/${simulator.minimumMoves()})`
  document.getElementById("move-count").innerText = `최소 이동 횟수 : ${simulator.minimumMoves()}`;
  const resultPanels = document.getElementsByClassName("after-start");
  let garbageDatas = moveLists.getElementsByClassName("move-order-item");
  Array.from(garbageDatas).forEach((tag) => tag.remove());
  simulator.forEachMoves((move, i) => {
    const moveItem = document.createElement("div");
    moveItem.id = `move-${i}`;
    moveItem.className = "move-order-item";
    moveItem.innerText = `${move[0]} → ${move[1]}`;
    moveLists.appendChild(moveItem);
  });
  [...resultPanels].forEach(panel => panel.style.display = "flex");
  mainView.drawTowers();
}

let moveLists = document.getElementById("move-order-list");

