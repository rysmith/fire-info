var widgets = (function() {
    var sensors = [
        [{
                title: 'Ahwahnee',
                id: 55199,
                url_position: 0
            },
            {
                title: 'Ventura',
                id: 27397,
                url_position: 2
            },
            {
                title: 'Aptos',
                id: 4952,
                url_position: 4
            }
        ],
        [{
                title: '12th & Judah',
                id: 60015,
                url_position: 6
            },
            {
                title: 'Los Banos',
                id: 3277,
                url_position: 8
            },
            {
                title: 'San Rafael',
                id: 56241,
                url_position: 10
            }
        ],
        [{
                title: 'Mendocino',
                id: 62747,
                url_position: 12
            },
            {
                title: 'Willow Glen',
                id: 54825,
                url_position: 14
            }
        ]
    ];

    return {
        rows: sensors,
        fetchSensorData: function() {
            return sensors.flat().map(domUtility.fetchSensorData)
        }
    }
})();