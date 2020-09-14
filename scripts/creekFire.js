var creekFire = (function() {
    var containerId = 'creek-fire'

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

    function evacWarnings() {
        return evacInfo(
            'warning',
            'fas fa-info-circle',
            'Evacuation Warnings',
            'Oakhurst, O’Neals, Walker Grade, Chukchansi, Indian Lakes, and the portion of Coarsegold east of Highway 41.'
        );
    }

    function buildEvacOrders() {
        return evacInfo(
            'danger',
            'fas fa-exclamation-triangle',
            'Evacuation Orders',
            'Bass Lake Basin, including Wishon, Bass Lake Annex, and Manzanita; the town of North Fork and surrounding area.'
        );
    }

    function evacuationMap() {
        return domUtility.buildNode('iframe', '', [
            { key: 'title', value: 'Evacuation Overlay' },
            { key: 'width', value: '100%' },
            { key: 'height', value: '1000' },
            { key: 'src', value: 'https://nifc.maps.arcgis.com/apps/webappviewer/index.html?id=28ce52cb86bf49dea0adef5a78b3c1b5' }
        ]);
    }

    return {
        build: function() {
            var creekFireContainer = document.getElementById(containerId);
            var fireIcon = domUtility.buildIcon('fas fa-fire-alt');
            var sectionTitle = document.createTextNode(' Creek Fire');
            var incidentLink = domUtility.buildNode('a', 'Incident Site', [
                { key: 'href', value: 'https://inciweb.nwcg.gov/incident/7147/' },
                { key: 'target', value: '_blank' }
            ])

            var h1 = domUtility.buildNode('h1');
            var subheader = domUtility.buildNode('h1');

            domUtility.appendChildren(h1, fireIcon, sectionTitle);
            domUtility.appendChildren(subheader, domUtility.buildIcon('fas fa-external-link-alt'), document.createTextNode(' '), incidentLink);
            domUtility.appendChildren(creekFireContainer, h1, buildEvacOrders(), evacWarnings(), subheader, evacuationMap());
        }
    }
})();