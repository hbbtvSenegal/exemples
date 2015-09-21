

require.def("vod/datasources/themesource",
    [
        "antie/class"
    ],
    function(Class) {
        return Class.extend({
            
            loadData : function(callbacks) {
                callbacks.onSuccess(
                    [
                        {
                            "id":"1",
                            "title":"Action",
                            "img" : "img/apple.png",
                            "dossier" : "video/films/action"
                        },
                        {
                            "id":"2",
                            "title":"Drame",
                            "img" : "img/banana.png",
                            "dossier" : "video/films/drame"

                        },
                        {
                            "id":"3",
                            "title":"Humour",
                            "img" : "img/grapes.png",
                            "dossier" : "video/films/humour"
                        },
                        {
                            "id":"4",
                            "title":"Comedie",
                            "img" : "img/orange.png",
                            "dossier" : "video/films/Comedie"
                        },
                        {
                            "id":"5",
                            "title":"Jeunesse",
                            "img" : "img/peach.png",
                            "dossier" : "video/films/jeunesse"
                        },
                        {
                            "id":"6",
                            "title":"Documentaire",
                            "img" : "img/pear.png",
                            "dossier" : "video/films/documentaire"

                        }
                    ]
                );
            }
        });
    });