var version ='0.1.6 / Joistick';
var is_playing = false;
init();
function init()
{
  background_canvas = document.getElementById('background_canvas');
  background_ctx = background_canvas.getContext('2d');
  main_canvas = document.getElementById('main_canvas');
  main_ctx = main_canvas.getContext('2d');
 
 
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
  

  siceX = 800;
  osiceX = 800;
  siceY = 600;
  osiceY = 600;
  player = new Player();
  mothership = new Mothership();
  asteroids = new Array(); //normal enemies (brown) instead of the old enemys
  enemies = new Array();
  bullets = new Array();
  spawn_a_times = 5;
  alternate_res = false;
  alternate_res_two = false;
  menu_paused = false;
  load_media();
  
  buttons_drawX = new Array();
  buttons_drawY = new Array();
  buttons_width = new Array();
  buttons_height = new Array();
  buttons_status = new Array();
  is_menu = true;
  bgcheck = false;
  alertcount = false;
  bg_sprite.addEventListener("load", start_loop, false);
};
function load_media()
{
  bg_sprite = new Image(); //menu background
  bg_sprite.src = 'images/bg_sprite.png';
  main_sprite = new Image(); //background while playing
  main_sprite.src = 'images/main_sprite.png';
  
  blast_sound = new Audio(); // sound for shooting (player)
  blast_sound.src = 'sounds/blast.wav'
  blast_sound.autobuffer = true;
  expload_sound = new Audio(); // sound for exploding (Mothership; Player)
  expload_sound.src = 'sounds/expload.wav'
  expload_sound.autobuffer = true;
  hit_sound = new Audio(); // sound for exploding (Mothership; Player)
  hit_sound.src = 'sounds/hit.wav'
  hit_sound.autobuffer = true;
  laser_sound = new Audio(); // sound for laser (Mothership; Player)
  laser_sound.src = 'sounds/laser.wav'
  laser_sound.autobuffer = true;
  warp_sound = new Audio(); // sound for warp (Player)
  warp_sound.src = 'sounds/warp.wav'
  warp_sound.autobuffer = true;
  mine_sound = new Audio(); // sound for mine (Player)
  mine_sound.src = 'sounds/mine.wav'
  mine_sound.autobuffer = true;
  mine_explosion_sound = new Audio(); // sound for mine, when exploding (Player)
  mine_explosion_sound.src = 'sounds/mine_explosion.wav'
  mine_explosion_sound.autobuffer = true;
};

//gamepad api
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

function connecthandler(e) {
  addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad; var d = document.createElement("div");
  d.setAttribute("id", "controller" + gamepad.index);
  var t = document.createElement("h1");
  t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
  d.appendChild(t);
  var b = document.createElement("div");
  b.className = "buttons";
  for (var i=0; i<gamepad.buttons.length; i++) {
    var e = document.createElement("span");
    e.className = "button";
    //e.id = "b" + i;
    e.innerHTML = i;
    b.appendChild(e);
  }
  d.appendChild(b);
  var a = document.createElement("div");
  a.className = "axes";
  for (var i=0; i<gamepad.axes.length; i++) {
    var e = document.createElement("progress");
    e.className = "axis";
    //e.id = "a" + i;
    e.setAttribute("max", "2");
    e.setAttribute("value", "1");
    e.innerHTML = i;
    a.appendChild(e);
  }
  d.appendChild(a);
  document.getElementById("start").style.display = "none";
  document.body.appendChild(d);
  rAF(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  var d = document.getElementById("controller" + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
}

function updateStatus() {
  if (navigator.webkitGetGamepads) {
    scangamepads();
  }
  for (j in controllers) {
    var controller = controllers[j];
    var d = document.getElementById("controller" + j);
    var buttons = d.getElementsByClassName("button");
    for (var i=0; i<controller.buttons.length; i++) {
      var b = buttons[i];
      var val = controller.buttons[i];
      var pressed = val == 1.0;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        val = val.value;
      }
      var pct = Math.round(val * 100) + "%"
      b.style.backgroundSize = pct + " " + pct;
      if (pressed) {
        b.className = "button pressed";
      } else {
        b.className = "button";
      }
    }

    var axes = d.getElementsByClassName("axis");
    for (var i=0; i<controller.axes.length; i++) {
      var a = axes[i];
      a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
      a.setAttribute("value", controller.axes[i] + 1);
    }
  }
  rAF(updateStatus);
}

function scangamepads() {
  var gamepads = navigator.webkitGetGamepads();
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (!(gamepads[i].index in controllers)) {
        addgamepad(gamepads[i]);
      } else {
        controllers[gamepads[i].index] = gamepads[i];
      }
    }
  }
}

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);
if (navigator.webkitGetGamepads) {
  setInterval(scangamepads, 500);
}


