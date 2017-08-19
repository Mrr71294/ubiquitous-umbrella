var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
context.shadowBlur=100;
context.shadowColor="black";
var game = new Game();
// var missile = new Missile();
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

    this.playerShip.draw(context);
    this.playerShip.stockedMissiles[0].draw(context);
    this.enemy.draw(context);



};


Game.prototype.update = function(){

    if (this.keys.isPressed(37)) { // Left
         this.playerShip.updateLeft();
     } else if (this.keys.isPressed(39)) { // Right
         this.playerShip.updateRight();
     }
     if (this.keys.isPressed(32)){
       this.playerShip.stockedMissiles[0].update();
     }
};





    // if (missile.vx > 0) {
    //   if (this.enemy.x <= missile.x + missile.width && this.enemy.x > missile.x - missile.vx + missile.width){
    //       var collisionDiff = missile.x + missile.width - this.enemy.x;
    //       var k = collisionDiff/missile.vx;
    //       var y = missile.yv*k + (missile.y - missile.yv);
    //       if (y >= this.enemy.y && y + missile.height <= this.enemy.y + this.enemy.height) {
    //           // collides with right paddle
    //           missile.x = this.enemy.x - missile.width;
    //           missile.y = Math.floor(missile.y - missile.yv + missile.yv*k);
    //           missile.vx = -missile.vx;
    //       }
    //   }
    // }


// Pool Constructor////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Custom Pool object. Holds Bullet objects to be managed to prevent garbage collection.
 */

// Ship Constructor//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Ship(x,y){
  this.image = new Image();
  this.image.src = 'img/ship.png';
  this.x = x;
  this.y = y;
  this.height = 130;
  this.width = 130;
  this.speed = 17;
  this.stockedMissiles = [];
  missile1 = new Missile();
  missile2 = new Missile();
  missile3 = new Missile();
  missile4 = new Missile();
  missile5 = new Missile();
  this.stockedMissiles.push(missile1,missile2,missile3,missile4,missile5);
  this.firedMissiles = [];
}

Ship.prototype.draw = function(){
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
};

Ship.prototype.updateRight = function(){
  game.playerShip.x = Math.min(game.width - game.playerShip.width - 55, game.playerShip.x + game.playerShip.speed);
};

Ship.prototype.updateLeft = function(){
  game.playerShip.x = Math.max(0, game.playerShip.x - game.playerShip.speed);
};




// Missile Constructor//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Missile(x,y){
  this.alive = true;
  this.image = new Image();
  this.image.src = 'img/missile.png';
  this.x = x;
  this.y = y;
  this.yv = 4;
  this.height = 100;
  this.width = 80;
}

Missile.prototype.draw = function(){
  if(this.alive === true){
    context.drawImage(this.image,this.x, this.y, this.width, this.height);
  }
  else if(this.alive === false){
    context.drawImage(this.image,this.x, this.y, this.width, this.height);
  }

};

Missile.prototype.update = function(){
  console.log(this);
  if(this.alive === true){
    // firedMissile = game.playerShip.stockedMissiles.splice(0,1)[0];
    // game.playerShip.firedMissiles.push(firedMissile);
    console.log(game.playerShip.stockedMissiles);
    this.x = game.playerShip.x + 25;
    this.y = game.playerShip.y - 55;
    var self = this;
    var x =  setInterval(function(){
        self.y -= self.yv;
        if(self.y < +100){
          clearInterval(x);
          // self.alive = false;
        }
      },10);
    }
    console.log(this);
    // if(this.alive === false){
    //   console.log(this);
    //   reloadingMissile = game.playerShip.firedMissiles.splice(0,1)[0];
    //   game.playerShip.stockedMissiles.push(reloadingMissile);
    // }




//     that.createNewMissile();
//
// };
//
//
// Missile.prototype.createNewMissile = function(){
//
//   this.x = game.playerShip.x + 25;
//   this.y = game.playerShip.y - 55;
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
