/*
* module: texte.js
* description: permet d'afficher du texte 
*
*/

require.def("vod/texte",
	[
		"antie/widgets/textpager",
		"antie/widgets/button",
		"antie/widgets/label"
	],
	function(TextPager, Button, Label){
		/**
         * <DESCRIPTION>
         * @name vod.appui.components.texte
         * @class
         * @extends antie.widgets.TextPager
         * @requires ...
         */
		return TextPager.extend({

			init: function(){
				var self=this;

				//constructeur
			//console.log("log");
				this._super("texte");
				//this.setText("Cette application est la premiere qui sert de teste");

			//	console.log(this.getText());
				this.addEventListener("beforerender", function(evt){
						//console.log(evt.args.leTexte);
						self.setText(evt.args.leTexte);
					});

				var quitterButton = new Button("quitterButtonTexte");
                quitterButton.appendChildWidget(new Label("labQuitterButtonTexte","Retour"));
                quitterButton.addEventListener("select", function(evt){
                		console.log(self.parentWidget);
                        self.parentWidget.back();
                    });

                console.log(self.parentWidget);
                
                //this.appendChildWidget(quitterButton);
                //ajouter un evenement de select pour quitter
                this.addEventListener("select", function(){
                	console.log(self.parentWidget);
                	self.parentWidget.back();
                })
				// calls Application.ready() the first time the component is shown
                // the callback removes itself once it's fired to avoid multiple calls.
                this.addEventListener("aftershow", function appReady(evt) {
                    self.getCurrentApplication().ready();
                    //self.removeEventListener('aftershow', appReady);
                });
			}
		});
	}

);