(function() {
    'use strict'

    aqiWidgets.buildWidgetScripts(sensors.metaData);
    aqiWidgets.buildWidgets(sensors.forDisplay);
    atmospherics.build(sensors.metaData)
})();