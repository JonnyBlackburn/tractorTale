engine.model = {};

engine.model.list = [];

engine.model.load = function(id, folder)
{
	var i, imgNames = ["up1", "up2", "up3", "right1", "right2", "right3", "down1", "down2", "down3", "left1", "left2", "left3"];;

	engine.model.list[id] = [];

	for(i = 0; i < 12; i++)
	{
		engine.model.list[id][i] = [new Image(), false];

		engine.model.list[id][i][0].src = "img/" + folder + "/" + imgNames[i] + ".png";
		engine.model.list[id][i][0].onload = function(modelID, modelIndex)
		{
			return function()
			{
				engine.model.list[modelID][modelIndex][1] = true;
			}
		}(id, i);
	}
};

engine.model.isLoaded = function(id)
{
	var i;

	//Have the images loaded?
	for(i = 0; i < 12; i++)
	{
		if(engine.model.list[id][i][1] === false)
		{
			return false;
		}
	}

	return true;
};


engine.model.screenLocation = function(id)
{
	var character = {
		width: Math.ceil(engine.model.list[id][0][0].width),
		height: Math.ceil(engine.model.list[id][0][0].height)
	};

	var screen = {
		width: engine.screen.width,
		height: engine.screen.height
	};

	//center the character
	var x = (screen.width / 2) - (character.width / 2);
	var y = (screen.height / 2) - (character.height) + 8;

	return {x: Math.ceil(x), y: Math.ceil(y)};
};