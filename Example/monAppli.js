require.def("exemple/monAppli", 
	[ 
		"antie/widgets/component", 
		"antie/widgets/button", 
		"antie/widgets/container", 
		"antie/widgets/verticallist", 
		"antie/widgets/horizontallist", 
		"antie/widgets/label" 
	], 
	function(Component, Button, Container, VerticalList, HorizontalList, Label){ 
		return Component.extend({ 
			init: function(){ 
			var self = this; 
			this._super("monAppli"); 
			//on cree les boutons et on ajoute a chaque bouton une Label 
			var jaune = new Button("jaune"); 
			jaune.appendChildWidget(new Label("Jaune")); 
			var bleu = new Button("bleu"); 
			bleu.appendChildWidget(new Label("Bleu")); 
			var rouge = new Button("rouge"); 
			rouge.appendChildWidget(new Label("Rouge")); 
		 
			//conteneur qui va afficher la couleur 
			var comp = new Container("comp"); 
			//changement de couleurs 
			jaune.addEventListener("select", function(evt){ 
				comp.addClass("jaune"); 
				comp.removeClass("bleu"); 
				comp.removeClass("rouge"); 
			}); 
			 bleu.addEventListener("select", function(evt){ 
                                comp.addClass("bleu"); 
                                comp.removeClass("jaune"); 
                                comp.removeClass("rouge"); 
                        }); 
			 rouge.addEventListener("select", function(evt){ 
                                comp.addClass("rouge"); 
                                comp.removeClass("bleu"); 
                                comp.removeClass("jaune"); 
                        }); 

			//creer une liste vertical et y ajouter les boutons 
			var menu = new VerticalList("verticallist"); 
			menu.appendChildWidget(jaune); 
			menu.appendChildWidget(bleu); 
			menu.appendChildWidget(rouge); 
			 
			//disposition horizontal 
			var horizontal = new HorizontalList("horizontallist"); 
			horizontal.appendChildWidget(menu); 
			horizontal.appendChildWidget(comp); 
	 
			this.appendChildWidget(horizontal); 
			} 
		}); 
	} 
); 
