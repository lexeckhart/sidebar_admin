(function( window ) {

	'use strict';

	function extend( a, b ) {
		for( var key in b ) {
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function Sidebar( options ) {
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init();
	}

	Sidebar.prototype.options = {
        trigger: '.toggle-sidebar',                     // TO DO: Add variables for open and close handlers
        target:  '#sidebar',                            //  
        sidebar: {
            bodyClass: 'sidebar-is-open',
            visibleClass: 'sidebar-visible',            //
            item: '.sidebar-item-has-children',         //
            itemActiveClass: 'sidebar-item-active',     //
            itemBtn: '.sidebar-item-has-children > a'   //
        },
		onShow : function() { return false; },
		onHide : function() { return false; }
	};

    Sidebar.prototype._init = function() {
        var _self = this, elements;
            _self.targetElem = document.querySelector(this.options.target);

        if( _self.targetElem ) {
            if( _self.targetElem.classList.contains(_self.options.sidebar.visibleClass) ) {
                _self.isVisible = true;
                document.body.classList.add(_self.options.sidebar.bodyClass);
            }

            XXX.handleEvent(document, 'click', _self.options.trigger, function(){
                if( _self.isVisible ) {
                    _self.hide();
                } else {
                    _self.show();
                }
            });

            var closeAllSidebarItems = function(wrapper, element, classToRemove) {
                elements = wrapper.querySelectorAll('.'+element);
                elements.forEach(function(element) {
                    element.classList.remove(classToRemove);
                });
            }

            var toggleSidebarItems = function(wrapper, element, classToToggle){
                if( element.parentNode.classList.contains(classToToggle) ) {
                    element.parentNode.classList.remove(classToToggle);
                } else {
                    // TO DO: Take in to consideration sidebar-item nesting. Closing all sidebar items blows this option
                    closeAllSidebarItems(wrapper, _self.options.sidebar.itemActiveClass, classToToggle);
                    element.parentNode.classList.add(classToToggle);
                }
            }

            XXX.handleEvent(_self.targetElem, 'click', _self.options.sidebar.itemBtn, function(){
                // TO DO: Handle disabled items, Handle other event types
                toggleSidebarItems(_self.targetElem, this, _self.options.sidebar.itemActiveClass);
            });
        }
        
    }

    Sidebar.prototype.show = function() {
        var _self = this;
            _self.isVisible = true;

        document.body.classList.add(_self.options.sidebar.bodyClass);
        _self.targetElem.classList.add(_self.options.sidebar.visibleClass);

        if( typeof _self.options.onShow === 'function' ){
            _self.options.onShow();
        }
    }

    Sidebar.prototype.hide = function() {
        var _self = this;
            _self.isVisible = false;

        document.body.classList.remove(_self.options.sidebar.bodyClass);
        _self.targetElem.classList.remove(_self.options.sidebar.visibleClass);

        if( typeof this.options.onHide === 'function' ){
            _self.options.onHide();
        }
    }

    window.Sidebar = Sidebar;
})( window );