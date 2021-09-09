var PLAY = 1;
var END = 0;
var gameState = PLAY;


var rocket, rocketImg, flame, flameImg;
var plane, planeImg, planesGroup;
var bird, birdsImg, birdsGroup;
var helicopter, heliImg, helicoptersGroup;
var balloon, balloonImg, balloonsGroup;
var cloud,cloudsGroup,cloudImg1,cloudImg2,cloudImg3,cloudImg4,cloudImg5;
var explode, explodeImg;

var boundrybot, boundrylef, boundryrig, boundrytop;


var score = 100;
var fuel = 100;
var gameOverImg,restartImg

function preload(){

    rocketImg = loadAnimation("rocket_ship_03.png");

    birdImg1 = loadAnimation("bird_1a.png","bird_2b.png");
    birdImg2 = loadAnimation("bird_flip1a.png","bird_flip2b.png");
    heliImg = loadAnimation("heli_1.png","heli_2.png","heli_3.png")
    balloonImg = loadAnimation("balloon_03.png");

    flameImg = loadAnimation("Flame_6b.png","Flame_pop.png");
    explodeImg = loadAnimation("explode_1a.png","explode_2b.png","explode_3c.png");

    cloudImg1 = loadImage("Cloud_01.png");
    cloudImg2 = loadImage("Cloud_long.png");
    cloudImg3 = loadImage("Cloud_puffy.png");
    cloudImg4 = loadImage("Cloud_round.png");
    cloudImg5 = loadImage("Cloud_small.png");

    gameoverImg = loadImage("textGameOver_01.png");

}

function setup() {
 createCanvas(400,600);

    rocket = createSprite(200,200,50,50);
    rocket.scale = 0.03;
    rocket.addAnimation("rocket", rocketImg);
    rocket.debug = false;
    rocket.setCollider("circle",0,0,800);

    flame = createSprite(rocket.x, rocket.y+40, 10,10);
    flame.addAnimation("fire_flaming", flameImg);
    flame.scale = 0.25;
    flame.depth = rocket.depth -1;
    flame.visible = false;
    
    explode = createSprite(200,200,10,10);
    explode.addAnimation("exploding", explodeImg);
    explode.scale = 2;
    explode.depth = rocket.depth + 2;
    explode.visible = false;

    gameover = createSprite(200,250);
    gameover.addImage("ending", gameoverImg);
    gameover.depth = explode.depth + 1;
    gameover.scale = 0.9;
    gameover.visible = false;
 
    boundrybot = createSprite(-10,700,1500,40);
    boundrybot.visible = false;
    boundrylef = createSprite(-20,-10,10,1500);
    boundrylef.visible = false;
    boundryrig = createSprite(420,-10,10,1500);
    boundryrig.visible = false;
    boundrytop = createSprite(-10,-20,1500,10);
    boundrytop.visible = false;




    cloudsGroup = createGroup();
    birdsGroup = createGroup();
    helicoptersGroup = createGroup();
    balloonsGroup = createGroup();   
}

function draw() {
background(0,200,255);



if(gameState == PLAY){
  


  
    spawnClouds();   
    spawnBirds();
    spawnHelicopter();
    spawnBalloons();


    rocket.collide(boundrybot);
    rocket.collide(boundrylef);
    rocket.collide(boundryrig);
    rocket.collide(boundrytop);

      flame.x = rocket.x;
      flame.y = rocket.y +40;


      if(keyDown("left") || keyDown("right")){
        //nothing here :)
      } else {
        rocket.rotation = 0;
        flame.rotation = 0;
      }
      if(keyDown("left")){
        rocket.x = rocket.x - 3;
        flame.x = rocket.x + 15;
        rocket.rotation = -20;
        flame.rotation = -20;
     
    }
    if(keyDown("right")){
  
        rocket.x = rocket.x + 3;
        flame.x = rocket.x - 15;
        rocket.rotation = 20;
        flame.rotation = 20;
     
    }
    if(keyDown("space") && fuel > 0){
  
         rocket.velocityY = -10;
         flame.visible = true;

         //fuel = fuel - 1;
      
    } else {
        flame.visible = false;
    }

    if(keyDown("f")){
        fuel = fuel + 1;
    }

  
  rocket.velocityY = rocket.velocityY + 0.8;

  if(rocket.velocityY >= 0){
      score = score - 1;
  }
  if(rocket.velocityY <= 0){
      score = score + 2;
  }
  if(rocket.velocityY == 0){
      score = score + 1;
  }



  if(birdsGroup.isTouching(rocket) | helicoptersGroup.isTouching(rocket) | balloonsGroup.isTouching(rocket) | rocket.y > 650){
    gameState = END;
    
  }


    drawSprites();
    fill(0);
    textSize(20);
    text("Elevation: "+score+" ft",10,20);
    //textSize(15);
    //text("Fuel: "+fuel,10,40);


}//end of play

if(gameState == END){
  explode.x = rocket.x;
  explode.y = rocket.y;
  explode.visible = true;

  gameover.visible = true;



  rocket.velocityY = 0;
  cloudsGroup.setVelocityYEach(0);
  birdsGroup.setVelocityYEach(0);
  birdsGroup.setVelocityXEach(0);
  helicoptersGroup.setVelocityYEach(0);
  helicoptersGroup.setVelocityXEach(0);
  balloonsGroup.setVelocityYEach(0);
  balloonsGroup.setVelocityXEach(0);
  
  cloudsGroup.setLifetimeEach(-1);
  birdsGroup.setLifetimeEach(-1);
  helicoptersGroup.setLifetimeEach(-1);
  balloonsGroup.setLifetimeEach(-1);


  if(keyDown("r")){
    restart();
  }

  drawSprites();
  fill(0);
  textSize(20);
  text("Elevation: "+score+" ft",10,20);
  fill(100);
  textSize(20);
  text("Press r to play again!",120,300);

}// end of end

    
}// end of draw

