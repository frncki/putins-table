var GRAVITY = 0;
var FLAP = 0;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var MOVE_Y;
var bird;
var pipes;
var gameOver;

function setup() {
  createCanvas(400, 600);

  MOVE_Y = height/6;

  bird = createSprite(width/2, height/2, 40, 40);
  bird.rotateToDirection = true;
  bird.velocity.x = 4;
  bird.setCollider('circle', 0, 0, 20);

  pipes = new Group();
  gameOver = true;
  updateSprites(false);

  camera.position.y = height/2;
}

function draw() {

  if(gameOver && keyWentDown('x'))
    newGame();

  if(!gameOver) {
    bird.velocity.y += GRAVITY;

    if(bird.position.y<0)
      bird.position.y = 0;

    if(bird.position.y+bird.height/2 > GROUND_Y)
      die();

    if(bird.overlap(pipes))
      die();

    //spawn pipes
    if(frameCount%60 == 0) {
      var pipeH = random(50, 300);
      var pipe = createSprite(bird.position.x + width, GROUND_Y-pipeH/2+1+100, 80, pipeH);
      pipes.add(pipe);

      //top pipe
      if(pipeH<200) {
        pipeH = height - (height-GROUND_Y)-(pipeH+MIN_OPENING);
        pipe = createSprite(bird.position.x + width, pipeH/2-100, 80, pipeH);
        pipe.mirrorY(-1);
        pipes.add(pipe);
      }
    }

    //get rid of passed pipes
    for(var i = 0; i<pipes.length; i++)
      if(pipes[i].position.x < bird.position.x-width/2)
        pipes[i].remove();
  }

  camera.position.x = bird.position.x + width/4;

  background(247, 134, 131);
  camera.off();
  camera.on();

  drawSprites(pipes);
  drawSprite(bird);
}

function die() {
  updateSprites(false);
  gameOver = true;
}

function newGame() {
  pipes.removeSprites();
  gameOver = false;
  updateSprites(true);
  bird.position.x = width/2;
  bird.position.y = height/2;
  bird.velocity.y = 0;
}

function mousePressed() {
  if(gameOver)
    newGame();
  bird.velocity.y = FLAP;
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === 87) { // W key
    bird.position.y -= MOVE_Y;
  } else if (keyCode === DOWN_ARROW || keyCode === 83) { // S key
    bird.position.y += MOVE_Y;
  }
}
