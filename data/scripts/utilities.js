

var XXX = {
    matchesSelector : Element.prototype.matches
        ||            Element.prototype.webkitMatchesSelector
        ||            Element.prototype.mozMatchesSelector
        ||            Element.prototype.msMatchesSelector
        || function(s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        },

    matches : function(el, selector) {
        if (!el || el === document) { return false; }
        return XXX.matchesSelector.call(el, selector);
    },
    target : function(event) {
        return (typeof event.target !== 'undefined') ? event.target : event.srcElement;
    },
    handleEvent : function(element, type, subselector, callback, context, useCapture) {
        element.addEventListener(type, function(ev) {
            var target = XXX.target(ev);
            if (!subselector) {
                return callback.call((context || target), ev, element);
            }
            while (target) {
                if (XXX.matches(target, subselector)) {
                    return callback.call((context || target), ev, target);
                }
                target = target.parentNode;
            }
        }, !!useCapture);
    }
};