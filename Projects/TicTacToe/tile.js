class Tile{
    constructor(position, height, width){
        this.position = position;
        this.height = height;
        this.width = width;
        this.marked = false;
        this.player = "NONE";
    }

    show(){
        if(this.isOver()){fill(100);}
        else{fill(255);}
        stroke(0);
        rectMode(CENTER);
        rect(this.position.x, this.position.y, this.width, this.height);
        var s = this.player;
        if(this.player == "NONE"){ s = " ";}
        textAlign(CENTER, CENTER);
        text(s, this.position.x, this.position.y);
    }

    isOver(){
        var out = false;
        var x = this.width * 0.5;
        var y = this.height * 0.5;
        if(mouseX > this.position.x - x && mouseX < this.position.x + x 
            && mouseY > this.position.y - y && mouseY < this.position.y + y){ out = true; }
        else { out = false; }
        return out;
    }

    update(player){
        var out = false;
        if(this.isOver() && !this.marked){ 
            this.player = player;
            this.marked = true;
            out = true;
        }
        else{ out = false;}
        return out;
    }
}