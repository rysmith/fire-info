var atmospherics = (function() {
    function buildMarkUp(sensor) {
        var id = sensor.ID;
        var rowItemHeaderElement = document.getElementById('purpleAirWidget-' + 'header-' + id);

        var tempText = 'Temp: ' + sensor.temp_f + '°' + ' F';
        var humidityText = 'Relative Humidity: ' + sensor.humidity;
        var pressureText = 'Pressure: ' + sensor.pressure;

        return domUtility.appendChildren(
            rowItemHeaderElement, [
                domUtility.buildNode('hr'),
                domUtility.buildNode('p', tempText),
                domUtility.buildNode('p', humidityText),
                domUtility.buildNode('p', pressureText),
            ]
        );
    }
    return {
        build: function(sensors) {
            return sensors.map(function(sensor) {
                var request = new XMLHttpRequest();
                var url = 'http://www.purpleair.com/json?show=' + sensor.id

                request.addEventListener("load", function() {
                    var response = JSON.parse(this.response).results;
                    var sensor1 = response[0];

                    buildMarkUp(sensor1)
                });

                request.open('GET', url);
                request.send();
            });
        }
    }
})();