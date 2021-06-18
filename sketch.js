var Axe,Tree,Pollu,Back,gameover,sound,music;
var gameState = 1;
var treeG,PolluG;
var score = 0;

function preload(){
  Axe = loadImage("Axe.png");
  Tree = loadImage("Tree.jfif");
  Back = loadImage("BackgroundImg.jfif");
  Pollu = loadImage("PollutionImg.jfif");
  gameover = loadImage("gameover.png");
  sound = loadSound("knifeSwoosh.mp3");
  music = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(800,400);
  back = createSprite(500,200);
  back.addImage(Back);
  back.scale = 4;
  

  axe = createSprite(50,250);
  axe.addImage(Axe);
  axe.scale = 0.5;

  gameOver = createSprite(400,200);
  gameOver.addImage(gameover);

  treeG = new Group();
  PolluG = new Group();

}

function draw() {
  background("White");  
  drawSprites();
  if(gameState === 1){
    back.velocityX = -(6 + 2*score/150)
    gameOver.visible = false;
    if(back.x < 0){
      back.x = back.width/2;
    }
    fill(255,0,0);
    textSize(32);
    text("Score : " + score,600,50);
    if(axe.isTouching(PolluG)){
      score += 1;
      PolluG.destroyEach();
      sound.play();
    }

    if(axe.isTouching(treeG)){
      gameState = 0;
      music.play();
      gameOver.visible = true;
      
    }
    axe.x = World.mouseX;
    axe.y = World.mouseY;
    spawnTrees();
    spawnPollution();
  }
  else if(gameState === 0){
    if(keyDown("Up_Arrow")){
      reset();
      console.log("Game Over!!!!");
    }
      textSize(40);
      fill("red");
      text("OH NO YOU CHOPPED A TREE!!!",100,300);
      treeG.setLifetimeEach(-1);
      PolluG.setLifetimeEach(-1);
      treeG.setVelocityXEach(0);
      PolluG.setVelocityXEach(0);
      back.velocityX = 0;
  }
}
function spawnTrees(){
  if(frameCount % 100 === 0){
    var trees = createSprite(Math.round(random(250,750)),Math.round(random(100,300)),10,10);
    trees.addImage(Tree);
    treeG.add(trees);
    trees.LifeTime = 200;
    trees.velocityX = -5;
    trees.scale = 0.4;
  }
}

function spawnPollution(){
  if(frameCount % 253 === 0){
    var pollu = createSprite(Math.round(random(250,750)),Math.round(random(100,300)),10,10);
    pollu.addImage(Pollu);
    PolluG.add(pollu);
    pollu.LifeTime = 200;
    pollu.velocityX = -5;
    pollu.scale = 0.4;
  }
}
function reset(){
  gameState = 1;
  gameOver.visible = false;
  treeG.destroyEach();
  PolluG.destroyEach();
  score = 0;
}