function menu()
{
      
      if (menu_paused == false)
      	main_menu_buttons = new Array("New Game", "Full-Screen", "16:9 Res", "Credits", "Games");
      else
      	main_menu_buttons = new Array("Resume");


      for (var i = 0; i  < main_menu_buttons.length; i++)
      {
        var drawX = siceY / 2 / 2;
        var drawY = siceX / 5 + i * 60;
        var height = 50;
        var width = 200;
        var srcX = 32;
        var upper_margin = drawX + 10;
        var divider = 2;
        var subtractorX = 10;
        var subtractorY = 10;
        if (buttons_status[i] == undefined)
        {
          buttons_status[i] = "normal";
          buttons_drawX[i] = drawX;
          buttons_drawY[i] = drawY;
          buttons_height[i] = height;
          buttons_width[i] = width;
        }
        
        if (buttons_status[i] == "click")
        {
          srcX += height;
          width += 200 + 50 + 6;

          hit_sound.play();

          if (i == 0)
          	{
          		if (alertcount == true)
          			{
          				bgcheck = true;
          				is_menu = false;
          			}
          		alertcount = false;
          	}
          if (i == 1)
    	if (alertcount == true)
    	  {
          background_canvas.width = window.screen.availWidth - subtractorX;
          background_canvas.height = window.screen.availHeight - subtractorY;
          main_canvas.width = window.screen.availWidth - subtractorX;
          main_canvas.height = window.screen.availHeight - subtractorY;
          spawn_a_times += window.screen.availWidth / 200;
          siceX = window.screen.availWidth - subtractorX;
          siceY = window.screen.availHeight - subtractorY;
          alternate_res = true;
          alternate_res_two = true;
          is_menu = false;
    	    alertcount = false;
    	  }
          if (i == 2)
    	if (alertcount == true)
    	  {
          background_canvas.width = background_canvas.width / 2 * 3 ;
          main_canvas.width = main_canvas.width / 2 * 3;
          spawn_a_times += 3;
          siceX = siceX / 2 * 3;
          alternate_res = true;
          is_menu = false;
    	    alertcount = false;
    	  }
          if (i == 3)
    	if (alertcount == true)
    	  {
          main_ctx.fillStyle = "orange";
          main_ctx.font = "20px Arial";
          main_ctx.textBaseline = 'top';
          main_ctx.fillText("The whole game is opensource.", siceX / divider, upper_margin +  i * height);
    	    alertcount = false;
    	  }
          if (i == 4)
    	if (alertcount == true)
    	  {
        main_ctx.fillStyle = "orange";
        main_ctx.font = "20px Arial";
        main_ctx.textBaseline = 'top';
        main_ctx.fillText("other games are on my website :)", siceX / divider, upper_margin +  i * height);
    	    alertcount = false;
    	  }
        }
        else if (buttons_status[i] == "hover")
        {
          srcX += height;
          width += 200 + 50 + 6;

          if (i == 0)
          	{
          		if (alertcount == true)
          			{
          				bgcheck = true;
          				is_menu = false;
          			}
          		alertcount = false;
          	}
          if (i == 1)
    	if (alertcount == true)
    	  {
          background_canvas.width = window.screen.availWidth - subtractorX;
          background_canvas.height = window.screen.availHeight - subtractorY;
          main_canvas.width = window.screen.availWidth - subtractorX;
          main_canvas.height = window.screen.availHeight - subtractorY;
          spawn_a_times += window.screen.availWidth / 200;
          siceX = window.screen.availWidth - subtractorX;
          siceY = window.screen.availHeight - subtractorY;
          alternate_res = true;
          alternate_res_two = true;
          is_menu = false;
    	    alertcount = false;
    	  }
          if (i == 2)
    	if (alertcount == true)
    	  {
          background_canvas.width = background_canvas.width / 2 * 3 ;
          main_canvas.width = main_canvas.width / 2 * 3;
          spawn_a_times += 3;
          siceX = siceX / 2 * 3;
          alternate_res = true;
          is_menu = false;
    	    alertcount = false;
    	  }
          if (i == 3)
    	if (alertcount == true)
    	  {
          main_ctx.fillStyle = "orange";
          main_ctx.font = "20px Arial";
          main_ctx.textBaseline = 'top';
          main_ctx.fillText("The whole game is opensource.", siceX / divider, upper_margin +  i * height);
    	    alertcount = false;
    	  }
          if (i == 4)
    	if (alertcount == true)
    	  {
        main_ctx.fillStyle = "orange";
        main_ctx.font = "20px Arial";
        main_ctx.textBaseline = 'top';
        main_ctx.fillText("other games are on my website :)", siceX / divider, upper_margin +  i * height);
    	    alertcount = false;
    	  }
        }

        main_ctx.drawImage(main_sprite, srcX, 64, 32, 32, drawX, drawY, width, height)
        main_ctx.fillStyle = "black";
        main_ctx.font = "35px Arial";
        main_ctx.textBaseline = 'middle';
        main_ctx.fillText(main_menu_buttons[i], drawX, drawY + height / 2);
      }
        main_ctx.fillStyle = "grey";
        main_ctx.font = "10px Arial";
        main_ctx.textBaseline = 'top';
        main_ctx.fillText(version, 0, 0);
      
      		background_ctx.drawImage(bg_sprite, 0, siceY, siceX, siceY, 0, 0, siceX, siceY);

};
function mouse(type, e)
{
  var x = e.pageX - document.getElementById('game_object').offsetLeft;
  var y = e.pageY - document.getElementById('game_object').offsetTop;
 
  for (var i = 0; i < buttons_status.length; i++)
    {
      if (x <= buttons_drawX[i] + buttons_width[i] && x >= buttons_drawX[i] &&
          y <= buttons_drawY[i] + buttons_height[i] && y >= buttons_drawY[i])
      {
        if (type == 'move' && buttons_status[i] != "click")
          buttons_status[i] = "hover";
        else
        {
          buttons_status[i] = "click";
          alertcount = true;
        }
      }
      else
        buttons_status[i] = "normal";
    }
 
 
  document.getElementById('x').innerHTML = x;
  document.getElementById('y').innerHTML = y;
}
 
  function keypresser(key)
{
  if (key == 0) //up
  {
    player.is_upkey = true;
    player.is_leftkey = false;
    player.is_downkey = false;
    player.is_rightkey = false;
  }
  if (key == 1) //left
  {
    player.is_leftkey = true;
    player.is_upkey = false;
    player.is_downkey = false;
    player.is_rightkey = false;
  }
  if (key == 2) //down
  {
    player.is_downkey = true;
    player.is_upkey = false;
    player.is_leftkey = false;
    player.is_rightkey = false;
  }
  if (key == 3) //right
  {
    player.is_rightkey = true;
    player.is_upkey = false;
    player.is_leftkey = false;
    player.is_downkey = false;
  }
  if (key == 4) //Beam
    player.is_akey = true;
  if (key == 5) //Bullet
    player.is_skey = true; 
  if (key == 6) //stop
    {
      for (var i = 100; i >= 0; i--) {
        
        player.is_upkey = false;
        player.is_leftkey = false;
        player.is_downkey = false;
        player.is_rightkey = false;
        player.is_akey = false; 
        player.is_skey = false;
      };
    }
    
}

