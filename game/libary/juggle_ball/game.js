var version ='0.0.5';
var is_playing = false;
init();
function init()
{
  background_canvas = document.getElementById('background_canvas');
  background_ctx = background_canvas.getContext('2d');
  main_canvas = document.getElementById('main_canvas');
  main_ctx = main_canvas.getContext('2d');
 
  document.addEventListener("keydown", key_down, false);
  document.addEventListener("keyup", key_up, false);
 
  requestaframe = (function() {
                return window.requestAnimationFrame     ||
                  window.webkitRequestAnimationFrame    ||
                  window.mozRequestAnimationFrame       ||
                  window.oRequestAnimationFrame         ||
                  window.msRequestAnimationFrame        ||
                  function (callback) {
                    window.setTimeout(callback, 1000 / 60)
                  };
  })();
 
  player = new Player();
  asteroids = new Array(); //normal enemies (brown) instead of the old enemys
  enemies = new Array();
  bullets = new Array();
  //siceX = 800;
  //siceY = 600;
  var subtractorX = 30;
  var subtractorY = 100;
  siceX = window.screen.availWidth - subtractorX;
  siceY = window.screen.availHeight - subtractorY;

  background_canvas.width = window.screen.availWidth - subtractorX;
  background_canvas.height = window.screen.availHeight - subtractorY;
  main_canvas.width = window.screen.availWidth - subtractorX;
  main_canvas.height = window.screen.availHeight - subtractorY;

  load_media();
}
function load_media()
{
  main_sprite = new Image();
  main_sprite.src = 'images/main_sprite.png';

  collusion_sound = new Audio(); // sound for shooting (player)
  collusion_sound.src = 'sounds/collusion.wav'
  collusion_sound.autobuffer = true;
}
function mouse(e)
{
  this.x = e.pageX - document.getElementById('game_object').offsetLeft;
  this.y = e.pageY - document.getElementById('game_object').offsetTop;
  document.getElementById('x').innerHTML = this.x;
  document.getElementById('y').innerHTML = this.y;
}
 
function Player()
{
  this.drawX = 360;
  this.drawY = 425;
  this.speed = 8;
  this.srcX = 0;
  this.srcY = 96;
  this.width = 32;
  this.height = 32;
  this.is_downkey = false;
  this.is_upkey = false;
  this.is_leftkey = false;
  this.is_rightkey = false;
  this.is_skey = false;
}
Player.prototype.draw = function()
{
  this.check_keys();
    main_ctx.drawImage(main_sprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY,this.width,this.height);
    if (this.drawX > siceX)
    {
      this.drawX = -this.width;
    }
    if (this.drawX < 0 - this.width)
    {
      this.drawX = siceX;
    }
    if (this.drawY > siceY)
    {
      this.drawY = siceY - 1;
    }
    if (this.drawY <= 0)
    {
      this.drawY = 0;
    }
    
};
Player.prototype.check_keys = function()
{
  if (this.is_downkey == true)
    this.drawY += this.speed;
  if (this.is_upkey == true)
    this.drawY -= this.speed;
  if (this.is_leftkey == true)
    this.drawX -= this.speed;
  if (this.is_rightkey == true)
    this.drawX += this.speed;
  if (this.is_skey == true)
    spawn_asteroid(1);
}	


function Asteroid()
{
  this.drawX = siceX * 0.5;
  this.drawY = siceY * 0.25;
  this.speed = 0;
  this.rlspeed = 3;
  this.srcX = 0;
  this.srcY = 0;
  this.width = 96;
  this.height = 96;
  this.touched = false;
  this.first_touched = false;
  this.i = 0;
}
Asteroid.prototype.draw = function()
{
  this.ai();
    main_ctx.drawImage(main_sprite, this.srcX, this.srcY, 96, 96, this.drawX, this.drawY,this.height,this.width);
 
 if(this.first_touched == false)
        {
          if (this.drawX <= player.drawX + this.width * 0.5 && this.drawX + this.width * 0.5 >= player.drawX &&
              this.drawY <= player.drawY + this.height * 0.5 && this.drawY + this.height * 0.5 >= player.drawY)
              {
              this.speed = Math.round(Math.random() * 2 + 1);
              this.first_touched = true;
              }
        }
  else   if (this.drawX <= player.drawX + player.width && this.drawX + this.width >= player.drawX &&
              this.drawY <= player.drawY + player.height && this.drawY + this.height >= player.drawY)

            this.touched = true;
      else
            this.touched = false;
     
  if (this.touched == false)
  {
    if (this.i >= 15 && this.i <= 20)
      { 
        this.speed += 0.25;
        this.i++;
      }
    else
      {
        this.speed += 0.1;
        this.i++;       
      }
  }
  else
  {
    if (player.is_leftkey == true)
          this.rlspeed -= 0.5;
    if (player.is_rightkey == true)
          this.rlspeed += 0.5;

    if (this.speed > 6)
      this.speed = 0;
    else
      this.speed -= 2;
    this.i = 0;
  }
};
Asteroid.prototype.ai = function()
{
  this.drawY += this.speed;
  this.drawX += this.rlspeed;
  if (this.drawY > siceY - this.height)
    this.drawY = siceY - this.height;
  if (this.drawY < 0)
    this.speed = this.speed * -1;
  if (this.drawX > siceX - this.width)
  {
    this.rlspeed = this.rlspeed * -1;
  	collusion_sound.currentTime = 0;
	//collusion_sound.play();
  }
  if (this.drawX < 0)
    {
    this.rlspeed = this.rlspeed * -1;
	collusion_sound.currentTime = 0;
	//collusion_sound.play();
	}
}
function spawn_asteroid(n)
{
  for (var i = 0; i < n; i++)
  {
    asteroids[asteroids.length] = new Asteroid();
  }
}

function loop()
{
  main_ctx.clearRect(0,0,siceX,siceY);
 for (var i = 0; i < asteroids.length; i++)
  {
    asteroids[i].draw();
  }
  player.draw();
 
  if (is_playing)
    requestaframe(loop);
}
function start_loop()
{
  is_playing = true;
  loop();
  spawn_asteroid(1);
}
function stop_loop()
{
  is_playing = false;
}
 
 
function key_down(e)
{
  var key_id = e.keyCode || e.which;
  if (key_id == 40) //down key
  {
    player.is_downkey = true;
    e.preventDefault();
  }
  if (key_id == 38) //up key
  {
    player.is_upkey = true;
    e.preventDefault();
  }
  if (key_id == 37) //left key
  {
    player.is_leftkey = true;
    e.preventDefault();
  }
  if (key_id == 39) //right key
  {
    player.is_rightkey = true;
    e.preventDefault();
  }
  if (key_id == 83) //s key
  {
    player.is_skey = true;
    e.preventDefault();
  }
}
function key_up(e)
{
  var key_id = e.keyCode || e.which;
  if (key_id == 40) //down key
  {
    player.is_downkey = false;
    e.preventDefault();
  }
  if (key_id == 38) //up key
  {
    player.is_upkey = false;
    e.preventDefault();
  }
  if (key_id == 37) //left key
  {
    player.is_leftkey = false;
    e.preventDefault();
  }
  if (key_id == 39) //right key
  {
    player.is_rightkey = false;
    e.preventDefault();
  }
  if (key_id == 83) //s key
  {
    player.is_skey = false;
    e.preventDefault();
  }
}