/**
 * 
 */

require.def("vod/streamingFonction",
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

                
                
            }
        });
    }
);
