class Board {
    constructor(topLeft, tileWidth, tileHeight, strkWeight){
        this.topLeft = topLeft;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.strkWeight = strkWeight;

        this.board = this.CreateBoard();
        this.RandomizeBoard(1);

        this.maxDepth = 16;

        this.Solver(0);
        /*for (let i = 0; i < this.maxDepth; i++) {
            this.Solver();
        }*/
    }

    CreateBoard(){
        var out = new Array(9);
        for (let i = 0; i < 9; i++) {
            out[i] = new Array(9);
        }

        //For DEMO only, result does not follow rules of Sudoku
        for (let i = 0; i < out.length; i++) {
            for (let j = 0; j < out[0].length; j++) {
                out[i][j] = 0;
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
                var char = this.board[i][j];
                if(char == null) char = "";
                text(char, this.topLeft + i * this.tileWidth + this.tileWidth * 0.27, this.topLeft + j * this.tileHeight + this.tileHeight * 0.7)
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
        //if(this.board[pos[0]][pos[1]] != (0 || null)) valid = false;

        //Check horizontally
        for (let i = 0; i < this.board.length; i++) {
           if(this.board[i][pos[1]] == num) valid = false; 
        }

        //Check vertically
        for (let j = 0; j < this.board.length; j++) {
            if(this.board[pos[0]][j] == num) valid = false; 
        }

        //Check box
        var xMin = floor(pos[0] / 3) * 3;
        var yMin = floor(pos[1] / 3)  * 3;
        for(let i = xMin; i < xMin + 3; i++){
            for (let j = yMin; j < yMin + 3; j++) {
                if(this.board[i][j] == num) valid = false;
            }
        }

        return valid;
    }

    Solver(depth){
        console.log(depth);
        //Loop through the posistions
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {

                if(this.board[i][j] == (null || 0)){
                    var possibleNumbers = this.GenerateRandomNumList(9);
                    for (let n = 0; n < 9; n++) {
                        var selected = possibleNumbers.pop();

                        if(this.ValidPos(selected, [i,j])){
                            this.board[i][j] = selected;
                            this.Solver(depth + 1);
                            //if(depth > 0) this.board[i][j] = 0;
                        }
                    }
                    return;
                }
            }
        }
        return;
    }
}