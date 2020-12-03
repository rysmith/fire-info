var atmospherics = (function() {
    function fetchSensorData(sensors) {
        return sensors.map(function(sensor) {
            var request = new XMLHttpRequest();
            var url = 'http://www.purpleair.com/json?show=' + sensor.id

            request.addEventListener("load", reqListener);
            request.open('GET', url);
            request.send();
        })
    }

    function reqListener() {
        var response = JSON.parse(this.response).results;
        var sensor1 = response[0];
        var id = sensor1.ID;
        var rowItemHeaderElement = document.getElementById('purpleAirWidget-' + 'header-' + id);

        var hrElement = domUtility.buildNode('hr', '');

        var temp_f = sensor1.temp_f;
        var tempElementText = 'Temp: ' + temp_f + '°' + ' F'
        var tempElement = domUtility.buildNode('p', tempElementText)

        var humidity = sensor1.humidity
        var humidityElementText = 'Relative Humidity: ' + humidity
        var humidityElement = domUtility.buildNode('p', humidityElementText)

        var pressure = sensor1.pressure
        var pressureElementText = 'Pressure: ' + pressure
        var pressureElement = domUtility.buildNode('p', pressureElementText)

        domUtility.appendChildren(
            rowItemHeaderElement,
            hrElement,
            tempElement,
            humidityElement,
            pressureElement
        );
    }

    return {
        fetchSensorData: fetchSensorData
    }
})();