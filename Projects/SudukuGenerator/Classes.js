class Board {
    constructor(topLeft, tileWidth, tileHeight, strkWeight){
        this.topLeft = topLeft;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.strkWeight = strkWeight;

        this.board = this.CreateBoard();
    }

    CreateBoard(){
        var out = new Array(9);
        for (let i = 0; i < 9; i++) {
            out[i] = new Array(9);
        }
        return out;
    }

    ShowBoard(){
        //Set drawing style
        noFill();
        strokeWeight(this.strkWeight);
        stroke(200);
        rectMode(CORNER);

        //Loop through each cell in the matrix
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                //Draw grid
                rect(this.topLeft + i * this.tileWidth, this.topLeft + j * this.tileHeight, this.tileWidth, this.tileHeight);

                //Draw contents
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
            case 1:
                
                break;
        }
    }
}