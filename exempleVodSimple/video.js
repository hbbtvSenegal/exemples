/**
 * 
 */

require.def("vod/video",
    [

        "antie/widgets/component",
        "antie/widgets/button",
        "antie/widgets/label",
        "antie/widgets/verticallist",
        "antie/widgets/carousel",
        "antie/datasource",
        "antie/widgets/grid",
        "antie/widgets/horizontallist",
        "antie/videosource",
        "antie/widgets/media"
    ],
    function (Component, Button, Label, VerticalList, Carousel, DataSource, Grid, HorizontalList, VideoSource, Media) {
        
        // All components extend Component
        return Component.extend({
            init: function () {
                var self = this;

                this._super("video");

                this._application = this.getCurrentApplication();
                this._device = this._application.getDevice();

                //le conteneur des boutons de controle de la video
                var playerControlButtons = new HorizontalList("playerButtons");

                //les boutons de controle de la video
                var play = new Button('play');
                play.appendChildWidget(new Label('PLAY'));
                playerControlButtons.appendChildWidget(play);
                play.addEventListener('select', function(evt) {
                    self.getPlayer().play();
                });

                var pause = new Button('pause');
                pause.appendChildWidget(new Label('PAUSE'));
                playerControlButtons.appendChildWidget(pause);
                pause.addEventListener('select', function(evt) {
                    self.getPlayer().pause();
                });

                var rewind = new Button('rewind');
                rewind.appendChildWidget(new Label('-5s'));
                playerControlButtons.appendChildWidget(rewind);
                rewind.addEventListener('select', function(evt) {
                var currentTime = self.getPlayer().getCurrentTime();
                  self.getPlayer().setCurrentTime(currentTime - 5);
                });

                 var fastForward = new Button('fastForward');
                fastForward.appendChildWidget(new Label('+5s'));
                playerControlButtons.appendChildWidget(fastForward);
                fastForward.addEventListener('select', function(evt) {
                 var currentTime = self.getPlayer().getCurrentTime();
                 self.getPlayer().setCurrentTime(currentTime + 5);
                });

                var back = new Button('back');
                back.appendChildWidget(new Label('BACK'));
                playerControlButtons.appendChildWidget(back);
                back.addEventListener('select', function(evt) {
                    if (self._device.getPlayerEmbedMode() === Media.EMBED_MODE_BACKGROUND) {
                        self.showBackground();
                    }

                    // s'assurer le media s'est arreté en quittant
                    self.destroyPlayer();
                    self.parentWidget.back();
                    self._application.removeChildWidget(this);
                });

                //ajouter les boutons de controle
                this.appendChildWidget(playerControlButtons);


                //ajouter 
                this.addEventListener("beforerender", function(evt){

                    self._onBeforeRender(evt);
                });

            },

            _onBeforeRender: function (evt) {
                console.log(evt.args.videoUrl);
                
                // créer le device de la video
                var player = this.createVideoPlayer();

                //preciser la source de la video
                player.setSources([new VideoSource(evt.args.videoUrl, evt.args.videoType)]);

                //charger la video
                player.load();
            },

            getPlayer : function() {
                return this._player;
            },

            //detruire le media
            destroyPlayer : function() {
                this._player.destroy();
                this.removeChildWidget(this._player);
                this._player = null;
            },

            //creer le media
            createVideoPlayer: function() {
                var self = this;

                // Create the player and append it to the component
                this._player = new Media('testPlayer', 'video');
                this.appendChildWidget(this._player);

                //des que la video est prete
                this._player.addEventListener('canplay', function(evt) {
                    // Some devices have the player in the background behind the HTML page, we need to ensure the
                    // document body is transparent in order to see the video content
                    if (self._device.getPlayerEmbedMode() === Media.EMBED_MODE_BACKGROUND) {
                        self.hideBackground();
                    }

                    // des que la video est prete
                    self._player.play();
                });

                //reourner le media
                return this._player;
            },


            hideBackground : function() {
                this._device.addClassToElement(document.body, 'background-none');
                this._application.getRootWidget().addClass('background-none');
            },


            showBackground : function() {
                if (this._device.getPlayerEmbedMode() === Media.EMBED_MODE_BACKGROUND) {
                    this._device.removeClassFromElement(document.body, 'background-none');
                    this._application.getRootWidget().removeClass('background-none');
                }
            }
        });
    }
);
