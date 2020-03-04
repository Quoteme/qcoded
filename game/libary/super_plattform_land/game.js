var version ='0.0.2';
var is_playing = false;
  //subtractorX = 30;
  //subtractorY = 100;
  //siceX = window.screen.availWidth - subtractorX;
  //siceY = window.screen.availHeight - subtractorY;

    siceX = 800;
    siceY = 600;

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

  main_ctx.webkitImageSmoothingEnabled = false;
  main_ctx.mozImageSmoothingEnabled = false;
  main_ctx.imageSmoothingEnabled = false; /// future

  //arrays fo objekts
	  player = new Player();
	  enemies = new Array();
	  bullets = new Array();
	  blocks = new Array();
	  cloudX_one = new Array();
	  cloudY_one = new Array();
	  cloud_sice_one = new Array();
	  cloudX_two = new Array();
	  cloudY_two = new Array();
	  cloud_sice_two = new Array();
  //different variables used to show if the game started
  	start_var = false; //used to find out if the game starded
  	start_var_two = false; //used like above
  	started_clouding = false; //detects if clouds were randomized
    font = 'PF Tempesta Five';
  //variables wich are generally used
  	randomeness_level = 0;
    set_interval = true;//used to start the running animations
    times_touched = 0;
    game_sound = false;

  background_downways_one = 0; //defines how much the background1 had gone down
  background_downways_two = 0 - siceY; //defines how much the background1 had gone down
  background_downways_picture_one = 0;
  background_downways_picture_two = 0 - siceY;
  background_canvas.width = siceX;
  background_canvas.height = siceY;
  main_canvas.width = siceX;
  main_canvas.height = siceY;

  load_media();

  bg_sprite.addEventListener("load", menu, false);
}
function load_media()
{
  bg_sprite = new Image();
  bg_sprite.src = 'images/bg_sprite.png'
  main_sprite = new Image();
  main_sprite.src = 'images/main_sprite.png';
}

