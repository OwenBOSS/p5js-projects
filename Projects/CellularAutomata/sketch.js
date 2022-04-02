//Props
var cellSize = 4;
var offset = 50;
var fr = 1;
var canvasWidth = 1200;
var canvasHeight = 600;
var showMode = 'Targeted' ; //Full, Targeted, Alive, Targeted Alive

//Member vars
let board;
let startStop;
let clearButton;
let randomizeButton;
let randerButton;
var isPlaying = true;



function setup() {
  canvasWidth = windowWidth * .95;
  canvasHeight = windowHeight * .95;
  // put setup code here
  createCanvas(canvasWidth, canvasHeight);
  //frameRate(fr);
  boardWidth = floor(canvasWidth / cellSize);
  boardHeight = floor(canvasHeight / cellSize);
  board = new Grid(boardWidth, boardHeight, cellSize, offset);
  board.randomizeBoard();


  CreateButtons();

  board.Show();
}

function draw() {
  // put drawing code here
  if(isPlaying) board.Update();

  switch (showMode) {
    case "Full":
      board.Show();
      break;
  
    case "Targeted":
      board.TargetedShow();
      break;

    case "Alive":
      background(50);
      board.AliveShow();
      break;

    case "Targeted Alive":
      if(isPlaying) background(50);
      board.TargetedAliveShow();
      break;
  }
}



function mousePressed(){
  board.UserInput();
}

function TogleGameState(){
  isPlaying = !isPlaying;
}

function ClearBoard(){
  board.Clear();
}

function RanomizeBoard(){
  board.randomizeBoard();
}

function ChangeRender(){
  switch (showMode) {
    case "Full":
      showMode = "Targeted";
      break;
  
    case "Targeted":
      showMode = "Alive";
      break;

    case "Alive":
      showMode = "Targeted Alive";
      break;

      case "Targeted Alive":
        showMode = "Full";
        break;
  }
}


function CreateButtons() {
  startStop = createButton("Start/Stop");
  startStop.position(10, 10);
  startStop.mousePressed(TogleGameState);

  clearButton = createButton("Clear Board");
  clearButton.position(100, 10);
  clearButton.mousePressed(ClearBoard);

  randomizeButton = createButton("Randomize Board");
  randomizeButton.position(200, 10);
  randomizeButton.mousePressed(RanomizeBoard);

  randomizeButton = createButton("Toggle Render");
  randomizeButton.position(335, 10);
  randomizeButton.mousePressed(ChangeRender);
}