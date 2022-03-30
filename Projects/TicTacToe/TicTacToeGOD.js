class AI{
  constructor(aiPlayer, grid){
      this.aiPlayer = aiPlayer;
      this.grid = grid;
      if(this.aiPlayer == "O"){this.humanPlayer = "X";}
      else{this.humanPlayer = "O";}
  }

  minimax(maximizer, depth){
    var bestScore;
    var bestMove;

    //Maximizing Code
    if(maximizer){
      bestScore = -Infinity;

      for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
          if(this.validMove(this.grid, i, j)){
            //Make the move and score the grid
            this.grid[i][j].directPlace(this.aiPlayer);
            var score = this.score(this.grid, maximizer, depth) - depth;
            try {
              this.grid[i][j].undoMove();
            } catch (error) {
              console.log("At depth: " + depth + ". This error occured: " + error);
            }

            //Update best score and move
            if(score > bestScore){
              bestScore = score;
              bestMove = createVector(i, j);
            }
          }
        }
      }
    }
    else{//Minimizing Code
      bestScore = Infinity;

      for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
          if(this.validMove(this.grid, i, j)){
            //Make the move and score the grid
            this.grid[i][j].directPlace(this.humanPlayer);
            var score = this.score(this.grid, maximizer, depth) + depth;
            try {
              this.grid[i][j].undoMove();
            } catch (error) {
              console.log("At depth: " + depth + ". This error occured: " + error);
            }

            //Update best score and move
            if(score < bestScore){
              bestScore = score;
              bestMove = createVector(i, j);
            }
          }
        }
      }

    }

    //If depth > 0 return the best score!
    if(depth > 0){
      return bestScore;
    }
    //If depth == 0 return the best move!
    else if(depth == 0){
      return bestMove;
    }
  }

  score(grid, maximizer, depth){
    //If the game is over return a score
    var aiScore = 0;
    var humanScore = 0;
    var out = null;

    //Horizontal Wins
    for(i=0; i <3; i++){
      for(j=0;j<3;j++){
        if(grid[i][j].player == this.aiPlayer){aiScore++;}
        else if(grid[i][j].player == this.humanPlayer){humanScore++;}
      }
      if(aiScore<2 && humanScore<2){aiScore = 0; humanScore = 0; }
      else if(aiScore>2){ 
        if(maximizer) out = 10;
        else if(!maximizer) out = -10;
      }
      else if(humanScore>2){
        if(maximizer) out = -10;
        else if(!maximizer) out = 10;
      }
      aiScore = 0; humanScore = 0;
    }

    //Verticl Wins
    aiScore = 0; humanScore = 0;
    for(i=0; i <3; i++){
      for(j=0;j<3;j++){
        if(grid[j][i].player == this.aiPlayer){aiScore++;}
        else if(grid[j][i].player == this.humanPlayer){humanScore++;}
      }
      if(aiScore<2 && humanScore<2){aiScore = 0; humanScore = 0; }
      else if(aiScore>2){ 
        if(maximizer) out = 10;
        else if(!maximizer) out = -10;
      }
      else if(humanScore>2){
        if(maximizer) out = -10;
        else if(!maximizer) out = 10;
      }
      aiScore = 0; humanScore = 0;
    }

    //Diagonal Wins top left to bottom right
    aiScore = 0; humanScore = 0;
    for(i=0; i<3; i++){
      if(grid[i][i].player == this.aiPlayer){aiScore++;}
      else if(grid[i][i].player == this.humanPlayer){humanScore++;}
    }
    if(aiScore<2 && humanScore<2){aiScore = 0; humanScore = 0; }
    else if(aiScore>2){ 
      if(maximizer) out = 10;
        else if(!maximizer) out = -10;
    }
    else if(humanScore>2){
      if(maximizer) out = -10;
        else if(!maximizer) out = 10;
    }
  

    //Diagonal Win: top right to bottom left
    aiScore = 0; humanScore = 0;
    for(i=0; i<3; i++){
      if(grid[i][2-i].player == this.aiPlayer){aiScore++;}
      else if(grid[i][2-i].player == this.humanPlayer){humanScore++;}
    }
    if(aiScore>2){ 
      if(maximizer) out = 10;
        else if(!maximizer) out = -10;
    }
    else if(humanScore>2){
      if(maximizer) out = -10;
        else if(!maximizer) out = 10;
    }

    //Cats game
    var cats = 0;
    for(i=0; i <3; i++){
      for(j=0;j<3;j++){
        if(grid[i][j].player != "NONE"){cats++;}
      }
    }
    if(cats>8 && out == null){
      out = 0;
    }
    cats = 0;

    //If the game is not over call minimax again!
    if(out != null){ //if(out) is true when the game has ended, and thus we simply return out
      return out;
    }
    else{ //if(out) is flase when we need to go deeper!
      return this.minimax(!maximizer, depth + 1);
    }
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

  validMove(grid, i, j){
    return grid[i][j].player == "NONE";
  }

  numberOfValidMoves(grid){
    var n = 0;
    for(i=0; i<3; i++){
      for(j=0; j<3; j++){
        if(this.validMove(grid, i, j)){n++;}
      }
    }
    return n;
  }
}