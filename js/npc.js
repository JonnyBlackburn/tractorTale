engine.npc = {};

engine.npc.list = [];

engine.npc.add = function(id, model, x, y)
{
	engine.npc.list[id] = {model: model, x: x, y: y};
};

engine.npc.draw = function(id)
{
	var npc = engine.npc.list[id];
	var loc = engine.model.fixScreenLoc(id, {x: engine.tileSize, y: engine.tileSize});

	var x = (npc.x * engine.tileSize) - (engine.viewport.x * engine.tileSize) + loc.x + engine.viewport.playerOffsetX;
	var y = (npc.y * engine.tileSize) - (engine.viewport.y * engine.tileSize) + loc.y + engine.viewport.playerOffsetX;

	engine.model.draw(npc.model, 6, x, y);
};

engine.npc.isNPCAt = function(x, y)
{
	var i, len = engine.npc.list.length;

	for(i = 0; i < len; i++)
	{
		if(engine.npc.list[i].x == x &&
			engine.npc.list[i].y == y)
		{
			return true;
		}
	}
	return false;
};