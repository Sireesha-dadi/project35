
var balloon,database;
var position;



function preload(){
  bgImg=loadImage("Hot Air Ballon-01.png");
  balloonImg=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");

}

function setup() {
  database=firebase.database();
  createCanvas(500,500);
  balloon= createSprite(250, 250, 50, 50);
  balloon.addAnimation("flying",balloonImg);
  balloon.scale=0.5;

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);


}

function draw() {
  background(bgImg); 
  if(position !==undefined){ 
  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    balloon.scale=balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10);
    balloon.scale=balloon.scale+0.01;
  }

  }
  drawSprites();

  fill(0);
  stroke("white");
  textSize(30);
  text("**use arrow keys to move the balloon",50,50);
}

function readPosition(data){
  position=data.val();
  console.log(position.x);
  balloon.x=position.x;
  balloon.y=position.y;

}
function writePosition(x,y){
  database.ref('balloon/position').set({
    'x' : position.x + x,
    'y' : position.y + y
  })
}

function showError(){
  console.log("Error in writing to the database");
}