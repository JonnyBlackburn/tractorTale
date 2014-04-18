engine.player = {};

engine.player.sprite = [];
engine.player.spriteIndex = 6;
engine.player.model = 0;
engine.player.leftLeg = false;

engine.player.draw = function()
{
	if(!engine.model.isLoaded(engine.player.model))
	{
		engine.output("[player.draw] loading model");
		setTimeout(engine.player.draw, 10);
	} else {
		var loc = engine.model.screenLocation(engine.player.model);

		engine.handle.drawImage(engine.model.list[engine.player.model][engine.player.spriteIndex][0], loc.x, loc.y);
	}
};

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

	var targetX = engine.viewport.x + (engine.screen.tilesX / 2 - 0.5) - x;
	var targetY = engine.viewport.y + (engine.screen.tilesY / 2 - 0.5) - y;

	if(engine.map.current[targetY] &&
		engine.map.current[targetY][targetX] &&
		engine.map.current[targetY][targetX].solid &&
		engine.map.current[targetY][targetX].solid == 1)
	{
		//the tile is blocked, don't move, but re-enable input
		engine.keyboard.canInput = true;
	} else {
		engine.viewport.playerOffsetX = x * 5; //We only added one before, so move the player the correct amount
		engine.viewport.playerOffsetY = y * 5; //We only added one before, so move the player the correct amount

		setTimeout(engine.player.animate, 200);
		setTimeout(engine.player.reset, 400);
	}

	engine.player.spriteIndex = index;
	engine.draw();
};

engine.player.animate = function()
{
	var x, y;
	x = y = 0;

	switch(engine.player.spriteIndex)
	{
		case 0:
			y = 11;
			break;

		case 3:
			x = -11;
			break;

		case 6:
			y = -11;
			break;

		case 9:
			x = 11;
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

	if(engine.map.current[currentTileY] &&
		engine.map.current[currentTileY][currentTileX] &&
		engine.map.current[currentTileY][currentTileX].onenter != undefined)
	{
		engine.script.call[engine.map.current[currentTileY][currentTileX].onenter]();
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

	if(engine.map.current[y] &&
		engine.map.current[y][x] &&
		engine.map.current[y][x].onactivate != undefined)
	{
		engine.script.call[engine.map.current[y][x].onactivate]();
	}
}