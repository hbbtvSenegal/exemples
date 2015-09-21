require.def("/vod/teste_media",
	[
		"antie/devices/mediaplayer/live/playable",
		"antie/widgets/component"
	],
	function(Playable, Component){
		return Component.extend({
			init: function(){
				var self= this;
				this._super("teste_media");

				var player = new Playable();
				player.setSource("live-video","http://10.42.0.1:8080","mime/type");
				this.appendChildWidget(player);
				this.addEventListener("before", function(evt){
					player.beginPlayback();
				})
				
			}
		});
	}
);