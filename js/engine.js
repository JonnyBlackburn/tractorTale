var engine = {}; //Create the engine object

engine.outputHandler = document.getElementById("output");
engine.canvas = document.getElementById("canvas");
engine.handle = engine.canvas.getContext("2d");
engine.currentMap = null;

engine.output = function(message)
{
	engine.outputHandler.innerHTML += "<br/> " + message; //Print a message to the output div

};

engine.setMap = function(mapData)
{
	engine.currentMap = mapData;
};

engine.draw = function(mapData)
{
	if(engine.tile.allLoaded() === false)
	{
		setTimeout(engine.draw, 100);
	} else {
		engine.map.draw();
		engine.player.draw();
	}
};

engine.start = function(mapData, x, y)
{
	engine.output("starting...");

	engine.viewport.x = x;
	engine.viewport.y = y;

	//Get the tiles
	engine.tile.store(0, 'img/tile_black.png'); //undefined tile
	engine.tile.store(1, 'img/tile_grass.png');
	engine.tile.store(2, 'img/tile_rock.png');
	engine.tile.store(3, 'img/ladderdown.png');
	engine.tile.store(4, 'img/ladderup.png');
	engine.tile.store(5, 'img/cave.png');
	engine.tile.store(6, 'img/sign.png');

	//Get player images
	engine.player.store(0, 'img/player/up1.png');
	engine.player.store(1, 'img/player/up2.png');
	engine.player.store(2, 'img/player/up3.png');

	engine.player.store(3, 'img/player/right1.png');
	engine.player.store(4, 'img/player/right2.png');
	engine.player.store(5, 'img/player/right3.png');

	engine.player.store(6, 'img/player/down1.png');
	engine.player.store(7, 'img/player/down2.png');
	engine.player.store(8, 'img/player/down3.png');

	engine.player.store(9,  'img/player/left1.png');
	engine.player.store(10, 'img/player/left2.png');
	engine.player.store(11, 'img/player/left3.png');

	engine.setMap(mapData);
	engine.draw();

	engine.keyboard.canInput = true;

	engine.output("done");
};