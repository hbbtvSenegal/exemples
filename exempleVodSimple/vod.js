

require.def('vod/vod',
    [
        'antie/application',
        'antie/widgets/container'
    ],
    function(Application, Container) {
    
        return Application.extend({
            init: function(appDiv, styleDir, imgDir, callback) {
                var self;
                self = this;
                
                self._super(appDiv, styleDir, imgDir, callback);

                // Sets the root widget of the application to be
                // an empty container
                self._setRootContainer = function() {
                    var container = new Container();
                    container.outputElement = appDiv;
                    self.setRootWidget(container);
                };
            },
            
            run: function() {
                // Called from run() as we need the framework to be ready beforehand.
                this._setRootContainer();
                // creer le conteneur principale et y inserer un composant
                this.addComponentContainer("maincontainer", "vod/app");
            }
        });
    }
);
