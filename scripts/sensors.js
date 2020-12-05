var sensors = (function() {
    'use strict'

    var metaData = [{
            title: 'Ahwahnee',
            id: 55199,
            thingspeak_id: 'MK1105GOXNWJN61H',
        },
        {
            title: 'Clovis',
            id: 14219,
            thingspeak_id: 'SOQF3SZC9AU79U8V',
        },
        {
            title: 'Raymond',
            id: 75761,
            thingspeak_id: 'MF3RMUYDG4P4O0WP',
        },
        {
            title: 'Aptos',
            id: 4952,
            thingspeak_id: 'KVHW6O5P6IPLUXW7',
        },
        {
            title: 'Ventura',
            id: 27397,
            thingspeak_id: '4412GSB18YXW7UH7',
        },
        {
            title: 'Willow Glen',
            id: 54825,
            thingspeak_id: 'K5OY7G4QYTY3QU4N',
        },
        {
            title: '12th & Judah',
            id: 60015,
            thingspeak_id: 'OZUQH57IOWW840PA',
        },
        {
            title: 'San Rafael',
            id: 56241,
            thingspeak_id: 'C5W5XDTXGCSEI0YF',
        },
        {
            title: 'Ft. Collins',
            id: 9936,
            thingspeak_id: 'QJ60EOKUW4SYP5M1',
        }
    ];

    function forDisplay(metaData) {
        var rowSize = 3;

        return domUtility.chunk(metaData, rowSize)
    }

    return {
        forDisplay: forDisplay(metaData),
        metaData: metaData,
    }
})();