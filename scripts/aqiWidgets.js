var aqiWidgets = (function() {
    'use strict'

    var containerId = 'aqi-widgets'
    var container = document.getElementById(containerId);

    function widget(widget_id) {
        var id = 'PurpleAirWidget_' + widget_id + '_module_AQI_conversion_C0_average_10_layer_standard';

        return domUtility.buildNode('div', '', [
            { key: 'id', value: id },
            { key: 'class', value: 'widget' }
        ]);
    }

    function spinners() {
        var htmlCollection = document.getElementsByClassName('widget');
        var widgets = [].slice.call(htmlCollection);

        widgets.forEach(function(widget) { spinner(widget) });
    }

    function spinner(widget) {
        var wrapper = domUtility.buildNode('div', '', [{ key: 'class', value: 'spinner-wrapper' }]);
        var spinner = domUtility.buildIcon('fas fa-spinner fa-spin spinner fa-4x');

        wrapper.appendChild(spinner)
        widget.appendChild(wrapper);
    }

    function widgetRow(container) {
        return function widgetRowItem(row) {
            var rowElement = domUtility.buildNode('div', '', [{ key: 'class', value: 'row' }]);

            container.appendChild(rowElement);

            row.forEach(function(widget) { appendRowItem(widget, rowElement) });
        }
    }

    function appendRowItem(item, rowElement) {
        var rowItemId = 'purpleAirWidget-' + item.id
        var rowItem = domUtility.buildNode('div', '', [
            { key: 'class', value: 'row-item' },
            { key: 'id', value: rowItemId }
        ]);

        var h2Id = 'purpleAirWidget-' + 'header-' + item.id;
        var h2 = domUtility.buildNode('h2', item.title, [{ key: 'id', value: h2Id }]);

        domUtility.appendChildren(rowItem, [h2, widget(item.id)])

        rowElement.appendChild(rowItem);
    }

    function h1(container) {
        var titleIcon = domUtility.buildIcon('fas fa-wind');
        var titleText = document.createTextNode(' PM 2.5');
        var header = domUtility.buildNode('h1');

        domUtility.appendChildren(header, [titleIcon, titleText])
        container.appendChild(header)
    }

    function buildWidgetScripts(sensorMetaData) {
        var body = document.getElementById('body');

        sensorMetaData.forEach(function(sensor) {
            var src = 'https://www.purpleair.com/pa.widget.js?key=' + sensor.thingspeak_id + '&module=AQI&conversion=C0&average=10&layer=standard&container=PurpleAirWidget_' + sensor.id + '_module_AQI_conversion_C0_average_10_layer_standard';
            var script = domUtility.buildNode('script', '', [{ key: 'src', value: src }])

            body.appendChild(script);
        });
    }

    function buildWidgets(sensors) {
        var widgetRowItem = widgetRow(container)

        h1(container)
        sensors.forEach(function(sensor) { widgetRowItem(sensor) });
        spinners();
    }

    return {
        buildWidgetScripts: buildWidgetScripts,
        buildWidgets: buildWidgets,
    }
})();