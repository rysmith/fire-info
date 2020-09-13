var widgets = (function() {
    var sensors = [
        [{
                title: 'Ahwahnee',
                id: 55199,
                thingspeak_id: 'MK1105GOXNWJN61H',
                url_position: 0
            },
            {
                title: 'Ventura',
                id: 27397,
                thingspeak_id: '4412GSB18YXW7UH7',
                url_position: 2
            },
            {
                title: 'Aptos',
                id: 4952,
                thingspeak_id: 'KVHW6O5P6IPLUXW7',
                url_position: 4
            }
        ],
        [{
                title: '12th & Judah',
                id: 60015,
                thingspeak_id: 'OZUQH57IOWW840PA',
                url_position: 6
            },
            {
                title: 'Los Banos',
                id: 3277,
                thingspeak_id: '1NRNNYS0S35WM2XP',
                url_position: 8
            },
            {
                title: 'San Rafael',
                id: 56241,
                thingspeak_id: 'C5W5XDTXGCSEI0YF',
                url_position: 10
            }
        ],
        [{
                title: 'Mendocino',
                id: 62747,
                thingspeak_id: 'LM78PLMKJKXX0WV3',
                url_position: 12
            },
            {
                title: 'Willow Glen',
                id: 54825,
                thingspeak_id: 'K5OY7G4QYTY3QU4N',
                url_position: 14
            }
        ]
    ];

    return {
        sensors: sensors,
        buildWidgetScripts: function() {
            var body = document.getElementById('body');

            sensors.flat().forEach(function(sensor) {
                var src = 'https://www.purpleair.com/pa.widget.js?key=' + sensor.thingspeak_id + '&module=AQI&conversion=C0&average=10&layer=standard&container=PurpleAirWidget_' + sensor.id + '_module_AQI_conversion_C0_average_10_layer_standard';
                var script = domUtility.buildNode('script', '', [{ key: 'src', value: src }])

                body.appendChild(script);
            });
        },
        fetchSensorData: function() {
            return sensors.flat().map(domUtility.fetchSensorData)
        }
    }
})();