
var monkey, monkey_running, monkey_collided;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup;
var ground, invisibleGround;

var score=0;
var survivalTime=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 
 monkey_collided = loadAnimation("sprite_monkey.collided.png");
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  
  monkey = createSprite(80,251,5,5);
  monkey.addAnimation("moving",monkey_running);                  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.1;
  
  ground = createSprite(300,294,1200,13);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  
  //invisibleGround = createSprite(300,395,900,5);
  //invisibleGround.visible = false;
  
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();

monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false
  obstacles.debug = false
}


function draw() {
 background("white");
    
          
     stroke("black");
     textSize(20);
     fill("black");
     
   text("SurvivalTime:"+Math.round(survivalTime),100,50);

   
  
   if(gameState === PLAY){
      
     survivalTime=survivalTime+1/10;
          console.log(survivalTime);
     
    if(keyDown("space")&& monkey.y>=255) {
      monkey.velocityY = -15;
       
       
    }
      
    monkey.velocityY = monkey.velocityY + 0.8;
     
    monkey.collide(ground);
   
    bananas();
     
    obstacles();
     
      
   if (ground.x < 0){
      ground.x = ground.width/2;
    } 
  
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END; 
     }
  }
  
  else if (gameState === END) {
    
   ground.velocityX = 0;
   monkey.velocityY = 0;
   //monkey_running = false;
          
   obstaclesGroup.setLifetimeEach(-1);
   bananaGroup.setLifetimeEach(-1);
     
   obstaclesGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0); 
    
    
    monkey.changeAnimation("collided",monkey_collided);
               
  }
  
  
  drawSprites();
}

function bananas(){
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,150,10,10);
    banana.y = Math.round(random(80,180));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
  }
  
    
  
  
}

function obstacles(){
  if (frameCount % 180 === 0){
   var obstacle = createSprite(600,270,5,5);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.1;
   obstacle.velocityX = -6;
   obstacle.lifetime = 120;
   
   obstaclesGroup.add(obstacle);
  }
}

