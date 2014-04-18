engine.viewport = {};

engine.viewport.x = 0;
engine.viewport.y = 0;

engine.viewport.playerOffsetX = 0;
engine.viewport.playerOffsetY = 0;

engine.viewport.overflowTile = 1; //Draws x number of extra tiles outside the viewport

engine.viewport.set = function(x, y)
{
	var vx = x - (engine.screen.width  - engine.tile.tileSize) / 32;
	var vy = y - (engine.screen.height - engine.tile.tileSize) / 32;

	engine.viewport.x = vx;
	engine.viewport.y = vy;
};