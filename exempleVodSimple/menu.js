require.def("vod/menu",
	[
		"antie/widgets/component",
		"antie/widgets/button",
		"antie/widgets/label",
		"antie/widgets/media",
		"antie/widgets/verticallist",
		"vod/details"
	],
	function(Component,Button,Label,Media,VerticalList,Details){
		return Component.extend(
		{
			init: function(){
				var self= this;
				this._super("menu");

				var details= new Details();
				//bouton du menu
				var apropos,listeVideo;
				//bouton liste des videos
				listeVideo = this._listeVideo(details);

                //bouton a  propos
                apropos = new Button("apropos");
                apropos.appendChildWidget(new Label("A propos..."));


                /****************menu verticale*****************/
                verticalListMenu = new VerticalList("le_menu");
                verticalListMenu.appendChildWidget(listeVideo);
                verticalListMenu.appendChildWidget(apropos);

                //ajouter le menu
                this.appendChildWidget(verticalListMenu);
			},
			_listeVideo: function(conteneur)
			{
				var self= this;
				listeVideo=new Button("listeVideo");
				listeVideo.addEventListener("select", function(evt){
						//visualiser le frame details
						conteneur.appendChildWidget(new Label("nouveau video"));
					}
				);
				listeVideo.appendChildWidget(new Label("Liste des videos"));
				return listeVideo;
			},
			_afficheApropos: function()
			{

			}
		});
	}
);