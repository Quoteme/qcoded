//Global Variables
    //colors
        var head_color      = '#fff';
        var button_color    = '#fff';
        var text_color      = '#0a9';
        var bg_color        = '#0a9';
    // Level Colors
        var Level_1_color   = bg_color;
    // texts
        var main_font       = 'Courier New';
        var title_text      = window.innerWidth / 10 + 'px';
        var choose_text     = '32px';


function init(){
    main_canvas = document.getElementById('main_canvas');
    stage = new createjs.Stage(main_canvas);
    main_canvas.addEventListener("mousemove", mouselocation, false)

    resize();
    splash();
    loop();
}

function resize(){ // resize the canvas
    main_canvas.width = window.innerWidth;
    main_canvas.height = window.innerHeight;
}


function mouselocation(event){
    cx = event.pageX;
    cy = event.pageY;
}

function splash(){ 									// draw little "boot splash"
    circle_width = 50;
    splash.x = main_canvas.width / 5;
    splash.y = main_canvas.height / 5;

    circle = new Array();

    circle[0] = new createjs.Shape();
    circle[0].graphics.beginFill("#000").drawCircle(splash.x, splash.y, circle_width);
    circle[0].x = main_canvas.width / 8;
    circle[0].y = main_canvas.height / 4;
    stage.addChild(circle[0]);
    circle[1] = new createjs.Shape();
    circle[1].graphics.beginFill("#0f6").drawCircle(splash.x, splash.y, circle_width);
    circle[1].x = main_canvas.width / 2;
    circle[1].y = main_canvas.height / 4;
    stage.addChild(circle[1]);
    var text = new createjs.Text('Made 2015\nby Luca Happel', main_canvas.height / 20 + 'px Courier New', '#000');
    text.x = main_canvas.width;
    text.y = main_canvas.height - main_canvas.height / 20;
    text.textBaseline = "bottom";
    text.textAlign = "right";
    stage.addChild(text);

    createjs.Tween.get(circle[0], { loop: false, override:true })
        .to({ x: main_canvas.width / 3, y: main_canvas.height / 7}, 1000, createjs.Ease.getPowInOut(10))
        .to({ alpha: 0}, 500)

    createjs.Tween.get(circle[1], { loop: false, override:true })
        .to({ x: main_canvas.width / 3, y: main_canvas.height / 7}, 1000, createjs.Ease.getPowInOut(10))
        .to({ alpha: 0 }, 500)
        .call(menu)
}

function menu(){
    clear( bg_color );
    // print Head
        var text = new createjs.Text('Super Platform\nLand 2', title_text + ' ' + main_font, head_color);
        text.x = main_canvas.width / 2;
        text.y = main_canvas.height / 3;
        text.textBaseline = "bottom";
        text.textAlign = "center";
        stage.addChild(text);

    // print startbutton
        rect = new createjs.Shape();
        rect.y = 50;
        rect.x = 300;
        rect.ypos =  main_canvas.height / 2 - rect.y;
        rect.xpos = main_canvas.width / 2 - rect.x * 1.5;
        rect.graphics.beginFill( button_color ).rect( rect.xpos, rect.ypos, rect.x, rect.y);
        createjs.Tween.get(rect, { loop: true, override:true })
            .to({ alpha: 0.8 }, 1500)
            .to({ alpha: 1 }, 1500)
        stage.addChild(rect);

    // draw text on button
        var button_text = new createjs.Text('Start', choose_text + ' ' + main_font, text_color);
        button_text.x = rect.xpos + rect.x * 1.50;
        button_text.y = rect.ypos + rect.y + 5;
        button_text.textAlign = "center";
        stage.addChild(button_text);

    rect.addEventListener("click", handleClick, false);
    button_text.addEventListener("click", handleClick, false);

    function handleClick(event) {
        // fading out splash
            createjs.Tween.get(button_text, { loop: false, override:true })
                .to({ y: main_canvas.height}, 1000, createjs.Ease.getPowInOut(10));

            createjs.Tween.get(rect, { loop: false, override:true })
                .to({ y: main_canvas.height}, 1000, createjs.Ease.getPowInOut(10));

            createjs.Tween.get(text, { loop: false, override:true })
                .wait(300)
                .to({ y: -100}, 1000, createjs.Ease.getPowInOut(10));

        setTimeout(function () { // set a delay so animation can fade out
            Level_select();
        }, 1000);
    }
}

