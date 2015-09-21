/*
* module: texte.js
* description: permet d'afficher du texte 
*
*/

require.def("vod/texte",
	[
		"antie/widgets/component",
		"antie/widgets/textpager",
		"antie/widgets/button",
		"antie/widgets/label"
	],
	function(Component, TextPager, Button, Label){
		/**
         * <DESCRIPTION>
         * @name vod.appui.components.texte
         * @class
         * @extends antie.widgets.TextPager
         * @requires ...
         */
		return Component.extend({

			init: function(){
				var self=this;

				//constructeur
			console.log("log");
				this._super("texte");
				//this.setText("Cette application est la premiere qui sert de teste");

				//texte a afficher
				this._texte = new TextPager("afficherTexte");

			//	console.log(this.getText());
				

				var quitterButton = new Button("quitterButtonTexte");
                quitterButton.appendChildWidget(new Label("labQuitterButtonTexte","Retour"));
                quitterButton.addEventListener("select", function(evt){
                		console.log(self.parentWidget);
                        self.parentWidget.back();
                    });

                console.log(self.parentWidget);
                
                this.appendChildWidget(this._texte);
                this.appendChildWidget(quitterButton);

                this.addEventListener("beforerender", function(evt){
						console.log(evt.args.leTexte);
						self._texte.setText(evt.args.leTexte);
					});
				// calls Application.ready() the first time the component is shown
                // the callback removes itself once it's fired to avoid multiple calls.
                this.addEventListener("aftershow", function appReady(evt) {
                    self.getCurrentApplication().ready();
                    self.removeEventListener('aftershow', appReady);
                });
			}
		});
	}

);