engine.script = {};

engine.script.call =
	[
		function()
		{
			engine.map.set(maptwo);
			engine.viewport.x = -4;
			engine.viewport.y = 1;
			engine.player.spriteIndex = 6;

			engine.draw();
		},

		function()
		{
			engine.map.set(mapone);
			engine.viewport.x = -4;
			engine.viewport.y = 5;
			engine.player.spriteIndex = 6;

			engine.draw();
		},

		function()
		{
			engine.output("I'm in ur caves, scriptin ur science!");
		}
	]