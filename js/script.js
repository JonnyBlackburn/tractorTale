engine.script = {};

engine.script.call =
	[
		function()
		{
			engine.setMap(maptwo);
			engine.viewport.x = -2;
			engine.viewport.y = 1;
			engine.player.spriteIndex = 6;

			engine.draw();
		},

		function()
		{
			engine.stMap(mapone);
			engine.viewport.x = -2;
			engine.viewport.y = 5;
			engine.player.spriteIndex = 6;

			engine.draw();
		}
	]