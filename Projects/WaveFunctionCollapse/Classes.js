class Grid{
    constructor(width, height, tileSize, bgColor, fgColor, frameRate){
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.bgColor = bgColor;
        this.fgColor = fgColor;
        this.frameRate = frameRate;

        this.grid = this.CreateGrid();
        this.frames = 0;
    }

    CreateGrid(){
        var out = new Array(this.width);
        for(let i = 0; i < out.length; i++){
            out[i] = new Array(this.height);
        }

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                out[i][j] = new Tile(i, j, this.tileSize, this.bgColor, this.fgColor);
            }      
        }
        return out;
    }

    Show(){
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.grid[i][j].Show();
            }
        }
    }

    Update(numOfUpdates){
        for(let round = 0; round < numOfUpdates; round++){

            this.frames++;
            if(this.frames > this.frameRate){
                this.frames = 0;
            }
            else return;

            //Analyze current state
            var minimumEtropyLevel = 4;
            var totalEntropyLevel = 0;
            for(let i= 0; i < this.width; i++){
                for(let j = 0; j < this.height; j++){
                    var tile = this.grid[i][j];
                    totalEntropyLevel = totalEntropyLevel + tile.Entropy;
                    if(tile.Entropy < minimumEtropyLevel && tile.Entropy > 0){
                        minimumEtropyLevel = tile.Entropy;
                    }
                }
            }

            
            //If the total entropy is zero there is nothing to do
            if(totalEntropyLevel == 0) {
                this.Finished();
                return;
            }


            //Get list of minimum entropy tiles
            var minimumEntropyTiles = [];
            minimumEntropyTiles.length = 0;
            for(let i= 0; i < this.width; i++){
                for(let j = 0; j < this.height; j++){
                    var tile = this.grid[i][j];
                    if(tile.Entropy == minimumEtropyLevel){
                        minimumEntropyTiles.push(tile);
                    }
                }
            }


            //Randomly select a tile from the minimum options
            var selectedMinimumEntropyTile = minimumEntropyTiles[floor(random(0, minimumEntropyTiles.length))];
            //selectedMinimumEntropyTile = this.grid[8][0]; //For testing


            //Pull neihboor sockets
            var newSocket = [-1, -1, -1, -1];
            //Top
            if(selectedMinimumEntropyTile.j > 0) newSocket[0] = this.grid[selectedMinimumEntropyTile.i][selectedMinimumEntropyTile.j - 1].sockets[2];
            //Right
            if(selectedMinimumEntropyTile.i < this.width - 1) newSocket[1] = this.grid[selectedMinimumEntropyTile.i + 1][selectedMinimumEntropyTile.j].sockets[3];
            //Bottom
            if(selectedMinimumEntropyTile.j < this.height - 1) newSocket[2] = this.grid[selectedMinimumEntropyTile.i][selectedMinimumEntropyTile.j + 1].sockets[0];
            //Left
            if(selectedMinimumEntropyTile.i > 0) newSocket[3] = this.grid[selectedMinimumEntropyTile.i - 1][selectedMinimumEntropyTile.j].sockets[1];
            //Set sockets
            selectedMinimumEntropyTile.sockets = newSocket;


            //Set NULL sockets (-1) to 0 or 1
            for(let i = 0; i < 4; i++){
                if(selectedMinimumEntropyTile.sockets[i] == -1) selectedMinimumEntropyTile.sockets[i] = floor(random(0,3));
            }
            //selectedMinimumEntropyTile.sockets = [1,1,1,1];//For testing
            //Ensure that there are at least (2) paths



            //Push selected tile sockets to neighboors and reduce entropy of neighboors
            //Selected tile has entropy of 0
            selectedMinimumEntropyTile.SetEntropyToZero();
            //Top
            if(selectedMinimumEntropyTile.j > 0) {
                var tile = this.grid[selectedMinimumEntropyTile.i][selectedMinimumEntropyTile.j - 1];
                tile.sockets[2] = selectedMinimumEntropyTile.sockets[0];
                tile.ReduceEntropy();
            }
            //Right
            if(selectedMinimumEntropyTile.i < this.width - 1) {
                var tile = this.grid[selectedMinimumEntropyTile.i + 1][selectedMinimumEntropyTile.j];
                tile.sockets[3] = selectedMinimumEntropyTile.sockets[1];
                tile.ReduceEntropy();
            }
            //Bottom
            if(selectedMinimumEntropyTile.j < this.height - 1) {
                var tile = this.grid[selectedMinimumEntropyTile.i][selectedMinimumEntropyTile.j + 1];
                tile.sockets[0] = selectedMinimumEntropyTile.sockets[2];
                tile.ReduceEntropy();
            }
            //Left
            if(selectedMinimumEntropyTile.i > 0) {
                var tile = this.grid[selectedMinimumEntropyTile.i - 1][selectedMinimumEntropyTile.j];
                tile.sockets[1] = selectedMinimumEntropyTile.sockets[3];
                tile.ReduceEntropy();
            }


            //console.log(minimumEtropyLevel);
        }
    }

    Percolate(){
        var randomSocket = [0,0,0,0];
        for(let i = 0; i < 4; i++){
            randomSocket[i] = floor(random(0, 2));
        }
        this.grid[floor(random(0, this.width))][floor(random(0, this.height))].sockets = randomSocket;
        loop();
    }

    Finished(){
        console.log("DONE");
        for(let i= 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++){
                this.grid[i][j].fgColor = color(100, 180, 100);
            }
        }
        this.EnforceConnections();

        noLoop();
        redraw();
    }

    EnforceConnections(){
        //To do: make this random
            //Rename - this just enforces sockets
        var allTiles = [];
        for(let i= 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++){
                allTiles.push(this.grid[i][j]);
            }
        }

        var randInt = floor(random(0, allTiles.length));

        for(let i= 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++){
                var selectedMinimumEntropyTile = this.grid[i][j];
                //Top
                if(selectedMinimumEntropyTile.j > 0) this.grid[selectedMinimumEntropyTile.i][selectedMinimumEntropyTile.j - 1].sockets[2] = selectedMinimumEntropyTile.sockets[0];
                //Right
                if(selectedMinimumEntropyTile.i < this.width - 1) this.grid[selectedMinimumEntropyTile.i + 1][selectedMinimumEntropyTile.j].sockets[3] = selectedMinimumEntropyTile.sockets[1];
                //Bottom
                if(selectedMinimumEntropyTile.j < this.height - 1) this.grid[selectedMinimumEntropyTile.i][selectedMinimumEntropyTile.j + 1].sockets[0] = selectedMinimumEntropyTile.sockets[2];
                //Left
                if(selectedMinimumEntropyTile.i > 0) this.grid[selectedMinimumEntropyTile.i - 1][selectedMinimumEntropyTile.j].sockets[1] = selectedMinimumEntropyTile.sockets[3];

                selectedMinimumEntropyTile.bgColor = color(190, 65, 65);
            }
        }
    }
}

