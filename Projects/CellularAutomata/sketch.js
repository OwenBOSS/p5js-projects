//Props
var boardWidth = 140; //In cells
var boardHeight = 80;
var cellSize = 10;
var offset = 50;
var fr = 10;
var canvasWidth = 1800;
var canvasHeight = 900;

//Member vars
let board;
let startStop;
var isPlaying = false;



function setup() {
  // put setup code here
    createCanvas(canvasWidth, canvasHeight);
    //frameRate(fr);
    board = new Grid(boardWidth, boardHeight, cellSize, offset);
    board.randomizeBoard();
    startStop = createButton("Start/Stop");
    startStop.position(10,10);
    startStop.mousePressed(TogleGameState)
}

function draw() {
  // put drawing code here
  if(isPlaying) board.Update();
  board.Show();
}

function mousePressed(){
  board.UserInput();
}

function TogleGameState(){
  isPlaying = !isPlaying;
}