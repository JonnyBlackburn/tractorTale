engine.keyboard = {};

engine.keyboard.canInput = false;

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

		case "ctrl": return 17;
	}
};

engine.keyboard.parseInput = function(event)
{
	if(engine.keyboard.canInput === true)
	{
		switch(event.keyCode)
		{
			case engine.keyboard.getValue("up"):
			case engine.keyboard.getValue("w"):
				engine.player.move("up");
				break;

			case engine.keyboard.getValue("down"):
			case engine.keyboard.getValue("s"):
				engine.player.move("down");
				break;

			case engine.keyboard.getValue("left"):
			case engine.keyboard.getValue("a"):
				engine.player.move("left");
				break;

			case engine.keyboard.getValue("right"):
			case engine.keyboard.getValue("d"):
				engine.player.move("right");
				break;

			case engine.keyboard.getValue("ctrl"):
				engine.player.activate();
				break;
		}
	}
};