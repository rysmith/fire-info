var aqiWidgets = (function() {
    var containerId = 'aqi-widgets'

    function widgetRow(row, widgetContainer) {
        var rowElement = domUtility.buildNode('div', '', [{ key: 'class', value: 'row' }]);

        widgetContainer.appendChild(rowElement);

        row.map(function(widget) { widgetRowItem(widget, rowElement) });
    }

    function widgetRowItem(item, rowElement) {
        var rowItem = domUtility.buildNode('div', '', [{ key: 'class', value: 'row-item' }]);
        var h2 = domUtility.buildNode('h2', item.title)

        h2.appendChild(button(item.url_position))
        domUtility.appendChildren(rowItem, h2, widget(item.id))

        rowElement.appendChild(rowItem);
    }

    function button(url_position) {
        var icon = domUtility.buildIcon('far fa-map');
        var button = domUtility.buildNode('button');

        button.appendChild(icon)
        button.addEventListener('click', buttonClickHandler(url_position), false);

        return button
    }

    function buttonClickHandler(index) {
        var widgetElements = document.getElementsByClassName("legend-tooltip deviceIcon nb");

        return function openMap() { window.open(widgetElements[index].firstChild.href) }
    }

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

        widgets.map(function(widget) { spinner(widget) });
    }

    function spinner(widget) {
        var wrapper = domUtility.buildNode('div', '', [{ key: 'class', value: 'spinner-wrapper' }]);
        var spinner = domUtility.buildIcon('fas fa-spinner fa-spin spinner fa-4x');

        wrapper.appendChild(spinner)
        widget.appendChild(wrapper);
    }

    return {
        build: function(widgetData) {
            var widgetContainer = document.getElementById(containerId);

            var titleIcon = domUtility.buildIcon('fas fa-wind');
            var titleText = document.createTextNode(' PM 2.5');
            var h1 = domUtility.buildNode('h1');

            domUtility.appendChildren(h1, titleIcon, titleText)
            widgetContainer.appendChild(h1)

            widgetData.rows.map(function(row) { widgetRow(row, widgetContainer) });
            spinners();
        },
    }
})();