var version ='0.0.3';
var is_playing = false;
init();
function init()
{
  background_canvas = document.getElementById('background_canvas');
  backround_ctx = background_canvas.getContext('2d');
  main_canvas = document.getElementById('main_canvas');
  main_ctx = main_canvas.getContext('2d');
 
  document.addEventListener("keydown", key_down, false);
  document.addEventListener("keyup", key_up, false);
 
  requestaframe = (function() {
                return window.requestAnimationFrame     ||
                  window.webkitRequestAnimationFrame    ||
                  window.mozReuestAnimationFrame        ||
                  window.oRequestAnimationFrame         ||
                  window.msRequestAnimationFrame        ||
                  function (callback) {
                    window.setTimeout(callback, 1000 / 60)
                  };
  })();
 
  player = new Player();
}
/*function mouse(e)
{
  var x = e.pageX - document.getElementById('game_object').offsetLeft;
  var y = e.pageY - document.getElementById('game_object').offsetTop;
  document.getElementById('x').innerHTML = x;
  document.getElementById('y').innerHTML = y;
  
}
var r_y = 0;
var r_x = 0;
*/
function Player()
{
  this.drawX = 0;
  this.drawY = 0;
  this.speed = 1;
  this.is_downkey = false;
  this.is_upkey = false;
  this.is_leftkey = false;
  this.is_rightkey = false;
}
Player.prototype.draw = function()
{
  this.check_keys();
  var Bigx = 50;
  var Bigy = 50;
  main_ctx.fillStyle = "red";
  main_ctx.fillRect(this.drawX,this.drawY,Bigx,Bigy);
 
};
Player.prototype.check_keys = function()
{
  if (this.is_downkey == true)
    this.drawY++;
  if (this.is_upkey == true)
    this.drawY--;
  if (this.is_leftkey == true)
    this.drawX--;
  if (this.is_rightkey == true)
    this.drawX++;
}
function loop()
{
  
 
  player.draw();
 
  if (is_playing)
    requestaframe(loop);
}
function start_loop()
{
  is_playing = true;
  
  loop();
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
}