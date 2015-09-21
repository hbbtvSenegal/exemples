/*
* module pour faire de la VoD
*
*/

require.def("vod/vodFonction",
    [
        "antie/widgets/component",
        "antie/datasource",
        "antie/widgets/horizontalcarousel",
        "antie/widgets/label", 
        "antie/widgets/button",
        "antie/widgets/grid",
        "antie/widgets/verticallist",
        "antie/widgets/horizontallist",
        "antie/widgets/carousel",
        "vod/datasources/simplefeed",
        "vod/datasources/themesource",
        "vod/datasources/videosource",
        "vod/formatters/simpleformatter",
        "vod/formatters/themeformatter",
        "vod/formatters/videoformatter",
        "antie/widgets/textpager"
        
    ],
    function (Component, DataSource, HorizontalCarousel, Label, Button, Grid, VerticalList, HorizontalList,
        Carousel,SimpleFeed, ThemeSource, VideoSource, Formatter, ThemeFormatter, VideoFormatter, TextPager) {

        // All components extend Component
        return Component.extend({
            init: function () {
                self = this;
                this._super("vodFonction");

                this._application = this.getCurrentApplication();
                this._device = this._application.getDevice();

                // Create a a label add a class to it, this class can be used as a CSS selector
                var description = new Label("Press LEFT and RIGHT to navigate, SELECT returns to main menu.");
                description.addClass("description");
              //  this.appendChildWidget(description);


                //creer un onteneur pour contenir la carousel
                var themeComponent = new Component("themeComponentVod");
                var videoComponent = new Component("videoComponentVod");
                var boutonComponent = new Component("boutonComponentVod");
                var infoComponent = new Component("infoVideoVod");
                var playerComponent = new Component("playerComponentVod");

                //texte a afficher
                this._detailsVideo = new TextPager("texteVod");
                infoComponent.appendChildWidget(this._detailsVideo);

                this._videoSource = new DataSource(videoComponent, new VideoSource("1"), "loadData");
               // console.log("datasource1"+this._videoSource);
                this._themeSource = new DataSource(themeComponent, new ThemeSource(), "loadData");

                // Create a new carousel and append it to the component
                this._videoCarousel = new HorizontalCarousel("videoCarousel", new VideoFormatter(this._application, playerComponent, this._detailsVideo));
                this._themeCarousel = new HorizontalCarousel("themeCarousel", new ThemeFormatter(this._videoCarousel, videoComponent));

                videoComponent.appendChildWidget(this._videoCarousel);
                themeComponent.appendChildWidget(this._themeCarousel);
                boutonComponent.appendChildWidget(self._creerBoutonControle());




                var menuVerticalVod = new VerticalList("menuVerticalVod");
                themeComponent.addClass("menuVerticalVod");
                videoComponent.addClass("menuVerticalVod");
                boutonComponent.addClass("menuVerticalVod");
                menuVerticalVod.appendChildWidget(themeComponent);
                menuVerticalVod.appendChildWidget(videoComponent);
                menuVerticalVod.appendChildWidget(boutonComponent);

                var menuVerticalVod2 = new VerticalList("menuVerticalVod2");
                infoComponent.addClass("menuVerticalVod");
                playerComponent.addClass("menuVerticalVod");
                menuVerticalVod2.appendChildWidget(playerComponent);
                menuVerticalVod2.appendChildWidget(infoComponent);

                var menu = new HorizontalList("menuVod");
                menuVerticalVod.addClass("menuHorizontalVod");
                menuVerticalVod2.addClass("menuHorizontalVod");
                menu.appendChildWidget(menuVerticalVod);
                menu.appendChildWidget(menuVerticalVod2);
                

                this.appendChildWidget(menu);

                // Add a 'beforerender' event listener to the component to ensure the data is rebinded to the
                // carousel before the component is rendered
                this.addEventListener("beforerender", function (evt) {
                    self._onBeforeRender(evt);
                });

                // Add a select event listener to the carousel that pops back to the previous component on the component stack
                this._videoCarousel.addEventListener("select", function(evt){
               //     self.parentWidget.back();
                });
                this._videoCarousel.addEventListener("focus", function(evt){
                  //  console.log("focus video");
                });

                this._themeCarousel.addEventListener("focus", function(evt){
                    //des que il y'a un focus sur un theme afficher les videos sur le theme
                //    console.log("position");
             //       this._videoCarousel.setDataSource(this._videoSource);

                })

                this._themeCarousel.addEventListener("select", function(evt){
                    self.parentWidget.back();
                });
            },


            //creer les boutons de controles
            _creerBoutonControle: function(){
                
                var self = this;

                 //le bouton pour lire la video
                var playBouton = new Button("playBouton");
                playBouton.appendChildWidget(new Label("labPlayButton", "Play"));
                playBouton.addClass("boutonControle");
                playBouton.addEventListener("select", function(evt){

                });

                //le bouton pour Retour
                var quitterButton = new Button("quitterButton");
                quitterButton.appendChildWidget(new Label("labQuitterButton","Retour"));
                quitterButton.addClass("boutonControle");
                quitterButton.addEventListener("select", function(evt){
                        self.parentWidget.back();
                });

                var res = new HorizontalList("controleBouton");
                res.appendChildWidget(playBouton);
                res.appendChildWidget(quitterButton);
                return res;
            },

            _onBeforeRender: function(){
                this._themeCarousel.setDataSource(this._themeSource);
                this._videoCarousel.setDataSource(this._videoSource);
            //    console.log(this._videoCarousel);

            }
        });
    }
);
