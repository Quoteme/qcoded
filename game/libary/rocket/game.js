var version ='0.1.8';
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
  
  //diferrent sices
  	siceX = 800;
  	osiceX = 800;
  	siceY = 600;
  	osiceY = 600;
  	background_height = 20960;
  //different objekts
	  player = new Player();
	  mothership = new Mothership();
	  asteroids = new Array(); //normal enemies (brown) instead of the old enemys
	  enemies = new Array();
	  bullets = new Array();
  //different basic game variables
	  spawn_a_times = 5;
	  Background_drawY_one = background_height - siceY;
	  Background_drawY_two = background_height - siceY;
	  Background_speed = 1;
	  bg_music_check = false;
    loaded = 0;
  //alternate optens
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
};

function loader()
{
  loaded += 1;
  tiles_to_load = 3;
  if (loaded == tiles_to_load)
  {
    main_ctx.clearRect(0,0,siceX,siceY);
    bg_sprite.addEventListener("load", start_loop, false);
  }else{
    main_ctx.clearRect(0,0,siceX,siceY);
    main_ctx.fillStyle = "orange";
    main_ctx.font = "40px Zekton";
    main_ctx.textBaseline = 'top';
    main_ctx.fillText("Loaded tile:", 5, 0);
    main_ctx.fillText(loaded , 5, 45);
    main_ctx.fillText('out of:', 5, 90)
    main_ctx.fillText(tiles_to_load, 5, 135)
  }
}

function load_media()
{
  bg_sprite = new Image(); //background
  bg_sprite.src = 'images/bg_sprite.png';
  bg_sprite.addEventListener("load", loader(), false);
  main_sprite = new Image(); //characters
  main_sprite.src = 'images/main_sprite.png';
  main_sprite.addEventListener("load", loader(), false);
  Boss_sprite = new Image(); //Boss
  Boss_sprite.src = 'images/Boss.png';
  Boss_sprite.addEventListener("load", loader(), false);
  
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
function menu()
{											//	"Full-Screen", "16:9 Res"
      main_menu_buttons = new Array("New Game", "under-dev", "under-dev", "Credits", "Games", 'manual', 'music: on/off');

      main_ctx.fillStyle = "#161616";
      main_ctx.fillRect(0, 0, siceX, siceY);

      for (var i = 0; i  < main_menu_buttons.length; i++)
      {
      	var layer = 0;
        var drawX = siceY / 6;
        var drawY = siceX / 5 + i * 70 - 125;
        var height = 60;
        var width = 221;
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
			
	        if (layer == 0)
		        {	   

		        if (buttons_status[i] == "click")
		        {
		       	srcX += height;
				width += 256 + 30 * 43; //this seems to be a bug with chrome, so i need to use this

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
		          main_ctx.font = "20px Zekton";
		          main_ctx.textBaseline = 'top';
		          main_ctx.fillText("The whole game is opensource.", siceX / divider, upper_margin +  i * height);
		    	    alertcount = false;
		    	  }
		          if (i == 4)
		    	if (alertcount == true)
		    	  {
		        main_ctx.fillStyle = "orange";
		        main_ctx.font = "20px Zekton";
		        main_ctx.textBaseline = 'top';
		        main_ctx.fillText("other games are on my website :)", siceX / divider, upper_margin +  i * height);
		    	    alertcount = false;
		    	  }
		    	  if (i == 5)
		    	if (alertcount == true)
		    	  {
		        main_ctx.fillStyle = "red";
		        main_ctx.font = "20px Zekton";
		        main_ctx.textBaseline = 'top'; 
		        main_ctx.fillText("Shoot with the 'S' key and move with the", siceX / divider, upper_margin +  i * height);
		        main_ctx.fillText("arrow keys. 'Q, W and A can be unlocked ", siceX / divider, upper_margin +  i * height + 20);
		    	    alertcount = false;
		    	  }
		          if (i == 6)
		    	if (alertcount == true)
		    	  {
		    	  	start_stop_music();
		    	  	alertcount = false;
		    	  }
		        }
		        else if (buttons_status[i] == "hover")
		        {
		          srcX += height;
		          width += 256 + 30 * 43;

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
		          main_ctx.font = "20px Zekton";
		          main_ctx.textBaseline = 'top';
		          main_ctx.fillText("The whole game is opensource.", siceX / divider, upper_margin +  i * height);
		    	    alertcount = false;
		    	  }
		          if (i == 4)
		    	if (alertcount == true)
		    	  {
		        main_ctx.fillStyle = "orange";
		        main_ctx.font = "20px Zekton";
		        main_ctx.textBaseline = 'top';
		        main_ctx.fillText("other games are on my website", siceX / divider, upper_margin + i * height);
		    	    alertcount = false;
		    	  }

		    	   if (i == 5)
		    	if (alertcount == true)
		    	  {
		        main_ctx.fillStyle = "orange";
		        main_ctx.font = "20px Zekton";
		        main_ctx.textBaseline = 'top';
		        main_ctx.fillText("other games are on my website ", siceX / divider, upper_margin +  i * height);
		    	    alertcount = false;
		    	  }
		        }
	    }

        main_ctx.drawImage(main_sprite, srcX, 64, 32, 32, drawX, drawY, width, height)
        main_ctx.fillStyle = "black";
        main_ctx.font = "35px Zekton";
        main_ctx.textBaseline = 'middle';
        main_ctx.fillText(main_menu_buttons[i], drawX, drawY + height / 2);
      }
        main_ctx.fillStyle = "#000";
        main_ctx.fillRect(0, siceY - 56, siceX, siceY);
        main_ctx.fillStyle = "#161616";
        main_ctx.fillRect(0, siceY - 50, siceX, siceY);
        main_ctx.fillStyle = "#E18728";
        main_ctx.fillRect(10, siceY - 45, 250, 40);
        main_ctx.fillStyle = "#BE4C39";
        main_ctx.fillRect(270, siceY - 45, 260, 40);
        main_ctx.fillStyle = "#9351A6";
        main_ctx.fillRect(540, siceY - 45, 250, 40);
        main_ctx.fillStyle = "grey";
        main_ctx.font = "10px Zekton";
        main_ctx.textBaseline = 'top';
        main_ctx.fillText(version, 0, 0);
        
        main_ctx.fillStyle = "#363636";
        main_ctx.font = "18px Zekton";
        main_ctx.textBaseline = 'bottom';
        main_ctx.fillText( 'Music by Volt44.' , 25, siceY - 15);
        main_ctx.fillText( 'Code by Quote.' , 285, siceY - 15);
        main_ctx.fillText( 'Graphics by Quote.' , 285 + 285 - 15, siceY - 15);

      		draw_background(background_height)
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
        {
          buttons_status[i] = "hover";
          alertcount = false;
        }
        else
        {
          buttons_status[i] = "click";
          alertcount = true;
        }
      }
      else
        buttons_status[i] = "normal";
    }
 
 
  //document.getElementById('x').innerHTML = x;
  //document.getElementById('y').innerHTML = y;
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

