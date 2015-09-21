require.def("vod/formatters/videoformatter",
    [
        "antie/formatter",
        "antie/widgets/label",
        "antie/widgets/button",
        "antie/widgets/image",
        "antie/widgets/media",
        "antie/videosource",
        "antie/widgets/component",
        "antie/widgets/horizontallist"
    ],
    function(Formatter, Label, Button, Image, Media, VideoSource, Component, HorizontalList) {
        'use strict';
        return Formatter.extend({
            
            init: function(application, componentVideo, componentTexte ){
                // Get a reference to the current application and device objects
                this._super();
                this._application = application;
                this._device = this._application.getDevice();
                this._componentVideo = componentVideo;
                this._componentTexte = componentTexte;
             //   this.video={};
                var self = this;
            },

            format : function (iterator) {
                var button, item;
                var self= this;
                item = iterator.next();
                

                //button = new Button("theme" + item.id);
               // button.addClass("itemVideoFormatter");
             //   button.appendChildWidget(new Image("img-item.id", item.img, { width : 200, height: 150}));
               // button.appendChildWidget(new Label(item.title));
               // return button;

              //declarer la video
              this._videoUrl = item.video;
              this._videoType = item.type;
              this._id = item.id;

              var video = new Button("video"+ item.id);
               video.addClass("itemVideoFormatter");
              // this.createVideoPlayer(item.id);
              var image = new Image("video"+item.id, item.img, { width : 200, height: 100});
               video.appendChildWidget(image);

             //  console.log(this._videoUrl);
      //        video.addEventListener("beforerender", function(evt){
                
               //   self._onBeforeRender(1);

          //    });
              

              

              video.addEventListener("focus", function(evt){
                 //   self._onBeforeRender(evt);
             //    console.log(self.image._size);
                 //   video.removeChildWidget(image);
                //  video.removeClass("videoFocus");
                    image = new Image("video"+item.id, item.img, { width : 300, height: 200})
                    video.appendChildWidget(image)
                    video.addClass("videoFocus");
                    self._componentTexte.setText(item.details);
                  //  console.log(item.video);
                    self._videoUrl = item.video;
                    self._videoType = item.type;
                    console.log(item.video);
                    //mettre la video
                 //   self._onBeforeRender(evt);
                 //creer le widget Media
                   video.addEventListener("select", function(evt){
                      self._application.pushComponent("maincontainer", "vod/video", 
                        {videoUrl: item.video, videoType: item.type, 
                      application: self._application});
                  });

                    
               });

               video.addEventListener("blur", function(evt){
                 // video.removeChildWidget(image);
                    image = new Image("video"+item.id, item.img, { width : 200, height: 100})
                    video.appendChildWidget(image)
                   video.removeClass("videoFocus");
               });


               return video;
            }
        });
    }
);  