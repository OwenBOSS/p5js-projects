class ListObject{
    constructor(columnWidth, columnColor, windowScale, windowHeight, windowWidth){
        this.numberOfColumns = floor((windowScale * windowWidth) / columnWidth);
        this.columnWidth = columnWidth;
        this.columnColor = columnColor;
        this.windowScale = windowScale;
        this.windowHeight = windowHeight;
        this.windowWidth = windowWidth;
        this.list = [];
        for(var i = 0; i < this.numberOfColumns; i++){
            var height = random(0, this.windowScale * this.windowHeight);
            var element = new ListElement(height);
            this.list.push(height);
        }
    }

    Show(){
        noStroke();
        rectMode(CORNERS);
        fill(this.columnColor);
        for(var i = 0; i < this.numberOfColumns; i++){
            rect(i * this.columnWidth, this.windowHeight, i * this.columnWidth + this.columnWidth, this.list[i])
        }
    }

    BubbleSort(){
        for(var i = 0; i < this.list.length - 1; i++){
            if(this.list[i] > this.list[i + 1]){
                var temp = this.list[i + 1];
                this.list[i + 1] = this.list[i];
                this.list[i] = temp;
            }
        }
    }
}

class ListElement{
    constructor(height){
        this.height = height;
        this.timeStationary = 0;
    }

}