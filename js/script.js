engine.script = {};

engine.script.list = [];

engine.script.call = function(id, context)
{
	var scriptString = engine.script.list[id];

	eval("(function eval_csf(){" + scriptString + "})(" + JSON.stringify(context) + ");");
};

engine.script.add = function(id, data)
{
	engine.script.list[id] = data;
};