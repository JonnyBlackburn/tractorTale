engine.tile = {};

engine.tile.images = [];
engine.tile.tileSize = 16;

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

	var rx = x * engine.tile.tileSize + engine.viewport.playerOffsetX;
	var ry = y * engine.tile.tileSize + engine.viewport.playerOffsetY;

	//Draw the ground tile
	engine.handle.drawImage(engine.tile.retrieve(tile.ground), rx, ry);

	//Do we have a item above the ground
	if(tile.item)
	{
		engine.handle.drawImage(engine.tile.retrieve(tile.item), rx, ry);
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