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

engine.start = function(mapID, x, y)
{
	engine.viewport.set(x, y);

	engine.map.set(mapID);
	engine.draw();

	engine.keyboard.canInput = true;
};