var domUtility = (function() {
    function buildNode(tag, text = '', attributes = []) {
        var node = document.createElement(tag);
        var textNode = document.createTextNode(text);

        node.appendChild(textNode);
        attributes.map(function(attribute) { node.setAttribute(attribute.key, attribute.value) });

        return node
    }

    function reqListener() {
        var response = JSON.parse(this.response).results;
        var sensor1 = response[0];
        var sensor2 = response[1];
        var id = sensor1.ID;
        var pm2_5_atm = sensor1.pm2_5_atm;
        var temp_f = sensor1.temp_f;
        var rowItemElement = document.getElementById('purpleAirWidget-' + id);
        var text = sensor1.Label + ': ' + pm2_5_atm + '[pm2_5_atm]' + ' | ' + temp_f + '[temp_f]';

        var p = buildNode('p', text);
        // rowItemElement.appendChild(p);
    }

    return {
        buildNode: buildNode,
        buildIcon: function(style) {
            return buildNode('i', '', [{ key: 'class', value: style }]);
        },
        appendChildren: function(element, ...children) {
            children.map(function(child) { element.appendChild(child) });
        },
        fetchSensorData: function(sensor) {
            var request = new XMLHttpRequest();
            var url = 'http://www.purpleair.com/json?show=' + sensor.id

            request.addEventListener("load", reqListener);
            request.open('GET', url);
            request.send();
        }
    }
})();