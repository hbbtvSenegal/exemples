require.def("vod/formatters/themeformatter",
    [
        "antie/formatter",
        "antie/widgets/label",
        "antie/widgets/button",
        "antie/widgets/image",
        "antie/datasource",
        "vod/datasources/videosource"
    ],
    function(Formatter, Label, Button, Image, DataSource, VideoSource) {
        'use strict';
        return Formatter.extend({
            init: function(videoCarousel, videoComponent){
                this._super();
                this._videoCarousel = videoCarousel; //carousel
                this._videoComponent = videoComponent; //conteneur
            },

            format : function (iterator) {
                var self = this;

                var bouton, item;
                item = iterator.next();
                bouton = new Button("theme" + item.id);
                bouton.addClass("itemThemeFormatter");
              //  bouton.appendChildWidget(new Image("img-item.id", item.img, { width : 200, height: 200}));
                bouton.appendChildWidget(new Label(item.title));
                
                
                bouton.addEventListener("focus", function(evt){
                    bouton.addClass("themeFocus");
                    self.setVideoSource(item.id);

                });
                bouton.addEventListener("blur", function(evt){
                    bouton.removeClass("themeFocus");
                })
                return bouton;
            },

            setVideoSource: function(theme){

    //            console.log("---------"+this._videoCarousel);
                this._videoSource = new DataSource(this._videoComponent, new VideoSource(theme), "loadData");
                this._videoCarousel.setDataSource(this._videoSource);

            }
        });
    }
);  