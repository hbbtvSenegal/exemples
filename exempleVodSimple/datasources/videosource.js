

require.def("vod/datasources/videosource",
    [
        "antie/class"
    ],
    function(Class) {


        return Class.extend({
            init: function(theme){

                this._theme = theme;

            },

            loadData : function(callbacks) {
                var self = this;
           //     console.log(this._theme);

                callbacks.onSuccess(
                    self.getVideo()
                );
            },

            //fonction pour charger les videos de chaque categorie
            getVideo: function(){
                //    console.log("video source: "+this._theme);

                    if(this._theme==="1")
                    {
                      //  console.log(this._tableauVideo[0]);
                        return this._tableauVideo[0];
                    }
                    else if(this._theme==="2")
                    {
                       // console.log(this._tableauVideo[1]);
                        return this._tableauVideo[1];
                    }
                    else if(this._theme==="3")
                    {
                        //console.log(this._tableauVideo[0]);
                        return this._tableauVideo[2];
                    }
                    else
                    {
                        //console.log(this._tableauVideo[1]);
                        return this._tableauVideo[1];
                    }
            },
            //tableau des videos
            _tableauVideo: [
            [
                        {
                            "id":"1",
                            "title":"Action",
                            "img" : "img/apple.png",
                            "video" : "video/films/deffbuzz.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati bcbcfhbchfb"
                        },
                        {
                            "id":"2",
                            "title":"Drame",
                            "img" : "img/banana.png",
                            "video" : "video/films/diougoufi.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati hahah"


                        },
                        {
                            "id":"3",
                            "title":"Humour",
                            "img" : "img/grapes.png",
                            "video" : "video/films/hero.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati lolllll"

                        },
                        {
                            "id":"4",
                            "title":"Comedie",
                            "img" : "img/orange.png",
                            "video" : "video/films/deffbuzz.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati bappammmmmmmm"
                        },
                        {
                            "id":"5",
                            "title":"Jeunesse",
                            "img" : "img/peach.png",
                            "video" : "video/films/diougoufi.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati bcbcfhbchfb------"
                        },
                        {
                            "id":"6",
                            "title":"Documentaire",
                            "img" : "img/pear.png",
                            "video" : "video/films/hero.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati bccybcbcv----b"

                        }
                    ],

                    [
                        {
                            "id":"1",
                            "title":"Action",
                            "img" : "img/bbc_background_540.png",
                            "video" : "video/films/ngoora.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati bc-----djcjnb"
                        },
                        {
                            "id":"2",
                            "title":"Drame",
                            "img" : "img/bg.jpg",
                            "video" : "video/films/potolamp.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati attttttthbhdb"

                        },
                        {
                            "id":"3",
                            "title":"Humour",
                            "img" : "img/rddr.png",
                            "video" : "video/films/rddr.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati aloiieuuuue"
                        },
                        {
                            "id":"4",
                            "title":"Comedie",
                            "img" : "img/ngoora.png",
                            "video" : "video/films/ngoora.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati qmpllllllllllll"
                        },
                        {
                            "id":"5",
                            "title":"Jeunesse",
                            "img" : "img/potolamp.png",
                            "video" : "video/films/potolamp.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati wwwwwwwwwwwwll"
                        },
                        {
                            "id":"6",
                            "title":"Documentaire",
                            "img" : "img/rddr.png",
                            "video" : "video/films/rddr.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati pppppppppppppppp"

                        }
                    ],
                    [
                        {
                            "id":"1",
                            "title":"Action",
                            "img" : "img/reer.png",
                            "video" : "video/films/reer.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati apppspp"
                        },
                        {
                            "id":"2",
                            "title":"Drame",
                            "img" : "img/smile.png",
                            "video" : "video/films/smile.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati djdjdjj"

                        },
                        {
                            "id":"3",
                            "title":"Humour",
                            "img" : "img/xaliss.png",
                            "video" : "video/films/xaliss.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati apppppppp"
                        },
                        {
                            "id":"4",
                            "title":"Comedie",
                            "img" : "img/reer.png",
                            "video" : "video/films/reer.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati astouebh chbd"
                        },
                        {
                            "id":"5",
                            "title":"Jeunesse",
                            "img" : "img/smile.png",
                            "video" : "video/films/smile.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati attttttttt"
                        },
                        {
                            "id":"6",
                            "title":"Documentaire",
                            "img" : "img/xaliss.png",
                            "video" : "video/films/xaliss.mp4",
                            "type": "video/mp4",
                            "details": "Cette video et patati astouvcbgv u"

                        }
                    ]

        ]

        });
        
    });