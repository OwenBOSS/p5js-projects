class AI{
    constructor(aiPlayer){
        this.aiPlayer = aiPlayer;
        if(this.aiPlayer == "O"){this.humanPlayer = "X";}
        else{this.humanPlayer = "O";}
    }

    minimax(grid, maximizer){
        var index = 0;
        var n = this.numberOfValidMoves(grid);
        var newGrid = Array(3); //This creates a 1D array
        var gridList = Array(n);
        var scoreList = Array(n);
        var moveList = Array(n);

        //Copies the current state into the newGrid object... I should have a grid class, that's why this is so hard...
        for(i=0; i<3; i++){
          newGrid[i] = Array(3); //This expends newGrid to a 2D array
          for(j=0; j<3; j++){
            console.log("begin", grid, grid[i][j], "end");
            newGrid[i][j] = grid[i][j];
          }
        }
        //create ist of moves, ie board positions after move
        for(i=0; i<3; i++){
            for(j=0; j<3; j++){
                if(this.validMove(grid, i, j)){
                    newGrid[i][j] = grid[i][j].directPlace(this.aiPlayer);
                    console.log("new grid", newGrid, "grid ", grid);
                    grid[i][j].undoMove();
                    gridList[index] = newGrid;
                    moveList[index] = createVector(i, j);
                    index++;
                }
            }
        }
        


        //Now i have a list of all possible gamestates after ai has made a move.
        //So i need to assign score to each grid state
        index = 0;
        for(i=0; i<3; i++){
            for(j=0; j<2; j++){
                if(this.validMove(grid, i, j)){
                    console.log(gridList[index]);
                    scoreList[index] = this.score(gridList[index]);
                    index++;
                }
            }
        }


        //Now i need to choose the best gridstate based on score
        var bestScore = -Infinity;
        var bestMove = createVector(0,0);
        for(i=0; i<scoreList.length; i++){
            if(scoreList[i]>bestScore){
                bestScore = scoreList[i];
                bestMove = moveList[i];
            }
        }

        //At this point I should have selected the best move based on a depth of 1;
        return bestMove;
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
        else{cats = 0};

        return 0;
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