function menu (part)
{
	background_ctx.fillStyle = '#f0f0cc';
  background_ctx.fillRect(0, 0, siceX, siceY);
  main_ctx.fillStyle = '#000000';
  main_ctx.font = "48px " + font;
  main_ctx.textBaseline = 'top';
  main_ctx.textAlign = 'center';
  main_ctx.fillText("Super", siceX * 0.5, 50);
  main_ctx.fillText("Platform Land", siceX * 0.5, 100)
  main_ctx.font = "24px " + font;
  main_ctx.fillText("Top-" + "            " + "0", siceX * 0.5, siceY * 0.60);

  //resources
  main_ctx.textAlign = 'left';
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
  //resources

   if (part == 1)
  {
    main_ctx.textAlign = 'left';
    main_ctx.clearRect(0,0,siceX,siceY);
    background_ctx.clearRect(0,0,siceX,siceY);
    background_ctx.fillStyle = '#f0f0cc';
    background_ctx.fillRect(0,0,siceX,siceY);
    main_ctx.fillStyle = '#000000';
    main_ctx.font = "48px " + font;
    main_ctx.textBaseline = 'top';
    main_ctx.fillText("Manual", siceX * 0.35, 0);
    main_ctx.font = "32px " + font;
    main_ctx.fillText("use the Arrow Keys to move", siceX * 0.10, siceY * 0.10);
    main_ctx.font = "16px " + font;
    main_ctx.fillText("< lets you move left,", siceX * 0.20, siceY * 0.20);
    main_ctx.fillText("> lets you move right,", siceX * 0.20, siceY * 0.25);
    main_ctx.fillText("^ lets you jump / fly", siceX * 0.20, siceY * 0.30);

    for (var i = 0; i <= 79; i++)//generates the dotten line
    {
      main_ctx.fillText(".", 10 * i, siceY * 0.35 );
    };

    for (var i = 0; i <= 37; i++)//generates the dotten line
    {
      main_ctx.fillText(".", siceX * 0.5, siceY * 0.35 + 10 * i );
    };

    main_ctx.font = "32px " + font;
    main_ctx.fillText("Avoid falling", siceX * 0.05, siceY * 0.40);
    main_ctx.font = "16px " + font;
    main_ctx.fillText("Only land on Platforms,", siceX * 0.10, siceY * 0.50);
    main_ctx.fillText("else you fall down and the", siceX * 0.10, siceY * 0.55);
    main_ctx.fillText("game ends.", siceX * 0.10, siceY * 0.60);

    for (var i = 0; i <= 79 * 0.5; i++)//generates the dotten line
    {
      main_ctx.fillText(".", 10 * i, siceY * 0.65 );
    };

    main_ctx.font = "32px " + font;
    main_ctx.fillText("Watch your Power", 0, siceY * 0.70);
    main_ctx.font = "16px " + font;
    main_ctx.fillText("In the upper left of the", siceX * 0.10, siceY * 0.80);
    main_ctx.fillText("screen, is you jumppower.", siceX * 0.10, siceY * 0.85);
    main_ctx.fillText("If your power drops below 0,", siceX * 0.10, siceY * 0.90);
    main_ctx.fillText("will you not be abled to fly.", siceX * 0.10, siceY * 0.95);

    main_ctx.font = "32px " + font;
    main_ctx.fillText("How to win", siceX * 0.5 + siceX * 0.05, siceY * 0.40);
    main_ctx.font = "16px " + font;
    main_ctx.fillText("in super-platform-land", siceX * 0.10 + siceX * 0.5, siceY * 0.50);
    main_ctx.fillText("you need to collect points", siceX * 0.10 + siceX * 0.5, siceY * 0.55);
    main_ctx.fillText("by running over randome", siceX * 0.10 + siceX * 0.5, siceY * 0.60);
    main_ctx.fillText("generated platforms.", siceX * 0.10 + siceX * 0.5, siceY * 0.65);
    main_ctx.fillText("The goal is it to collect", siceX * 0.10 + siceX * 0.5, siceY * 0.70);
    main_ctx.fillText("as many points as possible", siceX * 0.10 + siceX * 0.5, siceY * 0.75);
    main_ctx.fillText("and get the best score.", siceX * 0.10 + siceX * 0.5, siceY * 0.80);
    main_ctx.fillText("Have fun.", siceX * 0.10 + siceX * 0.5, siceY * 0.90);

  }

}

function mouse(e)
{
  times_touched += 1;
  if (times_touched < 2)
    menu(times_touched)
  if (times_touched >= 2)
  {
  	start_loop();
  }
}

