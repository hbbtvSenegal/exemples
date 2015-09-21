

var http = require('http');
var url = require('url');
var fs = require('fs');

// INIT AND CONFIG LOAD
function returnResponse(url, response)
{
	//Check TAL is available
	if (!fs.existsSync('./antie/node/antieframework.js')) {
    	response.write("antieframework.js can not be found.");
    	response.write("Please install TAL to a folder 'antie' in your application's root");
	}

	// Check TAL is available
    var AntieFramework = require('./antie/node/antieframework.js');

	// Set up application ID and path to framework configuration directory
	var application_id = "vod"; //identifiant de l'application
	var configPath = "antie/config";
	var frameworkPath = "antie/config/framework/";

	var antie = new AntieFramework(configPath, frameworkPath);

	// Get brand and model from url parameters, or use
	// brand = default, model = webkit
	var device_brand = "default";
	var device_model = "webkit";

	// Split the url in order to get the brand and model (if applicable)
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


	// Normalises to lower case with spaces replaced by underscores
	device_brand = antie.normaliseKeyNames(device_brand);
	device_model = antie.normaliseKeyNames(device_model);

	// Framework device config files in format BRAND-MODEL-default.json
	// Construct filename from this and config path
	var device_configuration_name = device_brand + "-" + device_model;
	var device_configuration_file_path = "/devices";
	var device_configuration;

	// Load in device configuration
	try
	{
		device_configuration = antie.getConfigurationFromFilesystem(device_configuration_name + "-default", device_configuration_file_path);
	}
	catch(e)
	{
		response.write("Device configuration not supported: " + e);
		return;
	}

	// Substitute appid wherever /%application%/ is present in device configuration
	device_configuration = device_configuration.replace(/%application%/g, application_id);

	// Decode to php object
	var device_configuration_decoded = JSON.parse(device_configuration);

	// PAGE GENERATION

	response.write("<head>");
	response.write("<meta charset='utf-8'>");
	response.write(antie.getDeviceHeaders(device_configuration_decoded));

	response.write("<script type='text/javascript'>");
			response.write("var require = {");
				response.write("baseUrl: './',");
				response.write("paths: {");
					response.write(application_id + ": './',");
					response.write("antie : 'antie/static/script'");
				response.write("},");
				response.write("priority: [],");
				response.write("callback: function() {}");
			response.write("};");
		response.write("</script>");
		response.write("<script type='text/javascript' src='./antie/static/script/lib/require.js'></script>");
		response.write("<link rel='stylesheet' href='style/base.css'/>");

		response.write("<script>");
			response.write("var antie = {framework: { deviceConfiguration: " + device_configuration + "}}");
		response.write("</script>");

	response.write("</head>");

	response.write("<body style='background: black; color:blue; height:100%, width:100%'>");
	antie.getDeviceBody(device_configuration_decoded);
	//table pour la mise en page
	response.write("<div id='debutPage' style='top:10px; height:100px;margin:5px;'>   "+
		"<table style='background-color:pink; width:100%; height:100%;'>"+
			"<tr>"+
				"<td>Université Virtuel du Sénégal/HbbTV-Sénégal</td>"+
				"<td></td>"+
			"</tr>"+
			"<tr>"+
				"<td>Bienvenue ...</td>"+
			"</tr>"+
		"</table>"+
	"</div>");
	response.write("<div id='contenuPage' style='height:400px; margin:10px;'>"+
		"<table id='contenu_page' style='width:100%; height:100%;'>"+
			"<tr>"+
				"<td colspan='2'>"+
				"<div id='static-loading-screen' style='position: absolute; top:30%;'>"+
					"Application is loading..."+
				"</div>"+
				"</td>"+
			"</tr>"+
			"<tr>"+
				"<td>"+
					"<div id='app' class='display-none'></div>"+
				"</td>"+
				"<td>"+
					"<div id='descrption'></div>"+
				"<td>"+
			"</tr>"+
		"</table>"+
	"</div>");

	response.write("<script type='text/javascript'>");
	response.write("require(");
	response.write("[");
			response.write("'vod/vod'");
	response.write("],");

			response.write("function(SampleApp) {");
					response.write("require.ready(function() {");
						response.write("function onReady() {");
							response.write("var staticLoadingScreen = document.getElementById('static-loading-screen');");
							//response.write("staticLoadingScreen.parentNode.removeChild(staticLoadingScreen);");
						response.write("};");

						response.write("new SampleApp(");
								response.write("document.getElementById('app'),");
								response.write("'style/',");
								response.write("'img/',");
								response.write("onReady");
						response.write(");");
					response.write("});");
				response.write("}");
		response.write(");");
	response.write("</script>");
	response.write("</body>");
	response.write("</html>");
}

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
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
