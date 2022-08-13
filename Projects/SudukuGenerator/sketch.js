//Parameters
var topLeft = 20;
var tileWidth = 25;
var tileHeight = 25;
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