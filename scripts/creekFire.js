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

    function header(text, icon) {
        var h1 = domUtility.buildNode('h1');
        var fireIcon = domUtility.buildIcon(icon);
        var sectionTitle = document.createTextNode(' ' + text);
        domUtility.appendChildren(h1, fireIcon, sectionTitle);

        return h1
    }

    function headerLink(text, url) {
        var subheader = domUtility.buildNode('h1');
        var incidentLink = domUtility.buildNode('a', text, [
            { key: 'href', value: url },
            { key: 'target', value: '_blank' }
        ])

        domUtility.appendChildren(subheader, domUtility.buildIcon('fas fa-external-link-alt'), document.createTextNode(' '), incidentLink);

        return subheader
    }

    function build() {
        domUtility.appendChildren(container,
            header('Creek Fire', 'fas fa-fire-alt'),
            headerLink('Evacuation Map', 'https://nifc.maps.arcgis.com/apps/webappviewer/index.html?id=28ce52cb86bf49dea0adef5a78b3c1b5'),
            headerLink('Incident Site', 'https://inciweb.nwcg.gov/incident/7147/'),
            evacInfo(
                'danger',
                'fas fa-exclamation-triangle',
                'Evacuation Orders',
                'Bass Lake Basin, including Wishon, Bass Lake Annex, and Manzanita; the town of North Fork and surrounding area.'
            ),
            evacInfo(
                'warning',
                'fas fa-info-circle',
                'Evacuation Warning Update',
                'Note that some evacuation warnings have been lifted for areas of Oakhurst and Corsegold just East of Highway 41.  See evacuation map for more details.'
            ),
            evacInfo(
                'warning',
                'fas fa-info-circle',
                'Evacuation Warnings',
                'Oakhurst, O’Neals, Walker Grade, Chukchansi, Indian Lakes, and the portion of Coarsegold east of Highway 41.'
            ),
            header('Embeded Evacuation Map', 'far fa-map'),
            evacuationMap()
        );
    }

    return {
        build: build
    }
})();