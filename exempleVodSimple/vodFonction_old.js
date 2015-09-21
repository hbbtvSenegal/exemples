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
        "vod/carousel"
        
    ],
    function (Component, DataSource, HorizontalCarousel, Label, Button, Grid, VerticalList, HorizontalList,
        Carousel,SimpleFeed, ThemeSource, VideoSource, Formatter, ThemeFormatter, VideoFormatter, NewCarousel) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var self = this;
                this._super("vodFonction");
                
                //les carousels pour themes et videos a jouter
                var themeCarousel, //les themes
                videoCarousel, //les videos de chaque theme
                infoVideo, //les info sur chaque video
                controleBouton, //bouton pour controler ou quitter
                menu; //le menu contenant tous ces elements

                /************** quelques configirations */
                this._application = this.getCurrentApplication();
                this._device = this._application.getDevice();

                /****** les themes *******/
                themeCarousel = self._creerCaressoleTheme();


                /****** les videos  ******/
                videoCarousel = self._creerCaressoleVideo();


                /****** les informations sur chaue video ***************/
                console.log("lololo");

                /*********** les boutons de controles ****************/
                controleBouton = self._creerBoutonControle();


                /***************** la mise en page *****************/
                //creer le menu vertical
                menuVerticalVod = new VerticalList("menuVerticalVod");
                menuVerticalVod.appendChildWidget(themeCarousel);
            //    menuVerticalVod.appendChildWidget(videoCarousel);
                menuVerticalVod.appendChildWidget(controleBouton);

                //ajouter le tout dans un menu horizontal
                menu = new HorizontalList("menuVodFonction")
                menu.appendChildWidget(menuVerticalVod);
               // menu.appendChildWidget(infoVideo);

                this.appendChildWidget(menu);

                this.addEventListener("beforerender", function(evt){
                    console.log("--bvf--");
               //     self._onBeforeRender();
                });
            },

            //creer la caressole des themes
            _creerCaressoleTheme: function(){
               
            },

            //creer la caressole des videos
            _creerCaressoleVideo: function(){
                var res = this._creerCarousel("videoCarousel", new VideoSource(),new VideoFormatter(), "videoConteneur");
                return res
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

            //creer un bouton carousel
            _createCarouselButton: function (id, datasource, formatter) {
                var self = this;

                function carouselExampleSelected() {
                    self.getCurrentApplication().pushComponent(
                        "maincontainer",
                        "vod/carouselcomponent",
                        self._getCarouselConfig(id, datasource, formatter)
                    );
                }

                var button = new Button(id);
                button.appendChildWidget(new Label("Carousel Example"));
                button.addEventListener('select', carouselExampleSelected);
                return button;
            },

            _creerCarousel: function(id, datasource, formatter, idComponent)
            {
                var self=this;
                return new NewCarousel(id, self._getCarouselConfig());
            },

            //configuration de la carousel
            _getCarouselConfig: function (idd, datasource, formatter) {
                    console.log("log-----");
                return {
                    id: idd,
                    description: "Carousel example, LEFT and RIGHT to navigate, SELECT to go back",
                    dataSource: new DataSource(null, datasource, 'loadData'),
                    formatter: formatter,
                    orientation: Carousel.orientations.HORIZONTAL,
                    carouselId: 'verticalCullingCarousel',
                    animOptions: {
                        skipAnim: false
                    },
                    alignment: {
                        normalisedAlignPoint: 0.5,
                        normalisedWidgetAlignPoint: 0.5
                    },
                    initialItem: 4,
                    type: "CULLING",
                    lengths: 264
                };
            },

            // Appending widgets on beforerender ensures they're still displayed
            // if the component is hidden and subsequently reinstated.
            // TODO: review the above comment, could be missleading
            

            _onBeforeRender: function (evt) {
               // this._carousel.setDataSource(this._dataSource);
               console.log("--'gfgvfgfv gf");
               this._creerCarousel("maincontainer", new ThemeSource(), new ThemeFormatter(), "themeConteneur");
            }
     });
    }
);



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
        "vod/formatters/videoformatter"
        
    ],
    function (Component, DataSource, HorizontalCarousel, Label, Button, Grid, VerticalList, HorizontalList,
        Carousel,SimpleFeed, ThemeSource, VideoSource, Formatter, ThemeFormatter, VideoFormatter) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var self = this;
                this._super("vodFonction");
                
                //les carousels pour themes et videos a jouter
                var themeCarousel, videoCarousel, infoVideo, boutonCarousel, menu; 

                /************** quelques configirations */
                this._application = this.getCurrentApplication();
                this._device = this._application.getDevice();

                var description = new Label("Appuyer sur LEFT et RIGHT pour naviguer, TOP et BOTTOM pour la verticale");
                description.addClass("description");
                this.appendChildWidget(description);

                themeCarousel = new Component("themeComponent");
                videoCarousel = new Component("videoComponent");
                boutonCarousel = new Component("boutonComponent");
                
                this._videoSource = new DataSource(videoCarousel, new VideoSource(), "loadData");
                this._videoCarousel = HorizontalCarousel("videoCarousel", new VideoFormatter());
                videoCarousel.appendChildWidget(this._videoCarousel);

                this._themeSource = new DataSource(themeCarousel, new ThemeSource(), "loadData");
                this._themeCarousel = HorizontalCarousel("themeCarousel", new ThemeFormatter());
                themeCarousel.appendChildWidget(this._themeCarousel);

                boutonCarousel = self._creerBoutonControle();


                /***************** la mise en page *****************/
                //creer le menu vertical
                var menuVerticalVod = new VerticalList("menuVerticalVod");
                menuVerticalVod.appendChildWidget(themeCarousel);
               // menuVerticalVod.appendChildWidget(videoCarousel);
               // menuVerticalVod.appendChildWidget(boutonCarousel);


                //ajouter le tout dans un menu horizontal
                menu = new HorizontalList("menuVodFonction")
                menu.appendChildWidget(menuVerticalVod);
               // menu.appendChildWidget(infoVideo);

                this.appendChildWidget(menu);

                this.addEventListener("beforerender", function(){
                    self._onBeforeRender();
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
                self._themeCarousel.setDataSource(self._themeSource);
                self._videoCarousel.setDataSource(self._videoSource);
            }

        });
    }
);
