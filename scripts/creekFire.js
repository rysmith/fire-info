var creekFire = (function() {
    var containerId = 'creek-fire'
    var container = document.getElementById(containerId);

    function evacInfo(wrapper_style, icon_style, title, text) {
        var style = wrapper_style + ' evac-info'
        var wrapper = domUtility.buildNode('div', '', [{ key: 'class', value: style }]);

        var icon = domUtility.buildIcon(icon_style);
        var h3 = domUtility.buildNode('h3');
        var p = domUtility.buildNode('p', text);
        var title = document.createTextNode(' ' + title)

        domUtility.appendChildren(wrapper, h3, p);
        domUtility.appendChildren(h3, icon, title);

        return wrapper;
    }

    function evacuationMap() {
        return domUtility.buildNode('iframe', '', [
            { key: 'title', value: 'Evacuation Overlay' },
            { key: 'width', value: '100%' },
            { key: 'height', value: '1000' },
            { key: 'src', value: 'https://nifc.maps.arcgis.com/apps/webappviewer/index.html?id=28ce52cb86bf49dea0adef5a78b3c1b5' }
        ]);
    }

    function header(text, icon_style) {
        var h1 = domUtility.buildNode('h1');
        var icon = domUtility.buildIcon(icon_style);
        var sectionTitle = document.createTextNode(' ' + text);

        domUtility.appendChildren(h1, icon, sectionTitle);

        return h1
    }

    function headerLink(text, url) {
        var subheader = domUtility.buildNode('h1');
        var icon = domUtility.buildIcon('fas fa-external-link-alt')
        var space = document.createTextNode(' ')
        var incidentLink = domUtility.buildNode('a', text, [
            { key: 'href', value: url },
            { key: 'target', value: '_blank' }
        ])

        domUtility.appendChildren(subheader, icon, space, incidentLink);

        return subheader
    }

    function build() {
        domUtility.appendChildren(container,
            header('Creek Fire', 'fas fa-fire-alt'),
            headerLink('PG&E Shutoff - Address Lookup', 'https://pgealerts.alerts.pge.com/addresslookup/'),
            headerLink('Evacuation Map', 'https://nifc.maps.arcgis.com/apps/webappviewer/index.html?id=28ce52cb86bf49dea0adef5a78b3c1b5'),
            headerLink('Incident Site', 'https://inciweb.nwcg.gov/incident/7147/'),
            evacInfo(
                'ok',
                'fas fa-thumbs-up',
                'Evacuation Orders Lifted',
                'Most warnings have been lifted from the Oakhurst area.'
            ),
            header('Embeded Evacuation Map', 'far fa-map'),
            evacuationMap()
        );
    }

    return {
        build: build
    }
})();