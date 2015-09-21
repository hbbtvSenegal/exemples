/**
 * 
 */

require.def("vod/tele",
    [

        "antie/widgets/component",
        "antie/widgets/button",
        "antie/widgets/label",
        "antie/widgets/verticallist",
        "antie/widgets/carousel",
        "antie/datasource",
        "antie/widgets/grid",
        "vod/formatters/simpleformatter",
        "vod/datasources/simplefeed"
    ],
    function (Component, Button, Label, VerticalList, Carousel, DataSource, Grid, SimpleFormatter, SimpleFeed) {
        
        // All components extend Component
        return Component.extend({
            init: function () {
                var self;

                self = this;
                //constructeur de la classe superclasse
                this._super("tele");

                //creation des zones
                
                /***** les boutons ***********/
                var tvRTS = new Button("tvRTS");
                tvRTS.appendChildWidget(new Label("tvRTS","RTS"));
                tvRTS.addEventListener("select", function(evt){

                });


                var tvRDV = new Button("tvRDV");
                tvRDV.appendChildWidget(new Label("tvRDV","RDV"));
                tvRDV.addEventListener("select", function(evt){

                });

                var quitterButton = new Button("quitterButton");
                quitterButton.appendChildWidget(new Label("labQuitterButton","Quitter"));
                quitterButton.addEventListener("select", function(evt){
                        //console.log("lol quitterButton");
                        
                       // self.destroyPlayer();
                        self.parentWidget.back();
                       // this.getCurrentApplication().pushComponent("vod/texte",{leTexte:"Cette application permet de fbebdc jdn"});
                    });


                /****************la grille*****************/
               // var grille = new Grid("principale",2,2);
                //grille.setWidgetAt(1,1,frameEntete);
                //grille.setWidgetAt(1,2,frameMenu);//col 0 et ligne 1
                //grille.setWidgetAt(2,2,frameDetails);
                verticalListMenu = new VerticalList("menuTele");
                verticalListMenu.appendChildWidget(tvRTS);
                verticalListMenu.appendChildWidget(tvRDV);
                verticalListMenu.appendChildWidget(quitterButton);

                //ajouter le menu
                this.appendChildWidget(verticalListMenu);

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
