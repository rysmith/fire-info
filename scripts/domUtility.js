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