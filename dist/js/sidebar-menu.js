

var XXX = {
    matchesSelector : Element.prototype.matches
        ||                Element.prototype.webkitMatchesSelector
        ||                Element.prototype.mozMatchesSelector
        ||                Element.prototype.msMatchesSelector
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
(function( window ) {

	'use strict';

	// Extend obj function
	function extend( a, b ) {
		for( var key in b ) {
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	// Sidebar function
	function Sidebar( options ) {
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init();
	}

    // Sidebar Options
	Sidebar.prototype.options = {
        trigger: '.toggle-sidebar',             // element that toggles the sidebar
        target:  '#sidebar',                    // wrapper that holds the sidebar  
        sidebar: {
            visibleClass: 'sidebar-visible',            //
            item: '.sidebar-item-has-children',         //
            itemActiveClass: 'sidebar-item-active',     //
            itemBtn: '.sidebar-item-has-children > a'   //
        },
		onShow : function() { return false; },
		onHide : function() { return false; }
	};

    Sidebar.prototype._init = function() {
        var _self = this,
            elements,
            triggerElem = document.querySelectorAll(this.options.trigger),
            targetElem = document.querySelector(this.options.target);

        if (targetElem) {
            if (targetElem.classList.contains(_self.options.sidebar.visibleClass)) {
                _self.isVisible = true;
            }

            XXX.handleEvent(document, 'click', _self.options.trigger, function(){
                _self.isVisible ? _self.hide() : _self.show();
            });

            var closeAllSidebarItems = function(wrapper, element, classToRemove) {
                elements = wrapper.querySelectorAll('.'+element);
                elements.forEach(function(element) {
                    element.classList.remove(classToRemove);
                });
            }

            var toggleSidebarItems = function(wrapper, element, classToToggle){
                if(element.parentNode.classList.contains(classToToggle)) {
                    element.parentNode.classList.remove(classToToggle);
                } else {
                    closeAllSidebarItems(wrapper, _self.options.sidebar.itemActiveClass, classToToggle);
                    element.parentNode.classList.add(classToToggle);
                }
            }

            XXX.handleEvent(targetElem, 'click', _self.options.sidebar.itemBtn, function(){
                toggleSidebarItems(targetElem, this, _self.options.sidebar.itemActiveClass);
            });
        }
        
    }

    Sidebar.prototype.show = function() {
        this.isVisible = true;

        var targetElem = document.querySelector(this.options.target);
        targetElem.classList.add(this.options.sidebar.visibleClass);

        if (typeof this.options.onShow === 'function'){
            this.options.onShow();
        }
    }

    Sidebar.prototype.hide = function() {
        this.isVisible = false;

        var targetElem = document.querySelector(this.options.target);
        targetElem.classList.remove(this.options.sidebar.visibleClass);

        if (typeof this.options.onHide === 'function'){
            this.options.onHide();
        }
    }

    window.Sidebar = Sidebar;
})( window );