//Props
var fr = 60;
var canvasHeight = 500;
var canvasWidth = 500;
var offset = 100;

//Member Vars
let grid;



function setup() {
  // put setup code here
    createCanvas(canvasWidth, canvasHeight);
    grid = createGrid();
}

function draw() {
  // put drawing code here
  for(i=0; i<3; i++){
    for(j=0; j < 3; j++){
      grid[i][j].show();
    }
  }
}

function createGrid(){
  var num = 0;
  let list = new Array(3);
  for(i=0; i<3; i++){
    list[i]=new Array(3);
    for(j=0; j < 3; j++){
      list[i][j] = new Tile(createVector(offset + i * 50, offset + j* 50), 50, 50);
      num++;
    }
  }
  console.log(num);
  return list;
}