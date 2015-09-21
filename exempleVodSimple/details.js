require.def("vod/details",
	[
		"antie/widgets/component",
		"antie/widgets/button",
		"antie/widgets/label",
		"antie/widgets/media",
		"antie/widgets/verticallist"
	],
	function(Component,Button,Label,Media,VerticalList){
		return Component.extend(
		{
			init: function(){
				var self= this;
				this._super("details");
                
                //afficher les details
                this.appendChildWidget(new Label("details video"));
			}
		});
	}
);