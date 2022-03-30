//Props
var fr = 60;
var canvasHeight = 500;
var canvasWidth = 500;
var offset = 100;
var cellWidth = 50;
var cellHeight = 50;
var numHorCells = 3;
var numVertCells = 3;
var gameState = "human turn"; //1) human vs human; 2) human turn; 3) ai turn-random or minimax
var aiMode = "minimax";
var debug = false;

//Member Vars
let grid;
var player = "X";
var gameOver = false;
var gameStateString = "GAME IN PROGRESS";
let restartButton;
let ai;
let gameMode;



function setup() {
  // put setup code here
    createCanvas(canvasWidth, canvasHeight);
    restartButton = createButton("RESET");
    restartButton.mousePressed(restart);
    restartButton.position(10,10);


    grid = createGrid();
    ai = new AI("O", grid);
    gameMode = gameState;
}

function draw() {
  // put drawing code here
  clear();
  for(i=0; i<3; i++){
    for(j=0; j < 3; j++){
      grid[i][j].show();
    }
  }
  stroke(0);
  fill(0);
  textAlign(CENTER, CENTER);
  text(gameStateString, offset + cellWidth, offset - cellHeight);
}


/*
 This is the Gameplay loop. Other loops such as the draw loop 
 only handle displaying the current game state. Thus we need only
 worry about the state of the game in this loop in terms of AI 
 and who should play... Nvm, we need some in the draw loop...
*/
function mousePressed(){
  if(!gameOver){
    switch(gameState){
      case "human vs human":
        placePiece();
        checkForGameOver();
        break;
      case "human turn":
        var out = placePiece();
        if(out) {gameState = "ai turn-" + aiMode;}
        checkForGameOver();
        aiTurn();
        break;
    }
  }
}

function aiTurn(){
  //Random move
  if(gameState == "ai turn-random" && !gameOver){
  var aiMove = ai.randomMove(grid);
  if(debug)console.log(aiMove);
  grid[aiMove.x][aiMove.y].directPlace(player);
  }

  //Minimax move
  else if(gameState == "ai turn-minimax" && !gameOver){
    var aiMove = ai.minimax(true, 0);
    if(debug) console.log(aiMove);
    grid[aiMove.x][aiMove.y].directPlace(player);
  }

  //Togle turn etc
  if(player == "X"){ player = "O"; }
  else if(player == "O"){ player = "X"; }
  gameState = "human turn";
  
  
  checkForGameOver();
}




function checkForGameOver(){
  var Xs = 0;
  var Os = 0;

  //Horizontal Wins
  for(i=0; i <3; i++){
    for(j=0;j<3;j++){
      if(grid[i][j].player == "X"){Xs++;}
      else if(grid[i][j].player == "O"){Os++;}
    }
    if(Xs<2 && Os<2){Xs = 0; Os = 0; }
    else if(Xs>2){ 
      gameOver = true;
      handleGameOver("X");
    }
    else if(Os>2){
      gameOver = true;
      handleGameOver("O");
    }
    Xs = 0; Os = 0;
  }

  //Verticl Wins
  Xs = 0; Os = 0;
  for(i=0; i <3; i++){
    for(j=0;j<3;j++){
      if(grid[j][i].player == "X"){Xs++;}
      else if(grid[j][i].player == "O"){Os++;}
    }
    if(Xs<2 && Os<2){Xs = 0; Os = 0; }
    else if(Xs>2){ 
      gameOver = true;
      handleGameOver("X");
    }
    else if(Os>2){
      gameOver = true;
      handleGameOver("O");
    }
    Xs = 0; Os = 0;
  }

  //Diagonal Wins top left to bottom right
  Xs = 0; Os = 0;
  for(i=0; i<3; i++){
    if(grid[i][i].player == "X"){Xs++;}
    else if(grid[i][i].player == "O"){Os++;}
  }
  if(Xs<2 && Os<2){Xs = 0; Os = 0; }
  else if(Xs>2){ 
    gameOver = true;
    handleGameOver("X");
  }
  else if(Os>2){
    gameOver = true;
    handleGameOver("O");
  }
  

  //Diagonal Win: top right to bottom left
  Xs = 0; Os = 0;
  for(i=0; i<3; i++){
    if(grid[i][2-i].player == "X"){Xs++;}
    else if(grid[i][2-i].player == "O"){Os++;}
  }
  if(Xs>2){ 
    gameOver = true;
    handleGameOver("X");
  }
  else if(Os>2){
    gameOver = true;
    handleGameOver("O");
  }

  //Cats game
  var cats = 0;
  for(i=0; i <3; i++){
    for(j=0;j<3;j++){
      if(grid[i][j].player != "NONE"){cats++;}
    }
  }
  if(cats>8 && !gameOver){gameOver=true; handleGameOver("CAT");}
  cats = 0;
}

function handleGameOver(winner){
  gameStateString = winner + " WINS!";
}

function placePiece() {
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      var out = grid[i][j].update(player);
      if (out) {
        if (player == "X") { player = "O"; }
        else if (player == "O") { player = "X"; }
        return true;
      }
    }
  }
  return false;
}

function createGrid(){
  return new Grid(numHorCells, numVertCells, cellWidth, cellHeight, offset, offset);
}

function restart(){
  gameOver = false;
  grid = createGrid();
  gameStateString = "GAME IN PROGRESS";
  player = "X";
  switch(gameMode){
    case "human vs human":
      gameState = "human vs human";
      break;
    case "human turn":
      gameState = "human turn";
      break;
  }
}