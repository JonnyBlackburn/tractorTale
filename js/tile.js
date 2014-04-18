engine.tile = {};

engine.tile.images = [];

engine.tile.store = function(id, imgSrc)
{
	var newid = engine.tile.images.length;
	var tile = [id, new Image(), false] //id#, Image, loaded?

	tile[1].src = imgSrc;
	tile[1].onload = function()
	{
		tile[2] = true;
	}

	engine.tile.images[newid] = tile; //store this tile
}

engine.tile.retrieve = function(id)
{
	var i, len = engine.tile.images.length;

	for(i=0; i<len; i++)
	{
		if(engine.tile.images[i][0] == id)
		{
			return engine.tile.images[i][1]; //return the tile image
		}
	}
}

engine.tile.draw = function(x, y, tile)
{
	//Draw the ground tile
	engine.handle.drawImage(engine.tile.retrieve(tile.ground), x * 16, y * 16);

	//Do we have a item above the ground
	if(tile.item)
	{
		engine.handle.drawImage(engine.tile.retrieve(tile.item), x * 16, y * 16);
	}
};

engine.tile.allLoaded = function()
{
	var i, len = engine.tile.images.length;

	for(i=0; i<len; i++)
	{
		if(engine.tile.images[i][2] === false) //[2] is the loaded boolean
		{
			return false;
		}
	}

	return true;
}