var engine = {}; //Create the engine object

engine.outputHandler = document.getElementById("output");
engine.canvas = document.getElementById("canvas");
engine.handle = engine.canvas.getContext("2d");

engine.output = function(message)
{
	engine.outputHandler.innerHTML += "<br/> " + message; //Print a message to the output div

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
	engine.model.load(0, "player");

	engine.map.set(mapData);
	engine.draw();

	engine.keyboard.canInput = true;

	engine.output("done");
};