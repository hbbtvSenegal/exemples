<?php
 
 
// INIT AND CONFIG LOAD

// Check TAL is available
if (!file_exists('antie/php/antieframework.php')) {
    echo "<h2>Framework error</h2>";
    echo "<h4>antieframework.php can not be found.</h4>";
    echo "<h4>Please install TAL to a folder 'antie' in your application's root</h4>";
    exit;
}

require('antie/php/antieframework.php');

// Enable javascript cache busting (this should be disabled in production mode)
$javascript_cache_busting = true;

// Set up application ID and path to framework configuration directory
$application_id = "exemple";
$antie_config_path = 'antie/config';

// Create an AntieFramework instance
$antie = new AntieFramework($antie_config_path);

// Get brand and model from url parameters, or use 
// brand = default, model = webkit
$device_brand = isset($_GET['brand'])? $_GET['brand'] : 'default';
$device_model = isset($_GET['model'])? $_GET['model'] : 'webkit';

// Normalises to lower case with spaces replaced by underscores
$device_brand = $antie->normaliseKeyNames($device_brand);
$device_model = $antie->normaliseKeyNames($device_model);

// Framework device config files in format BRAND-MODEL-default.json 
// Construct filename from this and config path
$device_configuration_name = $device_brand . "-" . $device_model;
$device_configuration_file_path = $antie_config_path . "/devices/" . $device_configuration_name . "-default.json";

// Load in device configuration
try {
    $device_configuration = @file_get_contents($device_configuration_file_path);
    if(!$device_configuration)
        throw new Exception("Device ($device_configuration_name) not supported");
} catch(Exception $e){
    echo $e->getMessage(); exit;
}

// Substitute appid wherever /%applicaion%/ is present in device configuration
$device_configuration = preg_replace('/%application%/m', $application_id, $device_configuration);

// Decode to php object
$device_configuration_decoded = json_decode($device_configuration);



// PAGE GENERATION

// Set document mime type
header("Content-Type: " . $antie->getMimeType($device_configuration_decoded));

// Set doctype and opening html tag
echo $antie->getDocType($device_configuration_decoded);
echo $antie->getRootHtmlTag($device_configuration_decoded);
?>



<!-- HEAD -->

<head>
    <!-- Device specific head block (API loading etc) -->
<?php
    echo $antie->getDeviceHeaders($device_configuration_decoded);
?>

    <!-- Set up require aliases -->
    <script type="text/javascript">
        var require = {
            baseUrl: "",
            paths: {
                <?php echo $application_id; ?>: './',
                antie : "antie/static/script"
            },
            priority: [],
            <?php if($javascript_cache_busting): ?>
                urlArgs: "bust=" +  (new Date()).getTime(),
            <?php endif; ?>
            callback: function() {}
        };
    </script>

    <!-- Load require.js -->
    <script type="text/javascript" src="antie/static/script/lib/require.js"></script>

    <!-- Load application base style sheet -->
    <link rel="stylesheet" href="style/base.css"/>

    <!-- Expose device config to framework -->
    <script>
        var antie = {
            framework: {
                deviceConfiguration: <?php echo $device_configuration ?>
            }
        }
    </script>

</head>



<!-- BODY -->

<body style="background: #000;">

<!-- Add in device specific body (Plugins etc) -->
<?php echo $antie->getDeviceBody($device_configuration_decoded); ?>

<!-- Create a loading message -->
<div id="static-loading-screen" style="position: absolute; width: 100%; height: 100%; background: #000;">
    Application is loading...
</div>

<!-- Create a div to house the app -->
<div id="app" class="display-none"></div>

<!-- Load the application and launch, remove loading screen via callback -->
<script type='text/javascript'>
    require(
            [
                'exemple/initialise'
            ],
            function(Initialise) {

                require.ready(function() {
                    function onReady() {
                        var staticLoadingScreen = document.getElementById('static-loading-screen');
                        staticLoadingScreen.parentNode.removeChild(staticLoadingScreen);
                    };

                    new Initialise(
                            document.getElementById('app'),
                            'style/',
                            'img/',
                            onReady
                    );
                });
            }
    );
</script>

</body>
</html>
