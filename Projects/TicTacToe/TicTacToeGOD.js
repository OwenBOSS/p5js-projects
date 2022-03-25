class AI{
  constructor(aiPlayer){
      this.aiPlayer = aiPlayer;
      if(this.aiPlayer == "O"){this.humanPlayer = "X";}
      else{this.humanPlayer = "O";}
  }

minimax(grid, maximizer, depth){
    //Create a list of length = number of valid moves
    var gridList = new Array(this.numberOfValidMoves(grid));
    var scoreList =  new Array(this.numberOfValidMoves(grid));
    var moveList =  new Array(this.numberOfValidMoves(grid));


    //Create a board with the state of each move and store in the list; Make a list of the asscociated moves and a list of ascociated scores
    var index = 0;
    for(i=0; i<3; i++){
      for(j=0; j<3; j++){
        if(this.validMove(grid, i, j)){
          var newGrid = new Grid(grid.numHorCells, grid.numVertCells, grid.cellWidth, grid.cellHeight, grid.xOffset, grid.yOffset);
          newGrid = grid; //It seems that any changes to newGrid change grid, that is the point of OOP... So I need a copy function. Grid.copy();
          console.log(grid, newGrid);
          newGrid[i][j].directPlace(this.aiPlayer);
          gridList[index] = newGrid;
        }
      }
    }

    /*Score each game state, if the score is inconclusive (niether player has won or cats game), call minimax again unless max depth has 
    been reached, in which case return a default value such as 0 for the score.*/
    //Check through the score list. Choose the best score and thus the index of the best move. Return the best move (vector2).
  }

score(miniGrid){
  var aiScore = 0;
  var humanScore = 0;

  //Horizontal Score
  for(i=0; i <3; i++){
    for(j=0;j<3;j++){
      if(miniGrid[i][j].player == this.aiPlayer){aiScore++;}
      else if(miniGrid[i][j].player == this.humanPlayer){humanScore++;}
    }
    if(aiScore<2 && humanScore<2){aiScore = 0; humanScore = 0; }
    else if(aiScore>2){ 
        return 1;
    }
    else if(humanScore>2){
        return -1;
    }
    aiScore = 0; humanScore = 0;
  }
  
  //Vertical Score
  aiScore = 0; humanScore = 0;
  for(i=0; i <3; i++){
      for(j=0;j<3;j++){
        if(miniGrid[j][i].player == this.aiPlayer){aiScore++;}
        else if(miniGrid[j][i].player == this.humanPlayer){humanScore++;}
      }
      if(aiScore<2 && humanScore<2){aiScore = 0; humanScore = 0; }
      else if(aiScore>2){ 
          return 1;
      }
      else if(humanScore>2){
          return -1;
      }
      aiScore = 0; humanScore = 0;
  }
  
      
  //Diagonal Score top left to bottom right
  aiScore = 0; humanScore = 0;
  for(i=0; i<3; i++){
    if(miniGrid[i][i].player == this.aiPlayer){aiScore++;}
    else if(miniGrid[i][i].player == this.humanPlayer){humanScore++;}
  }
  if(aiScore<2 && humanScore<2){aiScore = 0; humanScore = 0; }
  else if(aiScore>2){ 
    return 1;
  }
  else if(humanScore>2){
    return -1;
  }
    
  
  //Diagonal Win: top right to bottom left
  aiScore = 0; humanScore = 0;
  for(i=0; i<3; i++){
    if(miniGrid[i][2-i].player == this.aiPlayer){aiScore++;}
    else if(miniGrid[i][2-i].player == this.humanPlayer){humanScore++;}
  }
  if(aiScore<2 && humanScore<2){aiScore = 0; humanScore = 0; }
  else if(aiScore>2){ 
    return 1;
  }
  else if(humanScore>2){
    return -1;
  }
  
  //Cats game
  var cats = 0;
  for(i=0; i <3; i++){
    for(j=0;j<3;j++){
      if(miniGrid[i][j].player != "NONE"){cats++;}
    }
  }
  if(cats>8){
      return -0.5;
  }
  else{cats = 0; return 0; }
  }

  randomMove(miniGrid){
    var randomIndex = createVector(floor(random(0,2.1)), floor(random(0,2.1)));
    if(this.validMove(miniGrid, randomIndex.x, randomIndex.y)){
        return randomIndex;
    }
    else{ 
        randomIndex =this.randomMove(miniGrid);
        return randomIndex;
    }
  }

  validMove(miniGrid, i, j){
    return miniGrid[i][j].player == "NONE";
  }

  numberOfValidMoves(miniGrid){
    var n = 0;
    for(i=0; i<3; i++){
        for(j=0; j<3; j++){
            if(this.validMove(miniGrid, i, j)){n++;}
        }
    }
    return n;
  }
}