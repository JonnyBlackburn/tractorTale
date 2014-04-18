engine.script = {};

engine.script.list = [];

engine.script.call = function(id)
{
	var scriptString = engine.script.list[id];

	eval("(function eval_csf(){" + scriptString + "})();");
};

engine.script.add = function(id, data)
{
	engine.script.list[id] = data;
};