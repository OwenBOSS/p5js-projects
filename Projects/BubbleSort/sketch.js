//Props
let windowScale = 0.97;
let columnWidth = 1;
let bgColor;
let columnColor;


//Member vars
let canvas;
let list = [];
let numberOfColumns;
let bubble;


function setup() {
  // put setup code here
  bgColor = color(50, 100, 50);
  columnColor = color(50, 200, 50);

  //canvas = document.getElementById("canvas");
  resizeCanvas(windowScale * windowWidth, windowScale * windowHeight);
  bubble = new ListObject(columnWidth, columnColor, windowScale, windowHeight, windowWidth); 
}

function draw() {
  // put drawing code here
  background(bgColor);
  bubble.BubbleSort(); 
  bubble.Show();
}

function windowResized() {
  resizeCanvas(windowScale * windowWidth, windowScale * windowHeight);
}