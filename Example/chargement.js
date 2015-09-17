require( 
	[ 
        'exemple/initialise' //dependance  
    	], 
    function(Initialise) { // fonction appelée dès le chargement du module depandant 
        require.ready(function() { 
            function onReady() { 
			//enlever l'element  static-loading-screen 
                var staticLoadingScreen = document.getElementById('static-loading-screen'); 
                staticLoadingScreen.parentNode.removeChild(staticLoadingScreen); 
            }; 
             
	//ensuite appeler le contructeur de Initialise                
            new Initialise(document.getElementById('app'),  //balise div qui contient la partie  dynamique TAL 
                'style/',  //css 
                'img/', //images 
                onReady //callback appelé après chargement 
            ); 
        }); 
    });  

