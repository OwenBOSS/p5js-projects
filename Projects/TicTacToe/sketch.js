//Props
var fr = 60;
var canvasHeight = 500;
var canvasWidth = 500;
var offset = 100;
var tileSize = 50;

//Member Vars
let grid;
var player = "X";
var gameOver = false;
var gameStateString = "GAME IN PROGRESS";
let restartButton;
var gameState = "human vs human";
let ai;



function setup() {
  // put setup code here
    createCanvas(canvasWidth, canvasHeight);
    restartButton = createButton("RESET");
    restartButton.mousePressed(restart);
    restartButton.position(10,10);
    grid = createGrid();
    ai = new AI();
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
  text(gameStateString, offset + tileSize, offset - tileSize);
}

/*
 This is the Gameplay loop. Other loops such as the draw loop 
 only handle displaying the current game state. Thus we need only
 worry about the state of the game in this loop in terms of AI 
 and who should play.
*/
function mousePressed(){
  if(!gameOver){
    switch(gameState){
      case "human vs human":
        placePiece();
        break;
      case "human turn":
        placePiece();
        break;
      case "ai turn":
        
    }
  }
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
  console.log(cats);
  for(i=0; i <3; i++){
    for(j=0;j<3;j++){
      if(grid[i][j].player != "NONE"){cats++;}
    }
  }
  if(cats>8){gameOver=true; handleGameOver("CAT");}
  else{cats = 0};
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
      }
    }
  }
}

function createGrid(){
  var list = new Array(3);
  for(i=0; i<3; i++){
    list[i]=new Array(3);
    for(j=0; j < 3; j++){
      list[i][j] = new Tile(createVector(offset + i * tileSize, offset + j* tileSize), tileSize, tileSize);
    }
  }
  return list;
}

function restart(){
  gameOver = false;
  grid = createGrid();
  gameStateString = "GAME IN PROGRESS";
}