function restart(){
  gameState = PLAY;
  score = 100;
  gameover.visible = false;
  explode.visible = false;
  rocket.x = 200;
  rocket.y = 200;
  cloudsGroup.destroyEach();
  birdsGroup.destroyEach();
  helicoptersGroup.destroyEach();
  balloonsGroup.destroyEach();


}



function spawnBirds(){//Spawn Birds
    if (frameCount % 120 === 0){

       var randie = Math.round(random(1,3));
       switch(randie) {
         case 1:   
    var bird = createSprite(-60,Math.round(random(-100,250)),10,40);
    bird.addAnimation("birds_flapping", birdImg2);
    bird.velocityX = 2;
    bird.velocityY = 2;
    bird.scale = 0.2;
    bird.depth = rocket.depth + 1;
    bird.lifetime = 600;
    bird.setCollider("rectangle",0,0,bird.width,bird.height);
    birdsGroup.add(bird);
                 break;
         case 2:   
    var bird = createSprite(460,Math.round(random(-100,250)),10,40);
    bird.addAnimation("birds_flapping", birdImg1);
    bird.velocityX = -2;
    bird.velocityY = 2;
    bird.scale = 0.2;
    bird.depth = rocket.depth + 1;
    bird.lifetime = 600;
    bird.setCollider("rectangle",0,0,bird.width,bird.height);
    birdsGroup.add(bird);
                 break;
       }         


    }
   }//end of spawn birds



function spawnHelicopter(){//Spawn Helicopter
    if (frameCount % 240 === 0){

       var randie = Math.round(random(1,4));
       switch(randie) {
         case 1:   
    var helicopter = createSprite(-60,Math.round(random(-50,250)),10,40);
    helicopter.addAnimation("helicopter", heliImg);
    helicopter.mirrorX(-1);
    helicopter.velocityX = 3;
    helicopter.velocityY = 2;
    helicopter.scale = 0.25;
    helicopter.depth = rocket.depth + 1;
    helicopter.lifetime = 800;
    helicopter.setCollider("rectangle",-50,0,500,200);
    helicoptersGroup.add(helicopter);
                 break;
         case 2:   
    var helicopter = createSprite(460,Math.round(random(-50,250)),10,40);
    helicopter.addAnimation("helicopter", heliImg);
    helicopter.velocityX = -3;
    helicopter.velocityY = 2;
    helicopter.scale = 0.25;
    helicopter.depth = rocket.depth + 1;
    helicopter.lifetime = 800;
    helicopter.setCollider("rectangle",50,0,500,200);
    helicoptersGroup.add(helicopter);
                 break;
       }         


    }
}//end of spawn helicopters


function spawnBalloons(){//Spawn Balloons
    if (frameCount % 280 === 0){

       var rando = Math.round(random(1,4));
       switch(rando) {
         case 1:   
    var balloon = createSprite(-60,Math.round(random(-100,250)),10,40);
    balloon.addAnimation("balloon_soar", balloonImg);
    balloon.velocityX = 1;
    balloon.velocityY = 2;
    balloon.scale = 0.06;
    balloon.depth = rocket.depth + 1;
    balloon.lifetime = 600;
    balloon.setCollider("rectangle",0,0,balloon.width,balloon.height);
    balloonsGroup.add(balloon);
                 break;
         case 2:   
    var balloon = createSprite(460,Math.round(random(-100,250)),10,40);
    balloon.addAnimation("balloon_soar", balloonImg);
    balloon.velocityX = -1;
    balloon.velocityY = 2;
    balloon.scale = 0.06;
    balloon.depth = rocket.depth + 1;
    balloon.lifetime = 600;
    balloon.setCollider("rectangle",0,0,balloon.width,balloon.height);
    balloonsGroup.add(balloon);
                 break;
       }         


    }
   }//end of spawn birds


function spawnClouds() {//Spawn Clouds
    if (frameCount % 60 === 0) {
      var cloud = createSprite(Math.round(random(0,400)),-20,40,10);
      var ran = Math.round(random(1,5));
      switch(ran) {
        case 1: cloud.addImage(cloudImg1);
                break;
        case 2: cloud.addImage(cloudImg2);
                break;
        case 3: cloud.addImage(cloudImg3);
                break;
        case 4: cloud.addImage(cloudImg4);
                break;
        case 5: cloud.addImage(cloudImg5);
                break;
        default: break;
      }

      cloud.scale = 0.7;
      cloud.velocityY = 1.8;
      cloud.lifetime = 600;
      cloud.depth = rocket.depth - 2;
      cloudsGroup.add(cloud);
    }
  }