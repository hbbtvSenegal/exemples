require.def("vod/entete",
	[
		"antie/widgets/component",
		"antie/widgets/button",
		"antie/widgets/label",
		"antie/widgets/media",
		"antie/widgets/verticallist",
		"antie/widgets/textpager"
	],
	function(Component,Button,Label,Media,VerticalList,TextPager){
		return Component.extend(
		{
			init: function(){
				var self= this;
				this._super("entete");
				var titre= new TextPager("titreEntete");
				titre.setText("voici le label");
				this.appendChildWidget(titre);
			}
		});
	}
);