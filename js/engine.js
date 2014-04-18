var engine = {}; //Create the engine object

engine.outputHandler = document.getElementById("output");
engine.canvas = document.getElementById("canvas");
engine.handle = engine.canvas.getContext("2d");
engine.tileSize = 16;
engine.onscreenTimer = null;

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
		engine.npc.draw(0);
		engine.npc.draw(1);
	}
};

engine.start = function(mapID, x, y)
{
	engine.viewport.set(x, y);

	engine.map.set(mapID);
	engine.draw();

	engine.onscreenTimer = setInterval(engine.map.onscreen, 500);

	engine.keyboard.canInput = true;
};

engine.combineObjects = function(/* arguments */)
{
	var i, prop, len = arguments.length, nobj = {};

	for(i = 0; i < len; i++)
	{
		for(prop in arguments[i])
		{
			nobj[prop] = arguments[i][prop];
		}
	}

	return nobj;
};