function Player()
{
  this.life = 100;
  this.drawX = 360;
  this.drawY = 425;
  this.speed = 5;
  this.srcX = 0;
  this.srcY = 0;
  this.width = 32;
  this.height = 32;
  this.is_downkey = false;
  this.is_upkey = false;
  this.is_leftkey = false;
  this.is_rightkey = false;
  this.is_akey = false;
  this.is_dkey = false;
  this.is_skey = false;
  this.is_wkey = false;
  this.is_qkey = false;
  this.shoot_wait = 20;
  this.shoot_wait_teleport = 15;
  this.qshoot_wait = this.shoot_wait * 30;
  this.qshoot_time = this.qshoot_wait;
  this.shoot_time_teleport = this.shoot_wait_teleport;
  this.shoot_time = this.shoot_wait;
  this.hide_cooldown = 100;
  this.beam = false;
  this.mine_activated = false;
  this.a = false;
  this.d = false;
  this.q = false;
  this.fallspeed = 1 / 4;
  this.d_pad = true;

  this.cheat_warp = false;
  this.cheat_teleport = false;
  this.cheat_tripple = false;

};
Player.prototype.draw = function()
{
  if (this.life > 0)
  {
      this.check_keys();
	if (this.drawX > siceX)
	{
	  this.drawX = -this.width;
	}
	if (this.drawX < 0 - this.width)
	{
	  this.drawX = siceX;
	}
	if (this.drawY > siceY - player.height)
	{
	  this.drawY = siceY - player.height;
	}
	if (this.drawY <= 0)
	{
	  this.drawY = 0;
	}	
  }
  else
  {
  	expload_sound.play();
  	alert("Game Over\nYou already reached Level " + mothership.level + ".")
    this.life =  100;
    is_menu = true;
  }
};
Player.prototype.check_keys = function()
{

if(navigator.webkitGetGamepads) {
    var gp = navigator.webkitGetGamepads()[0];

    if(gp.buttons[0] == 1) { //keys for shooting/hitting/atacking
      this.is_skey = true;
    } else if(gp.buttons[0] == 0) {
      this.is_skey = false;
    }
    if(gp.buttons[1] == 1) {
      this.is_akey = true;
    } else if(gp.buttons[1] == 0) {
      this.is_akey = false;
    }
    if(gp.buttons[2] == 1) {
      this.is_dkey = true;
    } else if(gp.buttons[2] == 0) {
      this.is_dkey = false;
    }
    if(gp.buttons[5] == 1) {
      this.is_qkey = true;
    } else if(gp.buttons[5] == 0) {
      this.is_qkey = false;
    }
    if(gp.buttons[10] == 1) {
      this.is_wkey = true;
    } else if(gp.buttons[10] == 0) {
      this.is_wkey = false;
    }
    if(gp.buttons[12] == 1 || gp.buttons[13] == 1 || gp.buttons[14] == 1 || gp.buttons[15] == 1) // checks if d-pad is used
      this.d_pad = false;
    if (this.d_pad == false)
    {
      if(gp.buttons[12] == 1) { //directional keys
        this.is_upkey = true;
      } else if(gp.buttons[12] == 0) {
        this.is_upkey = false;
      }
      if(gp.buttons[13] == 1) {
        this.is_downkey = true;
      } else if(gp.buttons[13] == 0) {
        this.is_downkey = false;
      }
      if(gp.buttons[14] == 1) {
        this.is_leftkey = true;
      } else if(gp.buttons[14] == 0) {
        this.is_leftkey = false;
      }
      if(gp.buttons[15] == 1) {
        this.is_rightkey = true;
      } else if(gp.buttons[15] == 0) {
        this.is_rightkey = false;
      }
    }
    if (gp.axes[0] > 0 || gp.axes[0] < 0)
      this.d_pad = true;
    if (this.d_pad == true)
    {
      if(gp.axes[0] > 0) { //d-pad directional keys
        this.is_rightkey = true;
      } else if(gp.axes[0] == 0) {
        this.is_rightkey = false;
      }
      if(gp.axes[0] < 0) {
        this.is_leftkey = true;
      } else if(gp.axes[0] == 0) {
        this.is_leftkey = false;
      }
      if(gp.axes[1] > 0) {
        this.is_downkey = true;
      } else if(gp.axes[0] == 0) {
        this.is_downkey = false;
      }
      if(gp.axes[1] < 0) {
        this.is_upkey = true;
      } else if(gp.axes[0] == 0) {
        this.is_upkey = false;
      }
    }
    if(gp.buttons[16] == 1) { //pause button
      is_menu = true;
      menu_paused = true;
    }

  }

  if (this.is_downkey == true)
  {
  	this.drawY += this.speed;
	  	if (this.is_leftkey == false && this.is_rightkey == false)
	  		main_ctx.drawImage(main_sprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY,32,32);
  }
  if (this.is_upkey == true)
  	{
    	this.drawY -= this.speed;
	    	if (this.is_leftkey == false && this.is_rightkey == false)
	  			main_ctx.drawImage(main_sprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY,32,32);
		main_ctx.drawImage(main_sprite, 32, 96, 32, 32, this.drawX, this.drawY + this.height - 3, 32, 32);
	}
  if (this.is_leftkey == true)
  {
    this.drawX -= this.speed;
    main_ctx.drawImage(main_sprite, this.srcX, this.srcY + 128, this.width, this.height, this.drawX, this.drawY,32,32);
  }
  if (this.is_rightkey == true)
  {	
    this.drawX += this.speed;
	main_ctx.drawImage(main_sprite, this.srcX + 32, this.srcY + 128, this.width, this.height, this.drawX, this.drawY,32,32);  
  }

		if (this.is_downkey == false && this.is_upkey == false && this.is_leftkey == false && this.is_rightkey == false)
			main_ctx.drawImage(main_sprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY,32,32);

  if (this.is_skey == true && this.shoot_wait >= this.shoot_time)
  {
  	blast_sound.currentTime = 0;
  	blast_sound.play();
  	if (this.cheat_tripple == false)
    	bullets[bullets.length] = new Bullet(this.drawX, this.drawY - this.height / 2, true);
   	else
   	{
   		bullets[bullets.length] = new Bullet(this.drawX - this.width, this.drawY - this.height, true);
		bullets[bullets.length] = new Bullet(this.drawX, this.drawY - this.height / 2, true);
		bullets[bullets.length] = new Bullet(this.drawX + this.width, this.drawY - this.height, true);
   	}
   this.shoot_wait = 0;
  }else{
    this.shoot_wait++;
  }
  
  if (this.beam == true)
  {
      if (this.is_akey == true)
      {
	this.a = true;
	laser_sound.currentTime = 0;
	laser_sound.play();
	bullets[bullets.length] = new Bullet(this.drawX, this.drawY - this.height / 2, true);
      }else{
	this.a = false;
      }
  }

      if (this.is_dkey == true && this.shoot_wait_teleport >= this.shoot_time_teleport && this.cheat_teleport == true)
      {
			this.d = true;
			this.drawX = Math.round(Math.random()*osiceX);
			this.drawY = Math.round(Math.random()*osiceY);
			this.shoot_wait_teleport = 0;
      }else{
      		this.shoot_wait_teleport++;
			this.d = false;
      }
  if (this.is_wkey == true && this.hide_cooldown >= 50 && this.cheat_warp == true)
  {
  	if (this.is_leftkey == true)
    	this.drawX -= osiceX;
    if (this.is_rightkey == true)
    	this.drawX += osiceX;
    if (this.is_upkey == true)
    	this.drawY -= osiceY;
    if (this.is_downkey == true)
    	this.drawY += osiceY;
    if (this.is_leftkey == true || this.is_rightkey == true || this.is_upkey == true || this.is_downkey == true)
	    {
	    	warp_sound.currentTime = 0;
	    	warp_sound.play();
	    }
    this.hide_cooldown = 0;
  }else{
    this.hide_cooldown++;
  }
  if (this.is_qkey == true && this.qshoot_wait >= this.qshoot_time && this.mine_activated == true)
      {
	this.q = true;
	mine_sound.currentTime = 0;
	mine_sound.play();
	bullets[bullets.length] = new Bullet(this.drawX, this.drawY - this.height / 2, true);
	this.qshoot_wait = 0;
      }else{
	this.q = false;
	this.qshoot_wait++;
      }

  if (this.is_downkey == false && this.is_upkey == false/* && this.is_leftkey == false && this.is_rightkey == false*/)
  	player.drawY += this.fallspeed;
};
 
