engine.map = {};

engine.map.current = -1;
engine.map.list = [];

engine.map.set = function(mapID)
{
	engine.map.current = mapID;
};

engine.map.draw = function()
{
	var i, j, tile; //the x and y for the loop
	var mapX = 0;
	var mapY = 0;
	var iMax = engine.screen.tilesX + engine.viewport.overflowTile;
	var jMax = engine.screen.tilesY + engine.viewport.overflowTile;

	for(j = -engine.viewport.overflowTile; j < jMax; j++)
	{
		for(i = -engine.viewport.overflowTile; i < iMax; i++)
		{
			mapX = i + engine.viewport.x;
			mapY = j + engine.viewport.y;

			tile = engine.map.get(mapX, mapY);

			if(tile === undefined)
			{
				tile = {ground: 0};

			}
			engine.tile.draw(i, j, tile);
		}
	}
};

engine.map.tileHasProperty = function(tile, property, value)
{
	if(tile !== undefined && tile[property] !== undefined)
	{
		if(value !== undefined)
		{
			return tile[property] == value;
		}
		return true;
	} else {
		return false;
	}
};

engine.map.get = function(x, y)
{
	if(engine.map.list[engine.map.current][y] &&
		engine.map.list[engine.map.current][y][x])
	{
		return engine.map.list[engine.map.current][y][x];
	} else {
		return undefined;
	}
};

