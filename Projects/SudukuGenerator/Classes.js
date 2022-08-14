class Board {
    constructor(topLeft, tileWidth, tileHeight, strkWeight){
        this.topLeft = topLeft;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.strkWeight = strkWeight;

        this.board = this.CreateBoard();
        this.RandomizeBoard(1);
    }

    CreateBoard(){
        var out = new Array(9);
        for (let i = 0; i < 9; i++) {
            out[i] = new Array(9);
        }

        //For DEMO only, result does not follow rules of Sudoku
        for (let i = 0; i < out.length; i++) {
            for (let j = 0; j < out[0].length; j++) {
                //out[i][j] = 0;
            }
        }

        return out;
    }

    ShowBoard(){

        //Loop through each cell in the matrix
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                //Set drawing style for grid
                noFill();
                strokeWeight(this.strkWeight);
                stroke(200);
                rectMode(CORNER);
                //Draw grid
                rect(this.topLeft + i * this.tileWidth, this.topLeft + j * this.tileHeight, this.tileWidth, this.tileHeight);

                //Set drawing style for numbers
                strokeWeight(this.strkWeight * 0.1);
                stroke(80);
                fill(80);
                textSize(11);
                //Draw contents
                text(this.board[i][j], this.topLeft + i * this.tileWidth + this.tileWidth * 0.27, this.topLeft + j * this.tileHeight + this.tileHeight * 0.7)
            }
        }

        //Draw the major lines
        strokeWeight(1.75 * this.strkWeight);
        stroke(0);
        line(this.topLeft + 3 * this.tileWidth, this.topLeft + 0 * this.tileHeight, 
            this.topLeft + 3 * this.tileWidth, this.topLeft + 9 * this.tileHeight);
        line(this.topLeft + 6 * this.tileWidth, this.topLeft + 0 * this.tileHeight, 
            this.topLeft + 6 * this.tileWidth, this.topLeft + 9 * this.tileHeight);
        line(this.topLeft + 0 * this.tileWidth, this.topLeft + 3 * this.tileHeight, 
            this.topLeft + 9 * this.tileWidth, this.topLeft + 3 * this.tileHeight);
        line(this.topLeft + 0 * this.tileWidth, this.topLeft + 6 * this.tileHeight, 
            this.topLeft + 9 * this.tileWidth, this.topLeft + 6 * this.tileHeight);
    }

    RandomizeBoard(dificulty){
        switch (dificulty) {
            //Easy - randomly generate
            //There aren't valid positions for all the numbers...
            case 1:
                //Randomly fill the diagonal
                for (let k = 0; k < 3; k++) {
                    var potentialNumbers = this.GenerateRandomNumList(9);
                    for (let i = 0; i < this.board.length / 3; i++) {
                        for (let j = 0; j < this.board[0].length / 3; j++) {
                            this.board[3*k + i][3*k + j] = potentialNumbers.pop();
                        }
                    }
                }

                //Pick an off diagonal to fill in
                var offDiags = this.shuffle([[1,0], [2,0], [0,1], [2,1], [0,2], [1,2]]);
                for(let k = 0; k < 6; k++){
                    var selectedOffGrid = offDiags.pop();
                    var potentialNumbers = this.GenerateRandomNumList(9)

                    //Fill in that diagonal
                    while (potentialNumbers.length > 0) {
                        var selectedNum = potentialNumbers.pop();

                        var placed = false;
                        while (!placed) { 
                            var pos = [floor(random(0,3)) + selectedOffGrid[0] * 3, floor(random(0,3)) + selectedOffGrid[1] * 3];
                            
                            if(this.ValidPos(selectedNum, pos)){
                                this.board[pos[0]][pos[1]] = selectedNum;
                                placed = true;
                            }
                            //console.log(selectedOffGrid, pos, selectedNum, placed);
                        }
                    }
                }
                break;
        }
    }

    GenerateRandomNumList(length){
        var out = [];
        for (let i = 0; i < length; i++) {
            out.push(i + 1);  
        }

        out = this.shuffle(out);

        return out;
    }

    shuffle(arr){
        //Shuffle a given array "arr"
        var m = arr.length, t, i;

        //While there are elements to shuffle
        while (m) {
            //Pick a remaining element
            i = floor(random() * m--);

            //Swap it with the current element
            t = arr[m];
            arr[m] = arr[i];
            arr[i] = t;
        }

        return arr;
    }

    ValidPos(num, pos){
        //given a number and a posistion return if the number can be placed there...
        var valid = true;

        //Check if empty...
        //if(this.board[pos[0]][pos[1]] != null) valid = false;

        //Check horizontally
        for (let i = 0; i < this.board.length; i++) {
           if(this.board[i][pos[1]] == num) valid = false; 
        }

        //Check vertically
        for (let j = 0; j < this.board.length; j++) {
            if(this.board[pos[0]][j] == num) valid = false; 
        }

        return valid;
    }
}