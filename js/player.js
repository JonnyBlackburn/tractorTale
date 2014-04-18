engine.player = {};

engine.player.sprite = [];
engine.player.spriteIndex = 6;
engine.player.model = 0;
engine.player.leftLeg = false;

engine.player.draw = function()
{
	var loc = engine.model.fixScreenLoc(engine.player.model, {x: engine.screen.width, y: engine.screen.height});

	engine.model.draw(engine.player.model, engine.player.spriteIndex, loc.x, loc.y);
}

engine.player.move = function(dir)
{
	var index, x, y;

	index = x = y = 0;

	engine.keyboard.canInput = false; //disable input until all animations are done

	//only adding/subtracting 1 so we can do collision
	switch(dir)
	{
		case "up":
			index = 0;
			y = 1;
			break;

		case "right":
			index = 3;
			x = -1;
			break;

		case "down":
			index = 6;
			y = -1;
			break;

		case "left":
			index = 9;
			x = 1;
			break;
	}

	//What tile do we want to move to
	var targetX = engine.viewport.x + (engine.screen.tilesX / 2 - 0.5) - x;
	var targetY = engine.viewport.y + (engine.screen.tilesY / 2 - 0.5) - y;

	var targetTile = engine.map.get(targetX, targetY);

	if(engine.map.tileHasProperty(targetTile, "solid", 1) ||
		engine.npc.isNPCAt(targetX, targetY))
	{
		//the tile is blocked, don't move, but re-enable input
		engine.keyboard.canInput = true;
	} else {
		engine.viewport.playerOffsetX = x * Math.ceil(5 / 16 * engine.tileSize); //We only added one before, so move the player the correct amount
		engine.viewport.playerOffsetY = y * Math.ceil(5 / 16 * engine.tileSize);

		setTimeout(engine.player.animate, 200);
		setTimeout(engine.player.reset, 400);
	}

	engine.player.spriteIndex = index;
	engine.draw();
};

engine.player.animate = function()
{
	var x, y, px;
	x = y = 0;

	px = Math.ceil(11 / 16 * engine.tileSize);

	switch(engine.player.spriteIndex)
	{
		case 0:
			y = px;
			break;

		case 3:
			x = -px;
			break;

		case 6:
			y = -px;
			break;

		case 9:
			x = px;
			break;
	}

	engine.player.spriteIndex += (engine.player.leftLeg === true) ? 1 : 2;

	//switch legs in the animation
	engine.player.leftLeft = !engine.player.leftLeg;

	engine.viewport.playerOffsetX = x;
	engine.viewport.playerOffsetY = y;

	engine.draw();
};

engine.player.reset = function()
{
	var index, x, y;

	index = 0;
	x = engine.viewport.x;
	y = engine.viewport.y;

	switch(engine.player.spriteIndex)
	{
		case 1:
		case 2:
			y--;
			index = 0;
			break;

		case 4:
		case 5:
			x++;
			index = 3;
			break;

		case 7:
		case 8:
			y++;
			index = 6;
			break;

		case 10:
		case 11:
			x--;
			index = 9;
			break;
	}

	engine.viewport.x = x;
	engine.viewport.y = y;
	engine.viewport.playerOffsetX = 0;
	engine.viewport.playerOffsetY = 0;

	engine.keyboard.canInput = true;

	engine.player.spriteIndex = index;

	engine.draw();

	var currentTileX = x + (engine.screen.tilesX / 2 - 0.5);
	var currentTileY = y + (engine.screen.tilesY / 2 - 0.5);

	var currentTile = engine.map.get(currentTileX, currentTileY);

	if(engine.map.tileHasProperty(currentTile, "onenter"))
	{
		var scriptID = currentTile.onenter;
		engine.script.call(scriptID);
	}
};

engine.player.activate = function()
{
	//What tile are we looking at?
	var x = engine.viewport.x + (engine.screen.tilesX / 2 - 0.5);
	var y = engine.viewport.y + (engine.screen.tilesY / 2 - 0.5);

	//facing direction
	switch(engine.player.spriteIndex)
	{
		case 0:
			y--;
			break;

		case 3:
			x++;
			break;

		case 6:
			y--;
			break;

		case 9:
			x--;
			break;
	}

	var lookingAtTile = engine.map.get(x, y);

	if(engine.map.tileHasProperty(lookingAtTile, "onactivate"))
	{
		var scriptID = lookingAtTile.onactivate;
		engine.script.call(scriptID);
	}
}