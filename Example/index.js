//modules nodejs à importer 
var http = require('http'); 
var url = require('url'); 
var fs = require('fs'); 

// initialise et configure le chargement 
function returnResponse(url, response) 
{
	/* ici on met la configuration du device (vue précédemment) */
	// voir si le framework est present 
    	var AntieFramework = require('./antie/node/antieframework.js'); 

	//donner l'ID de l'application 
	var application_id = "exemple"; 

	//donner le chemin vers le repertoire du framework 
	var configPath = "antie/config"; 
	var frameworkPath = "antie/config/framework/"; 

	var antie = new AntieFramework(configPath, frameworkPath); 

	//donner le brand et le model du devide a 
	//Oubien utiliser les valeurs par defaut: brand = default, model = webkit 
	var device_brand = "default"; 
	var device_model = "webkit"; //navigateur, ici webkit (firefox) 

	//Lorsqu'elle y'a une url, recuperer le brand et le model à partir de l'url (s'ils y existent) 
	if (url.search) 
	{ 
		var parts = url.search.split("&"); 
		var $_GET = {}; 
		for (var i = 0; i < parts.length; i++) { 
			var temp = parts[i].split("="); 
			$_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]); 
		} 

		if ($_GET.brand) { 
			device_brand = $_GET.brand; 
		} 
		if ($_GET.model > -1) { 
			device_model = $_GET.model; 
		} 
	} 


	//mettre en minuscule 
	device_brand = antie.normaliseKeyNames(device_brand); 
	device_model = antie.normaliseKeyNames(device_model); 

	//la configuration du device du framework dans un format BRAND-MODEL-default.json 
	//construire le nom du fichier du device et configurer le chemin 
	var device_configuration_name = device_brand + "-" + device_model; 
	var device_configuration_file_path = "/devices"; 
	var device_configuration; 

	//charger dans la configuration du device 
	try 
	{ 
		device_configuration = antie.getConfigurationFromFilesystem(device_configuration_name + "-default", device_configuration_file_path); 
	} 
	catch(e) 
	{ 
		response.write("Configuration du device non supporté: " + e); 
		return; 
	} 

	// Substitute appid wherever /%application%/ is present in device configuration 
	device_configuration = device_configuration.replace(/%application%/g, application_id); 
 
	// Decode to php object 
	var device_configuration_decoded = JSON.parse(device_configuration);
	/* fin configuration du device */
	
response.write("<head>"); 
	response.write(antie.getDeviceHeaders(device_configuration_decoded)); 

	response.write("<script type='text/javascript' src='./config_require.js'></script>"); 
		response.write("<script type='text/javascript' src='./antie/static/script/lib/require.js'></script>"); 
		response.write("<link rel='stylesheet' href='style/base.css'/>"); 

		response.write("<script>"); 
			response.write("var antie = {framework: { deviceConfiguration: " + device_configuration + "}}"); 
		response.write("</script>"); 

	response.write("</head>"); 
	response.write("<body style='background: #000;'>"); 
	antie.getDeviceBody(device_configuration_decoded); 

	response.write("<div id='static-loading-screen' style='position: absolute; width: 100%; height: 100%; background: #000;'>"); 
	response.write("Application is loading..."); 
	response.write("</div>"); 

	response.write("<div id=\"app\" class=\"display-none\"><\/div>"); 

	response.write("<script type='text/javascript' src='./chargement.js'></script>"); 
	response.write("</body>"); 
	response.write("</html>"); 
} 
//créons le serveur web avec le module http de nodejs
http.createServer(function (req, res) { 
	var path = url.parse(req.url).pathname; 
	switch (path) 
	{ 
		case '/': 
			res.writeHead(200, {'Content-Type': 'text/html'}); 
  			returnResponse(url.parse(req.url), res); 
  			res.end(); 
            break; 

        default: 
            if (!fs.existsSync(__dirname + path)) { 
              console.log("HTTP 404: "+ path); 
              res.writeHead(404, {'Content-Type': 'text/html'}); 
            } 

            else if (/\.(css)$/.test(path)) 
            { 
                res.writeHead(200, {'Content-Type': 'text/css'}); 
                res.write(fs.readFileSync(__dirname + path, 'utf8')); 
            } 
            else if (/\.(js)$/.test(path)) 
            { 
                res.writeHead(200, {'Content-Type': 'text/js'}); 
                res.write(fs.readFileSync(__dirname + path, 'utf8')); 
            } 
            else{ 
                res.contentType = 'image/png'; 
                res.write(fs.readFileSync(__dirname + path)); 
            } 

            res.end(); 

        break; 
	} 
}).listen(1400, '127.0.0.1'); 
console.log('Server running at http://127.0.0.1:1400/'); 

