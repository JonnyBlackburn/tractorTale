engine.player = {};

engine.player.sprite = [];
engine.player.spriteIndex = 6;

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
	var x = (screen.width / 2);
	var y = (screen.height / 2) - (character.height);

	return {left:x, top: y};
}

engine.player.draw = function()
{
	var loc = engine.player.calcLocation();

	engine.handle.drawImage(engine.player.retrieve(engine.player.spriteIndex), loc.left, loc.top);
};