function start_stop_music()
{
	if (bg_music_check == false)
	{
		document.getElementById('bg_music').pause()
    bg_music_check = true;
	}
	else
	{
		document.getElementById('bg_music').play()
    bg_music_check = false;
	}
}

function Player()
{
  
  //startpoint
  	this.drawX = 360;
  	this.drawY = 425;
  //where the image comes from, and how it will be presentated
  	this.srcX = 0;
  	this.srcY = 0;
  	this.width = 32;
  	this.height = 32;
  //defines if a key is plressed
  	this.is_downkey = false;
  	this.is_upkey = false;
  	this.is_leftkey = false;
  	this.is_rightkey = false;
  	this.is_akey = false;
  	this.is_dkey = false;
  	this.is_skey = false;
  	this.is_wkey = false;
  	this.is_qkey = false;
    this.is_xkey = false;
  //information, on how long something lasts
  	this.shoot_wait = 20;
  	this.shoot_wait_teleport = 15;
  	this.qshoot_wait = this.shoot_wait * 30;
  	this.qshoot_time = this.qshoot_wait;
    this.xshoot_wait = 5;
    this.xshoot_time = this.xshoot_wait;
  	this.shoot_time_teleport = this.shoot_wait_teleport;
  	this.shoot_time = this.shoot_wait;
  	this.hide_cooldown = 100;
  //defines that objekts are already unlocked/locked
  	this.beam = false;
  	this.mine_activated = false;
    this.fire = false;
  //defines that something is used
  	this.a = false;
  	this.d = false;
  	this.q = false;
    this.x = false;
  //general information about the player
  	this.speed = 5;
  	this.life = 100;
  	this.fallspeed = 1 / 4;
  //cheats, because they always make fun^^
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

  if (this.life <= 3)
  	this.cheat_tripple = true;

};
Player.prototype.check_keys = function()
{


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
    main_ctx.drawImage(main_sprite, this.srcX + 32, this.srcY, this.width, this.height, this.drawX, this.drawY,32,32);
  }
  if (this.is_rightkey == true)
  {	
    this.drawX += this.speed;
	main_ctx.drawImage(main_sprite, this.srcX + 64, this.srcY, this.width, this.height, this.drawX, this.drawY,32,32);  
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

  if (this.fire == true && this.is_xkey == true && this.xshoot_wait >= this.xshoot_time)
  {
    bullets[bullets.length] = new Bullet(this.drawX, this.drawY - this.height / 2, true);
    this.x = true;
    this.xshoot_wait = 0;
  }else{
    this.x = false;
    this.xshoot_wait++;
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
  this.drawY = Math.round(Math.random()*50 + 10);
  this.speed = 1;
  this.srcX = 0;
  this.srcY = 128;
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
        if (this.level < 10)
	        main_ctx.drawImage(main_sprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, 64, 32);
        else
        {
          this.width = 921 * 0.5;
          this.height = 551 * 0.5;
          main_ctx.drawImage(Boss_sprite, 0, 0, this.width * 2, this.height * 2, this.drawX, this.drawY, this.width, this.height);
        }
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
      	player.beam = true;
      	player.shoot_time == 15;
      	player.shoot_wait == 15;
      	Asteroid.speed = Math.round(Math.random()*3 + 1);
    }
    if (this.level == 8)
      {
      	main_ctx.fillStyle = "red";
      	main_ctx.font = "20px Zekton";
      	main_ctx.textBaseline = 'bottom';
      	main_ctx.fillText("!Use the 'A' Key!", 50, 50);
      	Asteroid.speed = Math.round(Math.random()*12 + 1);
      	this.exploded = true;
      	this.is_dead == true;
      	this.olife += 100;
      	this.level += 1;
      	spawn_asteroid(spawn_a_times * this.level * 2);
      	this.life = this.olife;
      	this.exploded = false;
      }
    if (this.level == 10)
      {
        this.exploded = true;
        this.is_dead == true;
        this.olife += 100;
        this.level += 1;
        this.life = this.olife;
        this.exploded = false;
      }
    else
    {
      kill_asteroid();
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
    main_ctx.font = "10px Zekton";
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
  this.fire = false;
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
        		if (player.a == false && player.q == false && player.x == false)
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
    			}
          else if (player.q == true)
    			{
    				this.fallbackwait = 0;
    				this.mine = true;
    				this.speed = 0;
    			}
          else if (player.x == true) {
            this.fire = true;
            this.fallbackwait = 20;
            this.speed = 6;
            this.normal_bullet = false;
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
        if (this.fire == true)
          this.drawY += 3;
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
	if (this.drawX <= mothership.drawX + mothership.width && this.drawX + mothership.width >= mothership.drawX &&
      this.drawY <= mothership.drawY + mothership.height && this.drawY + mothership.height >= mothership.drawY && this.exploded == false)
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
	  if (player.a == false && this.fire == false)
	  mothership.life -= 5;
    if (this.fire == true)
    mothership.life -= 3;
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
	  if (player.a == false && this.fire == false)
    asteroids[i].life -= 5;
    if (this.fire == true)
    asteroids[i].life -= 3;
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
    main_ctx.font = "10px Zekton";
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
function kill_asteroid()
{
  for (var i = 0; i < asteroids.length; i++)
      {
    if (asteroids[i].exploded == true)
        {
          //nothing
        }
    else
        {
          asteroids[i].exploded = true;
        }
      }
}

function draw_background (y)
{
	background_ctx.clearRect(0,0,siceX,siceY);
	background_ctx.drawImage(bg_sprite, 0, y, siceX, siceY, 0, 0, siceX, siceY);
}

function background_loop ()
{
	draw_background(Background_drawY_one)
	if (Background_drawY_one <= siceY + background_height && Background_speed < player.speed)
		{
			Background_speed += 1;
		}
	if (Background_drawY_one <= 0)
		{
			Background_drawY_one = background_height - siceY * 2;
		}
	Background_drawY_one -= Background_speed;
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
  if (mothership.level >= 10)
    kill_asteroid();

	  main_ctx.fillStyle = "white";
	  main_ctx.font = "20px Zekton";
	  main_ctx.textBaseline = 'bottom';
	  main_ctx.fillText(player.life, 0, siceY);
	  
	  main_ctx.fillStyle = "white";
	  main_ctx.font = "20px Zekton";
	  main_ctx.textBaseline = 'bottom';
	  main_ctx.fillText( "Level: " + mothership.level, siceX - 100, siceY);
	  player.draw();
	  background_loop();
    
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
  if (key_id == 65) //a key
  {
    player.is_akey = true;
    e.preventDefault();
  }
  if (key_id == 68) //d key
  {
    player.is_dkey = true;
    e.preventDefault();
  }
  if (key_id == 87) //w key
  {
    player.is_wkey = true;
    e.preventDefault();
  }
  if (key_id == 81) //q key
  {
    player.is_qkey = true;
    e.preventDefault();
  }
  if (key_id == 88)//x key
  {
    player.is_xkey = true;
    e.preventDefault();
  }

  if (key_id == 27 || key_id == 80)//p or esc key pressed
  {
  	is_menu = true;
  	menu_paused = true;
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
  if (key_id == 65) //a key
  {
    player.is_akey = false;
    e.preventDefault();
  }
  if (key_id == 68) //d key
  {
    player.is_dkey = false;
    e.preventDefault();
  }
  if (key_id == 87) //w key
  {
    player.is_wkey = false;
    e.preventDefault();
  }
  if (key_id == 81) //q key
  {
    player.is_qkey = false;
    e.preventDefault();
  }
  if (key_id == 88)//x key
  {
    player.is_xkey = false;
    e.preventDefault();
  }
}