engine.keyboard = {};

engine.keyboard.getValue = function(key)
{
	//Keycodes yey!
	switch(key)
	{
		case "up": return 38;
		case "down": return 40;
		case "left": return 37;
		case "right": return 39;

		case "w": return 87;
		case "s": return 83;
		case "a": return 65;
		case "d": return 68;
	}
};

engine.keyboard.parseInput = function(event)
{
	switch(event.keyCode)
	{
		case engine.keyboard.getValue("up"):
		case engine.keyboard.getValue("w"):
			engine.viewport.y--;
			engine.player.spriteIndex = 0;
			break;

		case engine.keyboard.getValue("down"):
		case engine.keyboard.getValue("s"):
			engine.viewport.y++;
			engine.player.spriteIndex = 6;
			break;

		case engine.keyboard.getValue("left"):
		case engine.keyboard.getValue("a"):
			engine.viewport.x--;
			engine.player.spriteIndex = 9;
			break;

		case engine.keyboard.getValue("right"):
		case engine.keyboard.getValue("d"):
			engine.viewport.x++;
			engine.player.spriteIndex = 3;
			break;
	}

	engine.draw();
};