function Mothership()
{
  this.olife = 100;
  this.life = 100;
  this.drawX = Math.round(Math.random()*siceX);
  this.drawY = Math.round(Math.random()*50);
  this.speed = 1;
  this.srcX = 32;
  this.srcY = 0;
  this.width = 64;
  this.height = 32;
  this.exploded = false;
  this.wait = 100;
  this.is_dead = false;
  this.shown = false;
  this.level = 1;
};
Mothership.prototype.draw = function()
{
  if (this.is_dead == false)
  {
      this.ai();
      if (this.exploded == false)
	main_ctx.drawImage(main_sprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, 64, 32);
      if (this.life <= 0)
  {  
  	if (this.level == 1)
  		player.mine_activated = true;
    if (this.level < 7)
    {
      Bullet.travel_at_least += 10;
      player.shoot_time -= 2;
      player.shoot_wait -= 2;
    }
    if (this.level == 7)
    {
      alert("...good; Now use the beam with the a-key.");
      player.beam = true;
      player.shoot_time == 15;
      player.shoot_wait == 15;
      Asteroid.speed = Math.round(Math.random()*3 + 1);
    }
    if (this.level == 8)
      {
      alert("Well, you defeated all the enemies.\nNow it's time to play...");
      Asteroid.speed = Math.round(Math.random()*12 + 1);
      this.exploded = true;
      this.is_dead == true;
      this.olife += 100;
      this.level += 1;
      spawn_asteroid(spawn_a_times * this.level * 2);
      this.life = this.olife;
      this.exploded = false;
      }
    else
    {
      this.exploded = true;
      expload_sound.play();
      this.olife += 100;
      this.level += 1;
      spawn_asteroid(spawn_a_times * this.level);
      this.life = this.olife;
      this.exploded = false;
    }
  }
  }
};
Mothership.prototype.ai = function()
{
  if (this.exploded == false)
  {
  this.drawX += this.speed;
  if (this.drawX > siceX)
    this.drawX = -this.width;
  }
  
  if (this.exploded == false)
   {
    main_ctx.fillStyle = "white";
    main_ctx.font = "10px Arial";
    main_ctx.textBaseline = 'bottom';
    main_ctx.fillText(this.life, this.drawX, this.drawY);
   }
  
  if (this.exploded == true && this.wait > 0)
  {
    main_ctx.drawImage(main_sprite, 32, 32, 32, 32, this.drawX - 16, this.drawY - 16, 96, 96);
    this.wait--;
  }
  if (this.wait < 0)
    this.wait = 100;
  if (this.exploded == false)
 if (Math.round(Math.random()*100) == 50)
 {
    bullets[bullets.length] = new Bullet(this.drawX, this.drawY);
 }
};

 function Bullet(x, y, is_player)
{
  if (is_player == true)
    this.is_player = true;
  else
    this.is_player = false;
  this.drawX = x;
  this.drawY = y;
  this.speed = 4;
  if (this.is_player)
    {
  this.srcX = 64;
  this.srcY = 32;
      if (player.a == true) // source of the lasers
      {
        this.srcX = 0;
        this.srcY = 96;
      } else if (player.q == true) { //source of the mine
      	this.srcX = 64;
        this.srcY = 96;
      }
      else
      {
        //nothing
      }
    }
    else
    {
  this.srcX = 0;
  this.srcY = 64;
    }
  this.width = 32;
  this.height = 32;
  this.exploded = false;
  this.wait = 0; //time the bullet needs to wait
  this.travel_at_least = 50; //defines how much the bullet will at least travel
  this.fallbackwait = Math.round(Math.random() * 100 + this.travel_at_least); //time after the bullets fall back
  this.laser = false;
  this.normal_bullet = false;
  this.mine = false;
  this.strength = Math.round(Math.random() * 2 + 1);
}
Bullet.prototype.draw = function()
{
  if (this.exploded == false)
  {
    if (this.is_player)
    {
    	this.strength = Math.round(Math.random() * 2 + 1);

    	if (this.fallbackwait > 0)
        	{
        		if (player.a == false && player.q == false)
        		{

		        	this.drawY -= this.speed;
		    		main_ctx.drawImage(main_sprite, 32, 96, 32, 32, this.drawX, this.drawY + this.height - 15, this.width, this.height);
		    		//here begins the spur
		    		main_ctx.drawImage(main_sprite, 32, 96, 32, 32, this.drawX + this.width / 4, this.drawY + this.height - 10, this.width / 2, this.height * 4);
		    		//main_ctx.drawImage(main_sprite, 32, 96, 32, 32, this.drawX + this.width / 4, this.drawY + this.height + 5, this.width / 2, this.height / 2);
		    		//main_ctx.drawImage(main_sprite, 32, 96, 32, 32, this.drawX + this.width / 4, this.drawY + this.height + 10, this.width / 2, this.height / 2);

		    		this.laser = false;
		    		this.normal_bullet = true;
    			}
    			else if (player.a == true)
    			{
    				main_ctx.drawImage(main_sprite, 32, 96, 32, 32, this.drawX, this.drawY + this.height - 15, this.width, this.height);
    				this.laser = true;
    				this.fallbackwait = 1000;
    				this.normal_bullet = false;
    			} else if (player.q == true)
    			{
    				this.fallbackwait = 0;
    				this.mine = true;
    				this.speed = 0;
    			}
    		}
    	else
    	{
    		if (this.laser == true && this.normal_bullet)
    			this.drawY += this.speed;
    		if (this.normal_bullet == true && this.laser == false)
    			this.drawY -= this.strength;
    		if (this.mine == true)
   				this.drawY -= 0;
    	}
    }
      else

        this.drawY += this.speed;
  main_ctx.drawImage(main_sprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, 32, 32);
  }
  if (this.is_player == false && this.drawX <= player.drawX + 32 && this.drawX + 32 >= player.drawX &&
      this.drawY <= player.drawY + 32 && this.drawY + 32 >= player.drawY && this.exploded == false)
    {
    player.life -= 10;
    this.exploded = true;
    this.wait = 50;
    }
    
 if (this.is_player == true)
 {
	if (this.drawX <= mothership.drawX + 32 && this.drawX + 32 >= mothership.drawX &&
      this.drawY <= mothership.drawY + 32 && this.drawY + 32 >= mothership.drawY && this.exploded == false)
	{
	  if (mothership.exploded == true)
	  {
	    //nothing
	  }
	  else
	  {
	  	if (this.mine == false)
	  	{
	  		hit_sound.currentTime = 0;
	    	hit_sound.play();
	    }
	  this.exploded = true;
	  this.wait = 50;
	  if (player.a == false)
	  mothership.life -= 5;
	  if (player.a == true)
	  mothership.life -= 1;
	  if (this.mine == true)
	  {
	  	mine_explosion_sound.currentTime = 0;
	    mine_explosion_sound.play();
	  	mothership.life -= 125;
	  }
	  }
	}

      for (var i = 0; i < asteroids.length; i++)
      {
	if (this.drawX <= asteroids[i].drawX + 32 && this.drawX + 32 >= asteroids[i].drawX &&
      this.drawY <= asteroids[i].drawY + 32 && this.drawY + 32 >= asteroids[i].drawY && this.exploded == false)
	{
	  if (asteroids[i].exploded == true)
	  {
	    //nothing
	  }
	  else
	  {
	  if (this.mine == false)
	  {
	  	hit_sound.currentTime = 0;
	    hit_sound.play();
	  }
	  this.exploded = true;
	  this.wait = 50;
	  //this.exploded = true;
	  //this.wait = 50;
	  if (player.a == false)
	  asteroids[i].life -= 5;
	  if (player.a == true)
	  asteroids[i].life -= 1;
	  if (this.mine == true)
	  {
	  	mine_explosion_sound.currentTime = 0;
	    mine_explosion_sound.play();
	  	asteroids[i].life -= 225;
	  }
	  }
	}
      }
 } 
  if (this.exploded == true && this.wait > 0)
  	if (this.mine == false)
    	main_ctx.drawImage(main_sprite, 32, 32, this.width, this.height,this.drawX, this.drawY, 32,32);
    else
    	main_ctx.drawImage(main_sprite, 32, 32, this.width, this.height,this.drawX - 64, this.drawY - 64, 128,128);
    this.wait--;
    this.fallbackwait--;
};