function Level_select(){
    clear( bg_color );
    // Variables
        Level_select_button     = new Array();
        Level_select_text       = new Array();
        Level_select_height     = 60;
        Level_select_width      = 50;
        Level_padding           = 15;
        Level_marging_right     = 0;
        Level_button_margin     = main_canvas.width / 20;
        var Levels = 6;

    // Headline
        var text = new createjs.Text( 'Level Select' , title_text + ' ' + main_font, head_color);
        text.x = main_canvas.width / 2;
        text.y = 0;
        text.textBaseline = "bottom";
        text.textAlign = "center";
        createjs.Tween.get(text, { loop: false, override:true })
            .to({ y: main_canvas.height / 6}, 1000, createjs.Ease.getPowInOut(10));

    // Level Select Buttons
        for (i = 0; i < Levels; i++) {
            // Shapes
                Level_select_button[i]      = new createjs.Shape();
                Level_select_button[i].y    = main_canvas.height;
                Level_select_button[i].x    = main_canvas.width / ( Levels * 1.5) + Level_button_margin * i - Level_marging_right;
                Level_select_button[i].graphics.beginFill( button_color ).rect( Level_select_button[i].x, Level_select_button[i].y, Level_select_width, Level_select_height);

                Level_select_text[i] = new createjs.Text( i + 1 , choose_text + ' ' + main_font, text_color);
                Level_select_text[i].y      = main_canvas.height / 2 + Level_padding;
                Level_select_text[i].x      = Level_select_button[i].x + Level_select_button[i].x + Level_padding;

            // Move Objekts
            createjs.Tween.get(Level_select_button[i], { loop: false, override:true })
                .wait(100)
                .wait(100 * i)
                .to({ y: - main_canvas.height / 2}, 1000, createjs.Ease.getPowInOut(10));

            // Add To Stage
                stage.addChild(Level_select_button[i]);
                stage.addChild(Level_select_text[i]);
        }

        // On Touch (due to problems with memory, loops cannot be used here)
            Level_select_button[0].addEventListener("click", function(){start(0)}, false );
            Level_select_text[0].addEventListener("click", function(){start(0)} , false );
            Level_select_button[1].addEventListener("click", function(){start(1)}, false );
            Level_select_text[1].addEventListener("click", function(){start(1)} , false );
            Level_select_button[2].addEventListener("click", function(){start(2)}, false );
            Level_select_text[2].addEventListener("click", function(){start(2)} , false );
            Level_select_button[3].addEventListener("click", function(){start(3)}, false );
            Level_select_text[3].addEventListener("click", function(){start(3)} , false );
            Level_select_button[4].addEventListener("click", function(){start(4)}, false );
            Level_select_text[4].addEventListener("click", function(){start(4)} , false );
            Level_select_button[5].addEventListener("click", function(){start(5)}, false );
            Level_select_text[5].addEventListener("click", function(){start(5)} , false );



    // Add To Stage
        stage.addChild(text);
}

function start(Level){
    clear( bg_color );

    if (Level == 0)
        stage_1();
    else
        Level_select();
}

