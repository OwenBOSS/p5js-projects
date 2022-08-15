//Props
var size = 1;
var step = 1000000;

//Member vars
var ant;
var grid;
var img;


function setup() {
  // put setup code here
  //frameRate(10);
  var width = windowWidth * .98;
  var height = windowHeight * .94;
  resizeCanvas(width, height);
  //img = new p5.Image(width, height);

  grid = new Grid(width, height, size);
  ant = new Ant(0, grid, size - 2, color(200, 100, 100), step, img);

  //grid.Show();

  //ant.RandomizeImg();
  //image(img, 0, 0);
}

function draw() {
  // put drawing code here
  //clear();
  ant.Move();
  ant.Show();
}