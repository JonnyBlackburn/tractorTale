engine.data = {};

engine.data.load = function(dataFile, callback)
{
	engine.data.request(dataFile, callback);
};

engine.data.request = function(file, callback)
{
	var handle = new XMLHttpRequest();

	if(handle.overrideMimeType)
	{
		handle.overrideMimeType("application/json");
	}

	engine.output("[Engine.data.request] loading map file " + file);

	handle.open("get", file, true);

	handle.addEventListener("readystatechange", function()
	{
		if(this.readyState == 4 && this.status != 404)
		{
			engine.data.parse(this.responseText, callback);
		}
	}, false);

	handle.send(null);
};

engine.data.parse = function(response, callback)
{
	var i, json = JSON.parse(response.replace(/\n/g, ''));

	engine.map.list[json.mapID] = json.level;

	for(i = 0; i < json.tiles.length; i++)
	{
		engine.tile.store(json.tiles[i].id, json.tiles[i].src);
	}

	for(i = 0; i < json.models.length; i++)
	{
		engine.model.load(json.models[i].id, json.models[i].name);
	}

	for(i = 0; i < json.npcs.length; i++)
	{
		engine.npc.add(json.npcs[i].id, json.npcs[i].model, json.npcs[i].x, json.npcs[i].y);
	}

	for(i = 0; i < json.scripts.length; i++)
	{
		engine.script.add(json.scripts[i].id, json.scripts[i].data);
	}

	if(callback)
	{
		callback();
	}
}