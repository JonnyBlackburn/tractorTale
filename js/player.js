engine.player = {};

engine.player.sprite = [];
engine.player.spriteIndex = 6;
engine.player.leftLeg = false;

engine.player.store = function(index, imgSrc)
{
	var sprite = [new Image(), false];

	sprite[0].src = imgSrc;
	sprite[0].onLoad = function()
	{
		sprite[1] = true;
	}

	engine.player.sprite[index] = sprite;
};

engine.player.retrieve = function(index)
{
	return engine.player.sprite[index][0];
};

engine.player.allLoaded = function()
{
	var i;

	////Have the images loaded?
	for(i=0; i<12; i++)
	{
		if(engine.player.sprite[i][1] === false)
		{
			return false;
		}
	}

	return true;
};

engine.player.calcLocation = function()
{
	var character = {
		width: Math.ceil(engine.player.sprite[0][0].width),
		height: Math.ceil(engine.player.sprite[0][0].height)
	};

	var screen = {
		width: engine.screen.width,
		height: engine.screen.height
	}

	//center the character
	var x = (screen.width / 2) - (character.width / 2);
	var y = (screen.height / 2) + 8 - (character.height);

	return {left:x, top: y};
}

engine.player.draw = function()
{
	var loc = engine.player.calcLocation();

	engine.handle.drawImage(engine.player.retrieve(engine.player.spriteIndex), loc.left, loc.top);
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

	if(engine.currentMap[targetY] &&
		engine.currentMap[targetY][targetX] &&
		(engine.currentMap[targetY][targetX].item == 2 ||
		engine.currentMap[targetY][targetX].item == 6))
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

	if(engine.currentMap[currentTileY] &&
		engine.currentMap[currentTileY][currentTileX] &&
		engine.currentMap[currentTileY][currentTileX].onenter != undefined)
	{
		engine.script.call[engine.currentMap[currentTileY][currentTileX].onenter]();
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

	if(engine.currentMap[y] &&
		engine.currentMap[y][x] &&
		engine.currentMap[y][x].onactivate != undefined)
	{
		engine.script.call[engine.currentMap[y][x].onactivate]();
	}
}