var PLAY = 1;
var END = 0;
var INTRO=2;
var gameState =INTRO;

var monkey , monkey_running, monkeyStop;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var time=0
var score=0
var lives=3
var ground, invisibleGround, groundImage
var sun, sun_ani
var over, overImg
var restart, restartImg
var introImg, intro
var introBImg, introB

function preload(){
  
  
  monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  sun_ani = loadAnimation("sun1.png", "sun2.png");
  groundImage = loadImage("ground.png");
  
  overImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
monkeyStop = loadAnimation("sprite_0.png");
  
  introImg = loadImage("intro.png");
  
  introBImg=loadImage("introB.png");
 
}



function setup() {
  createCanvas(600, 300);
  
monkey = createSprite(80,255,20,20);
  monkey.addAnimation("move", monkey_running);
  monkey.scale = 0.1;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();

  
  time=0;
  monkey.setCollider("circle", 0, 0, 50);
  monkey.debug=false;
  
   ground = createSprite(200,316,600,30);
  ground.addImage("ground", groundImage);
  ground.scale=15;
  ground.x = ground.width /2;
  
  sun = createSprite(40, 40);
  sun.addAnimation("shine", sun_ani);
  sun.scale=0.6;
  
  invisibleGround = createSprite(200, 270, 300, 10);
  invisibleGround.visible=false;
  
  over = createSprite(300, 120);
  over.addImage(overImg);
  
  restart = createSprite(300, 175);
  restart.addImage(restartImg);
  
   intro = createSprite(300, 130);
  intro.addImage(introImg);
  intro.scale=0.45;
  
  introB = createSprite(300, 275);
  introB.addImage(introBImg);
  introB.scale=0.4;
  
}


function draw() {
  
  background("skyblue");
  
  if(gameState===INTRO){
    intro.visible=true;
    monkey.visible=false;
    over.visible=false;
    restart.visible=false;
    ground.visible=false;
    introB.visible=true;
    if(mousePressedOver(introB)){
      gameState=PLAY;
    }
  }
  
  if(gameState===PLAY){
    
    fill("black");
  textSize(20);
  text("Survival Time: "+ time, 425,30);
  fill("yellow")
  text("Banana Count: "+score, 425, 60);
  
    
    time = time + Math.round((Math.round(World.frameRate/60))*0.5);
  ground.velocityX = -(2 + time/200);
    
    over.visible=false;
    restart.visible=false;
    monkey.visible=true;
    ground.visible=true;
    introB.visible=false;
    intro.visible=false;
    
    if (ground.x <0){
      ground.x = ground.width/2;
    }
    
     
  if(keyDown("space")&&monkey.y>=255){
    monkey.velocityY = -17;
  }
  if(keyDown("up")&&monkey.y>=255){
    monkey.velocityY=-13;
  }
    
    if(monkey.isTouching(FoodGroup)){
    score=score+1;
    FoodGroup.destroyEach();
  }
    
     time = time + Math.round((Math.round(World.frameRate/60))*0.5);
  ground.velocityX = -(2 + time/200);
    
      spawnBanana();
  spawnObstacles();
    
    if(monkey.isTouching(obstacleGroup)){
      obstacleGroup.destroyEach();
      gameState=END;
    }
    
  }
  if(gameState===END){
    
    over.visible=true;
    restart.visible=true;
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.visible=false;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    
    if(mousePressedOver(restart)){
      gameState=INTRO;
      time=0;
      score=0;
    }
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);
 
  console.log(monkey.y);
  
 drawSprites();
  
}

function spawnObstacles(){
  if(frameCount%130===0){
    var obstacle = createSprite(600, 265);
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.12;
    obstacle.velocityX=ground.velocityX;
    obstacle.lifetime=250;
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana(){
  var rand = Math.round(random(120, 200));
  if(frameCount%300===0){
    var banana = createSprite(600, rand);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.lifetime=250;
    banana.velocityX=ground.velocityX;
    FoodGroup.add(banana);
  }
}








