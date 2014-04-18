engine.map = {};

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

			tile = (engine.currentMap[mapY] && engine.currentMap[mapY][mapX] ? engine.currentMap[mapY][mapX] : {ground: 0});

			engine.tile.draw(i, j, tile);
		}
	}
};