function stage_1(){
    // tiles
        tiles = new Array();
        tiles = ['empty', 'break', 'ground', 'top_ground', 'bot_ground',
                'left_ground', 'right_ground', 'top_right_ground', 'top_left_ground', 'full_ground']
    // Variables
        stage_1.x         = 0;
        stage_1.y         = 0;
        stage_1.whole_size= 12; // stage size, left to right in tiles
        stage_1.size      = 70;
        console.log(stage_1.size)
        stage_1.xpos      = main_canvas.width / 2 - stage_1.size * stage_1.whole_size * 0.5;
        stage_1.ypos      = main_canvas.height / 1 - stage_1.size;
        stage_1.speed     = 1;
        stage_1.gone_down = 0;
        stage_1.layer     = 0;
        stage_1.go_right  = 0;
        tile            = new Array();
        tile.color      = new Array();
        filler_tile     = new Array();
        tile.color =[ '', '', '#0c5', '#222', '#222', '', '#222', '#222', '#222', '#222']
        current_bg      = Level_1_color;
        ground_h_size   = stage_1.size / 2;
        ground_v_size   = stage_1.size / 4;

        clear( current_bg )

        Map_1 = new Array();
        Map_1 =    [0,5,2,2,2,2,6,0,0,0,0,0,1,
                    0,0,5,2,2,2,6,0,0,0,0,0,1,
                    0,0,0,3,2,2,6,0,0,0,0,0,1,
                    0,0,5,2,2,2,7,0,3,0,0,0,1,
                    0,0,3,2,2,2,2,6,2,7,3,0,1,
                    0,5,2,2,2,2,2,7,0,2,2,0,1,
                    0,0,5,2,7,2,2,2,7,0,0,0,1,
                    0,0,5,2,2,2,2,2,2,6,0,0,1,];

    for (i = 0; i < Map_1.length; i++){
        //console.log(Map_1[i]);
        for (j = 0; j < tiles.length; j++)
        {
            if (Map_1[i] == j){     // What happenes when a tile is detected
                // create tile
                    tile[i]         = new createjs.Shape();
                    tile[i].xpos    = stage_1.xpos + stage_1.x + stage_1.size * stage_1.go_right;
                    tile[i].ypos    = stage_1.ypos + stage_1.y + stage_1.gone_down - stage_1.layer * stage_1.size;
                    tile[i].graphics.beginFill( tile.color[j] ).rect( tile[i].xpos, tile[i].ypos, stage_1.size, stage_1.size);

                // add to stage
                    stage.addChild(tile[i]);

                // add fillers for tiles with borders
                    if (j == 3){
                        filler_tile[i]          = new createjs.Shape();
                        filler_tile[i].xpos     = tile[i].xpos;
                        filler_tile[i].ypos     = tile[i].ypos + ground_h_size;
                        filler_tile[i].graphics.beginFill( current_bg ).rect( filler_tile[i].xpos, filler_tile[i].ypos, stage_1.size, ground_h_size);
                        stage.addChild(filler_tile[i])
                    }
                    else if (j == 6){
                        filler_tile[i]          = new createjs.Shape();
                        filler_tile[i].xpos     = tile[i].xpos + ground_v_size;
                        filler_tile[i].ypos     = tile[i].ypos;
                        filler_tile[i].graphics.beginFill( current_bg ).rect( filler_tile[i].xpos, filler_tile[i].ypos, stage_1.size - ground_v_size, stage_1.size);
                        stage.addChild(filler_tile[i])
                    }
                    else if (j == 7){
                        filler_tile[i]          = new createjs.Shape();
                        filler_tile[i].xpos     = tile[i].xpos + ground_v_size;
                        filler_tile[i].ypos     = tile[i].ypos + ground_h_size;
                        filler_tile[i].graphics.beginFill( current_bg ).rect( filler_tile[i].xpos, filler_tile[i].ypos, stage_1.size - ground_v_size, ground_h_size);
                        stage.addChild(filler_tile[i])
                    }else{
                        filler_tile[i]          = new createjs.Shape();
                        filler_tile[i].graphics.beginFill( current_bg ).rect( 0, 0, 0, 0);
                        stage.addChild(filler_tile[i])
                    }

                // variables to add to every tile load
                    stage_1.go_right += 1;

                // break line
                    if (tiles[j] == tiles[1]){
                        stage_1.layer     += 1;
                        stage_1.go_right  = 0;
                    }
            }
        }
    }
    createjs.Ticker.addEventListener("tick", stage_1_loop);
    function stage_1_loop() {
        stage_1.gone_down+= stage_1.speed;

        for(i = 1; i < Map_1.length; i++){
            createjs.Tween.get(tile[i], { loop: false, override:true })
                .to({ y: + stage_1.gone_down}, 0, createjs.Ease.getPowInOut(1));
            createjs.Tween.get(filler_tile[i], { loop: false, override:true })
                .to({ y: + stage_1.gone_down}, 0, createjs.Ease.getPowInOut(1));
        }
    }
}

function clear( color ){
    bg = new createjs.Shape();
    bg.graphics.beginFill( color ).rect( 0, 0, main_canvas.width, main_canvas.height);
    stage.addChild(bg);
}

function loop(){ // refresh the screen
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

    createjs.Ticker.addEventListener("tick", main_loop);
    function main_loop() {
        // code here executes every frame
    }
}