function Asteroid()
{
  this.life = 20;
  this.drawX = Math.round(Math.random()*siceX);
  this.drawY = Math.round(Math.random()*300 + 150);
  this.speed = Math.round(Math.random()*2 + 1);
  this.srcX = 0;
  this.srcY = 32;
  this.width = 32;
  this.height = 32;
  this.exploded = false;
  this.wait = 100;
  this.is_dead = false;
};
Asteroid.prototype.draw = function()
{
  if (this.is_dead == false)
    {
  
  this.ai();
  if (this.exploded == false)
  {
    main_ctx.drawImage(main_sprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY,32,32);
    this.drawY += this.speed;
  }
 
  if (this.drawX <= player.drawX + 32 && this.drawX + 32 >= player.drawX &&
      this.drawY <= player.drawY + 32 && this.drawY + 32 >= player.drawY && this.exploded == false)
    {
	    this.exploded = true;
	    player.life -= 1;
	    spawn_asteroid(2);
    }
   
   if (this.life <= 0)
   {
      this.exploded = true;
      this.is_dead == true;
    }
   
   
   if (this.exploded == false)
   {
    main_ctx.fillStyle = "white";
    main_ctx.font = "10px Arial";
    main_ctx.textBaseline = 'bottom';
    main_ctx.fillText(this.life, this.drawX, this.drawY);
   }
  
  if (this.exploded == true && this.wait > 0)
  {
    main_ctx.drawImage(main_sprite, 32, 32, 32, 32, this.drawX - 8, this.drawY - 8, 48, 48);
    this.wait--;
  }
  if (this.wait < 0)
    this.wait = 100;
    }
  
};
Asteroid.prototype.ai = function()
{
  
  //if (this.exploded == false) //Here is additional speed for the asteroid, this also causes, that the asteroid does not get stopped, just slowed down.
  this.drawY += 1;
  
  if (this.drawY > siceY)
    this.drawY = -this.width;
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

  if (is_menu == false)
  {
	  main_ctx.clearRect(0,0,siceX,siceY);
	  if (bgcheck == true)
	  {
	    if (alternate_res == false)
	    {
	    background_ctx.drawImage(bg_sprite, 0, 0);
	    }
	    else
	    {
	      if (alternate_res_two == false)
	       { 
	        background_ctx.drawImage(bg_sprite, 0, 0, siceX, siceY * 2);
	       }
	       else
	       {
	        background_ctx.drawImage(bg_sprite, 0, 0, siceX, siceY * 2);
	       }
	    }
	    bgcheck = false;
	  }
	 mothership.draw();
	 for (var i = 0; i < asteroids.length; i++)
	  {
	    asteroids[i].draw();
	  }
	  for (var i = 0; i < bullets.length; i++)
	  {
	    bullets[i].draw();
	  }

	  main_ctx.fillStyle = "white";
	  main_ctx.font = "20px Arial";
	  main_ctx.textBaseline = 'bottom';
	  main_ctx.fillText(player.life, 0, siceY);
	  
	  main_ctx.fillStyle = "white";
	  main_ctx.font = "20px Arial";
	  main_ctx.textBaseline = 'bottom';
	  main_ctx.fillText( "Level: " + mothership.level, siceX - 100, siceY);
	  player.draw();
  }else
    menu();
  if (is_playing)
    requestaframe(loop);
}
function start_loop()
{
  is_playing = true;
  loop();
  background_ctx.drawImage(bg_sprite, 0, 0);
  spawn_asteroid(spawn_a_times);
  bgcheck = true;
}
function stop_loop()
{
  is_playing = false;
}