function Player()
{
  this.width = 32;
  this.height = 32;
  this.drawX = siceX * 0.5 - this.width * 1.5;
  this.drawY = siceY * 0.5;
  this.speedX = this.width;
  this.speedY = 1;
  this.srcX = 0;
  this.srcY = 0;
  this.is_downkey = false;
  this.is_upkey = false;
  this.is_leftkey = false;
  this.is_rightkey = false;
  this.is_skey = false;
  this.jumps = false;
  this.layer = 2;
  this.wait = 2;
  this.wait_time = 15;
  this.jumpwait = 0;
  this.max_jump = 125;
  this.groundlevel = 31;
  this.lrj = "r"; //defines the textures which should be used /j for jump /l for left step /r for right step
  this.footsteps_per_second = 100;
  this.bigness = 0;
  this.keep_in_middel = 0; //makes the player appear centered.
}
Player.prototype.draw = function()
{
  this.check_keys();
  if (this.lrj == "l")
    main_ctx.drawImage(main_sprite, this.srcX + this.width * 2, this.srcY, this.width, this.height, this.drawX, this.drawY,this.width + this.bigness,this.height + this.bigness);
  else if (this.lrj == "r")
    main_ctx.drawImage(main_sprite, this.srcX + this.width, this.srcY, this.width, this.height, this.drawX, this.drawY,this.width + this.bigness,this.height + this.bigness);
  else if (this.lrj == "j")
    main_ctx.drawImage(main_sprite, this.srcX, this.srcY, this.width, this.height, this.drawX - this.keep_in_middel, this.drawY,this.width + this.bigness,this.height + this.bigness);
    if (this.drawX > siceX - this.width)
      {
        this.drawX = 0;
      }
    if (this.drawX < 0)
      {
        this.drawX = siceX - this.width;
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
Player.prototype.footsteps = function()
{
if (player.lrj == "l" || player.lrj == 'j')
    player.lrj = "r";
else if (player.lrj == "r")
    player.lrj = "l";
}
Player.prototype.check_keys = function()
{
  this.wait++;
  if (this.is_upkey == true)
    {
      if (this.jumpwait > 0)
      {
        this.lrj = "j";
        this.jumps = true;
        if (this.bigness <= 3)
        {
        	this.bigness += 1;
        	this.keep_in_middel += 0.5;
        }
      }
      else
      {
        this.jumpwait = 0;
        this.jumps = false;
        if (this.bigness > 0)
      	{
      		this.bigness -= 1;
      		this.keep_in_middel -= 0.5;
      	}
      }
      this.jumpwait -= 1;
    }
  else
    {
      this.jumps = false;
      if (this.bigness > 0)
      {
      	this.bigness -= 1;
      	this.keep_in_middel -= 0.5;
      }
      if (this.jumpwait < this.max_jump)
        this.jumpwait++;
    }
  /*
  if (this.is_downkey == true)
    this.drawY += 1;
  if (this.is_upkey == true)
    player.drawY -= 1;
  */
  if (this.is_leftkey == true && this.wait >= this.wait_time)
  {
    this.drawX -= this.speedX;
    this.wait = 0;
  }
  if (this.is_rightkey == true && this.wait >= this.wait_time)
  {
    this.drawX += this.speedX;
    this.wait = 0;
  }
  if (this.is_skey == true)
    {
      //nothing
    }
}
function text_overview()
{
  this.bar_sice = 10;
  this.bar_center = player.jumpwait * 0.5 - player.width * 0.5;

          if (player.jumps == true && player.jumpwait <= player.max_jump)
            {
              main_ctx.fillStyle = "red";
              main_ctx.fillRect(player.drawX - this.bar_center,player.drawY + player.height,player.jumpwait + 3,this.bar_sice);
            }
          else
            {
              main_ctx.fillStyle = "green";
              main_ctx.fillRect(player.drawX - this.bar_center,player.drawY + player.height,player.jumpwait + 3,this.bar_sice); 
            }

          main_ctx.fillStyle = '#161616';
          main_ctx.font = "10px Arial";
          main_ctx.fillText(randomeness_level, player.drawX, player.drawY + player.height + this.bar_sice + 10);
          main_ctx.fillText(player.jumpwait, player.drawX + 30, player.drawY + player.height + this.bar_sice + 10);
}

function Level(story)
{
  if (start_var == false)
  {
  start_var = true; //checks if these variables should be initiated over and over again
  this.drawX = 0;
  this.drawY = siceY * 0.5;
  this.width = 32;
  this.height = 32;
  this.srcgreenY = 32;
  this.srcgreenX = 0;
  this.center = siceX * 0.5 / 32; //with 20 it's in the middle
  this.blocks_made = 0;
  this.order = 0;
  this.passed_blocks_bignessX = 10;
  this.passed_blocks_bignessY = 3;
  this.in_random = false; //detects if a player is behinde the 19th layer
              // ground     bottom   state1   state2
  this.color = ['#6c935e', '#a67349', 'red', 'green', '#f0f0cc']
  this.ground_sice = 5;
  this.downway = 0;
  this.noground = new Array();
  this.ground = new Array();
  this.speed_up_timeout = false; //this variable allows to increase/decrease the speed, by just increasing the speed once, not trigered
  
  //first and bottom to top
                      // 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19
          this.bottom = [0, 3, 3, 5, 4, 3, 3, 5, 5, 1, 2, 3, 6, 8, 7, 6, 6, 5, 5, 3]
      this.left_right = [0, 0, 0,-1, 1, 0,-1,-1,-3, 2, 0,-1,-1,-3,-2,-2,-3,-3,-3, 0]

  //random appearance after the above platforms plattforms
          this.bottom_two = new Array();
      this.left_right_two = new Array();
      this.max_platforms = 8;
      this.max_randome_direktion = 10;

      for (var i = 256; i >= 0; i--)
      {
        this.bottom_two[i] = Math.round(Math.random() * this.max_platforms)
        this.left_right_two[i] = this.bottom_two[i] - Math.round(Math.random() * this.max_randome_direktion)
      };

      //randomize the appearance of grass/deco 
  this.randomcount = 15;
  this.randomgreen = new Array();
  this.random_ground_tester = false;
  for (var i = this.bottom.length + this.left_right.length; i >= 0; i--) {
    this.randomgreen[i] = [Math.round(Math.random() * this.randomcount)]
  };
  }
  if (story == 0)//the 'story' stands for the 'level' on wich the player currently is
    {
      
          /*
          the following is a normal platform in this game.
          the platformes are defined by times they are called,
          wich is defined by the array 'Level.bottom', or 'this.bottom'.

          this.order defines where the platformes appear, for example:
                                                                      order = 2     : the platform is above the platform with a lower value of 'order'
                                                                      order = 1     : the platform is above the platform with a lower value of 'order'
                                                                      order = 0     : the platform is under the higher platform
                                                                      order = -1    : the platform is below the platform wich has a higer value
          !!attantion!!
              always change all the numbers, if you make a new platform, like:
              previus platform:         this.bottom[1]
              new platform    :         this.bottom[2]
              next platform   :         this.bottom[3]
          !!attantion!!

          this.downway makes the platform go down, while playing

          it is possible to change the appearance of the platform on the 'X'
          direktion, by changing the value of the array 'this.left_right' like this:
                                                                      i would like to get the 3 platfrom more to the left.
                                                                      firstly, the arrays look like
                                                                      // 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
                                                          this.bottom = [0, 3, 3, 5, 3, 3, 3, 5, 4, 1, 2, 3, 6, 8, 7, 6]
                                                      this.left_right = [0, 0, 0,-1, 2, 0,-1,-1,-3, 2, 0,-1,-1,-3,-2,-2]
                                                                      but to chenge the third platfrom, do i select the third column and edit the second line

                                                                                  v
                                                                      // 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
                                                          this.bottom = [0, 3, 3, 5, 3, 3, 3, 5, 4, 1, 2, 3, 6, 8, 7, 6]
                                                     >this.left_right = [0, 0, 0,'edit', 2, 0,-1,-1,-3, 2, 0,-1,-1,-3,-2,-2]

          in the section:
                                                                      if (this.drawX * this.width + this.width * i + this.width * 0.5 -this.width <= player.drawX + this.width && this.drawX * this.width + this.width * i + this.width * 0.5 >= player.drawX &&
                                                                      this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
          is calculated, if the player is one the platform, or not.

          if you want to shrink the sice of a platform in the 'X' direction,
          you need to go to the 'this.bottom' array and change the value of the value you would like.

          to make corners, are here a helpful codesnaps

          //makes a rectangle, to fill not used space
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.ground_sice);
          //triangle left > right > up
          //make a triangle
              //first background
              main_ctx.beginPath();
              main_ctx.moveTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY + this.ground_sice);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY + this.ground_sice + this.height);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY + this.ground_sice);
              main_ctx.closePath();
              main_ctx.fillStyle = this.color[1];
              main_ctx.fill();
              //now foreground
              main_ctx.beginPath();
              main_ctx.moveTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY + this.height);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY);
              main_ctx.closePath();
              main_ctx.fillStyle = this.color[0];
              main_ctx.fill();
          */
          for (var o = 0; o < this.bottom[1]; o++) {
            this.order = 0;
              this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
              this.drawX = this.center - this.bottom[1] - this.left_right[1];
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
              main_ctx.fillStyle = this.color[0];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
              if (o >= 0 && o < this.bottom[1]) // green
              {
                if (this.randomgreen[o] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
              var minus_times = this.bottom[1] - 2;
              if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
            };


          for (var o = 0; o < this.bottom[2]; o++) {
            this.order = 1;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[2] - this.left_right[2];
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[2]) // green
              {
                if (this.randomgreen[o + this.bottom[1]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[1]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            var minus_times = this.bottom[2] - 2;
          if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };


          for (var o = 0; o < this.bottom[3]; o++) {
            this.order = 2;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[3] - this.left_right[3];
            if (o == 4) //shadows
            {
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
            }
            if (o == 0) //triangle
            {
              //makes a rectangle, to fill not used space
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.ground_sice);
              //make a triangle
              //first background
              main_ctx.beginPath();
              main_ctx.moveTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY + this.ground_sice);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY + this.ground_sice);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY + this.ground_sice+ this.height);
              main_ctx.closePath();
              main_ctx.fillStyle = this.color[1];
              main_ctx.fill();
              //now foreground
              main_ctx.beginPath();
              main_ctx.moveTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY + this.height);
              main_ctx.closePath();
              main_ctx.fillStyle = this.color[0];
              main_ctx.fill();
            }
            else
            {
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o > 0 && o < this.bottom[3]) // green
              {
                if (this.randomgreen[o + this.bottom[2]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[2]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            }
            var minus_times = this.bottom[3] - 2;
          if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };


          for (var o = 0; o < this.bottom[4]; o++) {
            this.order = 3;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[4] - this.left_right[4];
            if (o == 0)
            {
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
            }

            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[3]) // green
              {
                if (this.randomgreen[o + this.bottom[2]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[2]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            var minus_times = this.bottom[4] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[5]; o++) {
            this.order = 4;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[5] - this.left_right[5];
            if (o == 2)
            {
              //makes a rectangle, to fill not used space
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.ground_sice);
              //triangle left > right > up
              //make a triangle
              //first background
              main_ctx.beginPath();
              main_ctx.moveTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY + this.ground_sice);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY + this.ground_sice + this.height);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY + this.ground_sice);
              main_ctx.closePath();
              main_ctx.fillStyle = this.color[1];
              main_ctx.fill();
              //now foreground
              main_ctx.beginPath();
              main_ctx.moveTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY + this.height);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY);
              main_ctx.closePath();
              main_ctx.fillStyle = this.color[0];
              main_ctx.fill();
            }
            else
            {
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[4]) // green
              {
                if (this.randomgreen[o + this.bottom[3]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[3]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            }
            var minus_times = this.bottom[5] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[6]; o++) {
            this.order = 5;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[6] - this.left_right[6];
            if (o > 1)
            {
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
            }
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[6]) // green
              {
                if (this.randomgreen[o + this.bottom[4]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[4]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            var minus_times = this.bottom[6] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[7]; o++) {
            this.order = 6;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[7] - this.left_right[7];
            if (o < 2)
            {
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
            }
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[7]) // green
              {
                if (this.randomgreen[o + this.bottom[5]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[5]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            var minus_times = this.bottom[7] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY); 
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[8]; o++) {
            this.order = 7;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[8] - this.left_right[8];
            if (o > 2)
            {
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
            }
            if (o == 0)
            {
              //make a triangle
              //foreground
              main_ctx.beginPath();
              main_ctx.moveTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY + this.height);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY + this.height);
              main_ctx.closePath();
              main_ctx.fillStyle = this.color[0];
              main_ctx.fill();
            }
            else
            {
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[7]) // green
              {
                if (this.randomgreen[o + this.bottom[6]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[6]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            }
            var minus_times = this.bottom[8] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY); 
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[9]; o++) {
            this.order = 8;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[8] - this.left_right[9];

              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[8]) // green
              {
                if (this.randomgreen[o + this.bottom[7]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[7]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            var minus_times = this.bottom[1] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[10]; o++) {
            this.order = 9;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[10] - this.left_right[10];

              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
              main_ctx.fillStyle = this.color[0];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[10]) // green
              {
                if (this.randomgreen[o + this.bottom[9]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[9]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            var minus_times = this.bottom[10] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                player.speedY = 2; //increase the speed
                player.max_jump = 100; //decrease the max jump range
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[11]; o++) {
            this.order = 10;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[11] - this.left_right[11];
            if (o > 1)
            {
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
            }
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[11]) // green
              {
                if (this.randomgreen[o + this.bottom[10]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[10]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            var minus_times = this.bottom[11] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY); 
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[12]; o++) {
            this.order = 11;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[12] - this.left_right[12];
            if (o < 3)
            {
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
            }
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[12]) // green
              {
                if (this.randomgreen[o + this.bottom[11]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[11]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            var minus_times = this.bottom[12] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY); 
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[13]; o++) {
            this.order = 12;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[13] - this.left_right[13];
            if (o > 5)
            {
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
            }
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[13]) // green
              {
                if (this.randomgreen[o + this.bottom[12]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[12]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            var minus_times = this.bottom[13] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[14]; o++) {
            this.order = 13;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[14] - this.left_right[14];
            if (o == 0)
            {
              //make a triangle
              //foreground
              main_ctx.beginPath();
              main_ctx.moveTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY + this.height);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY + this.height);
              main_ctx.closePath();
              main_ctx.fillStyle = this.color[0];
              main_ctx.fill();
            }
            else
            {
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
             if (o >= 0 && o < this.bottom[13]) // green
              {
                if (this.randomgreen[o + this.bottom[12]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[12]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            }
            var minus_times = this.bottom[14] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[15]; o++) {
            this.order = 14;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[15] - this.left_right[15];
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[14]) // green
              {
                if (this.randomgreen[o + this.bottom[13]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[13]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            var minus_times = this.bottom[15] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[16]; o++) {
            this.order = 15;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[16] - this.left_right[16];
            if (o == 0)
            {
              //make a triangle
              //foreground
              main_ctx.beginPath();
              main_ctx.moveTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY + this.height);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY + this.height);
              main_ctx.closePath();
              main_ctx.fillStyle = this.color[0];
              main_ctx.fill();
            }
            else
            {
            if (o > 4)
            {
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
            }
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[15]) // green
              {
                if (this.randomgreen[o + this.bottom[14]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[14]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            }
            var minus_times = this.bottom[16] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[17]; o++) {
            this.order = 16;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[17] - this.left_right[17];
            
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[16]) // green
              {
                if (this.randomgreen[o + this.bottom[15]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[15]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            var minus_times = this.bottom[17] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[18]; o++) {
            this.order = 17;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[18] - this.left_right[18];
            if (o == 4)
            {
              //make a triangle
              //foreground
              main_ctx.beginPath();
              main_ctx.moveTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY + this.height);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY + this.height);
              main_ctx.closePath();
              main_ctx.fillStyle = this.color[0];
              main_ctx.fill();
            }
            else
            {
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[17]) // green
              {
                if (this.randomgreen[o + this.bottom[16]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[16]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            }
            var minus_times = this.bottom[18] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };

          for (var o = 0; o < this.bottom[19]; o++) {
            this.order = 18;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom[19] - this.left_right[19];
            if (o == 2)
            {
              //make a triangle
              //foreground
              main_ctx.beginPath();
              main_ctx.moveTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5, this.drawY + this.height);
              main_ctx.lineTo(this.drawX * this.width + this.width * o + this.width * 0.5 + this.width, this.drawY + this.height);
              main_ctx.closePath();
              main_ctx.fillStyle = this.color[0];
              main_ctx.fill();
            }
            else
            {
              if (o == 0)
            {
              main_ctx.fillStyle = this.color[1];
              main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
            }
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            if (o >= 0 && o < this.bottom[18]) // green
              {
                if (this.randomgreen[o + this.bottom[17]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom[17]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            }
            var minus_times = this.bottom[19] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                this.in_random = true;
                main_ctx.fillStyle = this.color[2];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
          };

        for (var i = 0; i <= bottom_two.length; i++) {
          for (var o = 0; o < this.bottom_two[i]; o++) {
            this.order = 20 + i;
            this.drawY = siceY * 0.5 - this.order * 32 + this.downway;
            this.drawX = this.center - this.bottom_two[i] - this.left_right_two[i];
            	//start making the platforms
            main_ctx.fillStyle = this.color[0];
            main_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height);
            	//start making the Platforms look 'blocky', by adding an additional layer
            background_ctx.fillStyle = this.color[1];
            background_ctx.fillRect(this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY + this.ground_sice,this.width,this.height);
            if (o >= 0 && o < this.bottom_two[i]) // calculates, when to load the grass textures
              {
                if (this.randomgreen[o + this.bottom_two[i]] > 0)
                  main_ctx.drawImage(main_sprite, this.width * this.randomgreen[o + this.bottom_two[i]], this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
                else  
                  main_ctx.drawImage(main_sprite, this.srcgreenX, this.srcgreenY, this.width, this.height, this.drawX * this.width + this.width * o + this.width * 0.5,this.drawY,this.width,this.height)
              }
            var minus_times = this.bottom_two[i] - 2;
            if (this.drawX * this.width + this.width * o + this.width * 0.5 - this.width * minus_times <= player.drawX + this.width && this.drawX * this.width + this.width * o + this.width * 0.5 >= player.drawX &&
                this.drawY - player.groundlevel <= player.drawY + player.height - player.groundlevel && this.drawY + player.height - player.groundlevel >= player.drawY)
              {
                
                if (player.is_upkey == false)
                {
                player.jumpwait = player.max_jump;
                }
                player.max_jump = 75;
                main_ctx.fillStyle = this.color[2];
                
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = true;
              }
              else
              {
                main_ctx.fillStyle = this.color[3];
                main_ctx.fillRect(siceX - this.passed_blocks_bignessX,this.order * this.passed_blocks_bignessY,this.passed_blocks_bignessX,this.passed_blocks_bignessY);
                this.noground[this.order] = false;
              }
            };
          };

          /*
              checks if the player stands on any platform
              i stands for any platform, so that it can be
              checked, if the player stands on it
          */

          for (var i = 0 - 1; i <= this.order; i++)
          {
            if (this.noground[i] == true)
              this.ground[i] = true;
            else
              this.ground[i] = false;
          };
            
            /* 
                checks if the player should die, because he stands on a platform or not.
                additionally, it checks of the player is jumping, or not
            */
            if (player.jumps == false     &&//checks if player jumps, so that the ground does not need to be checked
                this.ground[0] == false   &&//checks for the ground...
                this.ground[1] == false   &&
                this.ground[2] == false   &&
                this.ground[3] == false   &&
                this.ground[4] == false   &&
                this.ground[5] == false   &&
                this.ground[6] == false   &&
                this.ground[7] == false   &&
                this.ground[8] == false   &&
                this.ground[9] == false   &&
                this.ground[10] == false  &&
                this.ground[11] == false  &&
                this.ground[12] == false  &&
                this.ground[13] == false  &&
                this.ground[14] == false  &&
                this.ground[15] == false  &&
                this.ground[16] == false  &&
                this.ground[17] == false  &&
                this.ground[18] == false)
              {
                for (var i = 0; i <= this.bottom_two.length; i++) {
                  if (this.ground[i] == true)
                    this.random_ground_tester = true;
                };
                if (this.random_ground_tester == false)
                  game_over();
                else
                {
                	this.random_ground_tester = false
                	randomeness_level += 1; //count the time spend on platforms
                  player.speedY += randomeness_level * 0.00002;
                }
              }

              this.downway += player.speedY; //makes the level move 'downwards'

    }
}

function cloud_position (value)
{
	started_clouding = true; //detects if this function was already runned
	for (var i = 0; i <= 12; i++)
	{
		if (value >= 0)
		{
			cloudX_one[i] = Math.round(Math.random() * siceX);
			cloudY_one[i] = Math.round(Math.random() * siceY);
			cloud_sice_one[i] = Math.round(Math.random() * 200) + 40;
		}
		if (value <= 0)
		cloudX_two[i] = Math.round(Math.random() * siceX);
		cloudY_two[i] = Math.round(Math.random() * siceY);
		cloud_sice_two[i] = Math.round(Math.random() * 200) + 40;
	};
}

function layer(level, image_draw_y)
{

	if (started_clouding == false || started_clouding == undefined)
	{
		cloud_position(0);
	}


  if (level == 0)
    {
    	this.how_many_clouds = 12;
    	background_downways_one += 1;
    	background_downways_two += 1;
    
    	background_downways_picture_one += 2;
    	background_downways_picture_two += 2;

    background_ctx.drawImage(bg_sprite,0,0,siceX,siceY,0,background_downways_one,siceX,siceY)
    background_ctx.drawImage(bg_sprite,0,0,siceX,siceY,0,background_downways_two,siceX,siceY)

    for (var i = 0; i <= this.how_many_clouds; i++)
    {
    	background_ctx.drawImage(bg_sprite,0,siceY,siceX,siceY,cloudX_one[i],cloudY_one[i] + background_downways_picture_one, cloud_sice_one[i] * 1.5, cloud_sice_one[i])
    	background_ctx.drawImage(bg_sprite,0,siceY,siceX,siceY,cloudX_two[i],cloudY_two[i] + background_downways_picture_two, cloud_sice_two[i] * 1.5, cloud_sice_two[i])
    };

    	if (background_downways_one >= siceY)
    		background_downways_one = 0 - siceY;

    	if (background_downways_two >= siceY)
    		background_downways_two = 0 - siceY;

    	if (background_downways_picture_one >= siceY)
    		background_downways_picture_one = 0 - siceY;

    	if (background_downways_picture_two >= siceY)
    		background_downways_picture_two = 0 - siceY
    }
  if (level == 1)
    player.draw();
                          Level(0);
  if (level == 2)
    player.draw();
                          Level(1);
  if (level == 3)
    player.draw();

  //start controle center
    text_overview();
}

function clear_Reck () //cleans the Fore- and Background, and prints them new
{
	main_ctx.clearRect(0,0,siceX,siceY);
	background_ctx.clearRect(0,0,siceX,siceY);
	layer(0, 1);
}

function loop()
{
  clear_Reck();
  player.draw();
  layer(player.layer);
  if (is_playing)
    requestaframe(loop);

}
function start_loop()
{
  if (set_interval == true)
  {
    setInterval(player.footsteps, player.footsteps_per_second)
  }
  set_interval = false;
  init();
  layer(0);
  is_playing = true;
  loop();
}
function stop_loop()
{
  is_playing = false;
  game_sound = false;
}
 
function game_over () {
  game_sound = false;
  stop_loop();
  	main_ctx.clearRect(0,0,siceX,siceY * 0.5);
  	main_ctx.clearRect(0,0,siceX,siceY * 0.5);
    main_ctx.fillStyle = '#f0f0cc';
  	main_ctx.fillRect(0,0,siceX,siceY * 0.5);
  	main_ctx.fillStyle = '#000000';
  	main_ctx.font = "72px " + font;
  	main_ctx.textBaseline = 'top';
  	main_ctx.fillText("Game Over", siceX * 0.20, siceY * 0.25);
  	main_ctx.font = "19px " + font;
  	main_ctx.fillText("Tap to restart", siceX * 0.40, siceY * 0.45);
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
