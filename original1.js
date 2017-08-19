var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
context.shadowBlur=100;
context.shadowColor="black";
var game = new Game();
var missile = new Missile();
var enemy = new Enemy();


// Game Constructor////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Game(){

this.width = canvas.width;
this.height = canvas.height;
this.keys = new KeyListener();


this.playerShip = new Ship(this.width /2 -79 ,690);
this.enemy = new Enemy();
}

Game.prototype.draw = function()
{
    context.clearRect(0, 0, this.width, this.height);
    context.fillRect(this.width, this.height, this.width, this.height);

    this.playerShip.draw(context);
    missile.draw(context);
    this.enemy.draw(context);



};


Game.prototype.update = function(){
    if (this.paused)
        return;

    if (this.keys.isPressed(39)) { // Right
         this.playerShip.x = Math.min(this.width - this.playerShip.width - 55, this.playerShip.x + this.playerShip.speed);
     } else if (this.keys.isPressed(37)) { // Left
         this.playerShip.x = Math.max(0, this.playerShip.x - this.playerShip.speed);
     }
    if (this.keys.isPressed(32)){
      missile.update();
    }
};

// Ship Constructor//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Ship(x,y){
  this.image = new Image();
  this.x = x;
  this.y = y;
  this.height = 130;
  this.width = 130;
  this.speed = 17;
  this.image.src = 'img/ship.png';
}

Ship.prototype.draw = function()
{
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
};

// Missile Constructor//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Missile(x,y){
  this.alive = false;
  this.image = new Image();
  this.image.src = 'img/missile.png';
  this.yv = 4;
  this.height = 100;
  this.width = 80;
}

Missile.prototype.update = function(){
  var that = this;
  var x =  setInterval(function(){
      that.y -= that.yv;
      if(that.y < -100){
        clearInterval(x);
      }
    },8);

    that.createNewMissile();

};

Missile.prototype.draw = function(){
  this.alive= true;
  context.drawImage(this.image,this.x, this.y, this.width, this.height);
};

Missile.prototype.createNewMissile = function(){

  this.x = game.playerShip.x + 25;
  this.y = game.playerShip.y - 55;
};


// Enemy Constructor//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Enemy(){
  this.image = new Image();
  this.image.src = 'img/ship2.png';
  this.x = 100;
  this.y = 100;
  this.height = 120;
  this.width = 120;
  this.speed = 10;

  Enemy.prototype.draw = function(){
    context.drawImage(this.image,this.x, this.y, this.width, this.height);
  };
}


// KeyListener Constructor//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function KeyListener() {
    this.pressedKeys = [];

    this.keydown = function(e) {
        this.pressedKeys[e.keyCode] = true;
    };

    this.keyup = function(e) {
        this.pressedKeys[e.keyCode] = false;
    };

    document.addEventListener("keydown", this.keydown.bind(this));
    document.addEventListener("keyup", this.keyup.bind(this));
}

KeyListener.prototype.isPressed = function(key)
{
    return this.pressedKeys[key] ? true : false;
};

KeyListener.prototype.addKeyPressListener = function(keyCode, callback)
{
    document.addEventListener("keypress", function(e) {
        if (e.keyCode == keyCode)
            callback(e);
    });
};

// MainLoop Constructor//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MainLoop(){
  game.update();
  game.draw();
  setTimeout(MainLoop, 20);
}


MainLoop();
