//Props
var tileSize = 50;
var gridWidth = 20;
var gridHeight = 20;
var fr = 10;

//Members
var tile;
var tile2;
var grid;

function setup() {
  // put setup code here
  createCanvas(tileSize * 0.6 * gridWidth, tileSize * 0.6 * gridHeight);
  noStroke();

  grid = new Grid(gridWidth, gridHeight, tileSize, color(50), color(255), fr);

  tile = new Tile(1, 0, tileSize, color(0), color(200));
  tile2 = new Tile(0, 1, tileSize, color(50,100,50), color(200));

  tile.sockets = [0, 1, 0, 1];
}

function draw() {
  grid.Update(1);
  //grid.Percolate();
  grid.Show();
  //tile.Show();
  //tile2.Show();
}