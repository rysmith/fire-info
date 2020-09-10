var domUtility = (function() {
    function buildNode(tag, text = '', attributes = []) {
        var node = document.createElement(tag);
        var textNode = document.createTextNode(text);

        node.appendChild(textNode);
        attributes.map(function(attribute) { node.setAttribute(attribute.key, attribute.value) });

        return node
    }

    return {
        buildNode: buildNode,
        buildIcon: function(style) {
            return buildNode('i', '', [{ key: 'class', value: style }]);
        },
        appendChildren: function(element, ...children) {
            children.map(function(child) { element.appendChild(child) });
        },
    }

})();

var widgetData = (function() {
    return {
        rows: [
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
            ]
        ]
    }
})();

var aqiWidgets = (function() {
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
        var redirectUrl = document.getElementsByClassName("legend-tooltip deviceIcon nb");

        return function openMap() { window.open(redirectUrl[index].firstChild.href) }
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
            var widgetContainer = document.getElementById('widgets');

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

var creekFire = (function() {
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
            { key: 'src', value: 'https://maderacounty.maps.arcgis.com/apps/webappviewer/index.html?id=c7155765748b4e82b5419dad890d6325' }
        ]);
    }

    return {
        build: function() {
            var creekFireContainer = document.getElementById('creek-fire');
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

aqiWidgets.build(widgetData);
creekFire.build();