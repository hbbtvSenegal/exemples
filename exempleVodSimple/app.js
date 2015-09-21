/**
 * 
 */

require.def("vod/app",
    [

        "antie/widgets/component",
        "antie/widgets/button",
        "antie/widgets/label",
        "antie/widgets/verticallist",
        "antie/widgets/carousel",
        "antie/datasource",
        "antie/widgets/grid",
        "vod/formatters/simpleformatter",
        "vod/datasources/simplefeed",
    ],
    function (Component, Button, Label, VerticalList, Carousel, DataSource, Grid, SimpleFormatter, SimpleFeed) {
        
        // All components extend Component
        return Component.extend({
            init: function () {
                var self, helloWorldLabel, welcomeLabel, carouselButtonLabel, verticalListMenu;

                self = this;
                //constructeur de la classe superclasse
                this._super("appComponent");

                //creation des zones
                var frameDetails,frameMenu, frameEntete;
                
                /***** les boutons ***********/
                var regarderChaine = new Button("regarderChaine");
                regarderChaine.appendChildWidget(new Label("labRegarderChaine","Liste des chaines"));
                regarderChaine.addEventListener("select", function(evt){
                    self.getCurrentApplication().pushComponent("maincontainer", "vod/tele");
                });


                var vodButton = new Button("vodButton");
                vodButton.appendChildWidget(new Label("labVodButton","Liste des videos"));
                vodButton.addEventListener("select", function(evt){
                    self.getCurrentApplication().pushComponent("maincontainer","vod/vodFonction");

                });

                var streamingButton = new Button("streamingButton");
                streamingButton.appendChildWidget(new Label("labStreamingButton","Streaming"));
                streamingButton.addEventListener("select", function(evt){ //application/vnd.apple.mpegurl
                    self.getCurrentApplication().pushComponent("maincontainer","vod/videolive", {videoUrl:"http://192.168.1.13:8080", videoType: "video/mpeg"});

                });

                var aproposButton = new Button("aproposButton");
                aproposButton.addEventListener("select", function(evt){
//                        console.log("lol1");
                        self.getCurrentApplication().pushComponent("maincontainer","vod/texte",{leTexte:"Cette application permet de fbebdc jdn"});
                    });
                aproposButton.appendChildWidget(new Label("labAproposButton","A propos"));

                var quitterButton = new Button("quitterButton");
                quitterButton.appendChildWidget(new Label("labQuitterButton","Quitter"));
                quitterButton.addEventListener("select", function(evt){
                      //  console.log("lol");
                        self.getCurrentApplication().pushComponent("maincontainer", "vod/texte");
                    });


                /****************la grille*****************/
               // var grille = new Grid("principale",2,2);
                //grille.setWidgetAt(1,1,frameEntete);
                //grille.setWidgetAt(1,2,frameMenu);//col 0 et ligne 1
                //grille.setWidgetAt(2,2,frameDetails);
                verticalListMenu = new VerticalList("menuPrincipale");
                verticalListMenu.appendChildWidget(regarderChaine)
                verticalListMenu.appendChildWidget(vodButton);
                verticalListMenu.appendChildWidget(streamingButton);
                verticalListMenu.appendChildWidget(aproposButton);
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