class Tile{
    constructor(x, y, size, bgColor, fgColor){
        this.x = x + 1;
        this.y = y + 1;
        this.i = x;
        this.j = y;
        this.size = size;
        this.bgColor = bgColor;
        this.fgColor = fgColor;
        this.sockets = [-1, -1, -1, -1];
        this.Entropy = 4;

        this.CEnt4 = color(200);
        this.CEnt3 = color(150);
        this.CEnt2 = color(100);
        this.CEnt1 = color(50);
        this.CEnt0 = color(0);

        this.bgColor = this.CEnt4;
    }


    Show(){
        rectMode(CENTER);
        
        //Draw the bg
        fill(this.bgColor);
        stroke(255);
        rect(this.x * this.size * 0.5, this.y * this.size * 0.5, this.size * 0.5);

        for (let i = 0; i < this.sockets.length; i++) {
            const element = this.sockets[i];
            if(element > 0){
                fill(this.fgColor);
                noStroke();
                switch (i) {
                    case 0:
                        rect(this.x * this.size * 0.5, this.y * this.size * 0.5 - this.size * 0.125, this.size * 0.1, this.size * 0.25);
                        break;
                    case 1:
                        rect(this.x * this.size * 0.5 + this.size * 0.125, this.y * this.size * 0.5, this.size * 0.25, this.size * 0.1);
                        break;
                    case 2:
                        rect(this.x * this.size * 0.5, this.y * this.size * 0.5 + this.size * 0.125, this.size * 0.1, this.size * 0.25);
                        break;
                    case 3:
                        rect(this.x * this.size * 0.5 - this.size * 0.125, this.y * this.size * 0.5, this.size * 0.25, this.size * 0.1);
                        break;
                }
                
            }
        }
    }

    ReduceEntropy(){
        this.Entropy = this.Entropy - 1;
        if(this.Entropy < 0) this.Entropy = 0;
        this.UpdateColor();
    }

    SetEntropyToZero(){
        this.Entropy = 0;
        this.UpdateColor();
    }

    UpdateColor(){
        switch(this.Entropy){
            case 4:
                this.bgColor = this.CEnt4;
                break;
            case 3:
                this.bgColor = this.CEnt3;
                break;
            case 2:
                this.bgColor = this.CEnt2;
                break;
            case 1:
                this.bgColor = this.CEnt1;
                break;
            case 0:
                this.bgColor = this.CEnt0;
                break;
        }
    }
}