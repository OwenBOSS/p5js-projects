//Parameters
var topLeft = 40;
var tileWidth = 30;
var tileHeight = 30;
var strkWeight = 3;

//Member vars
var board;

function setup() {
    createCanvas(400,400);

    board = new Board(topLeft, tileWidth, tileHeight, strkWeight);
}

function draw() {
  // put drawing code here
  board.ShowBoard();
}