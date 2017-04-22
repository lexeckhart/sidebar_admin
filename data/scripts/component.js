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
        trigger: '.toggle-sidebar',                     // TO DO: Add variables for open and close
        target:  '#sidebar',                            //  
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
            targetElem = document.querySelector(this.options.target);

        if (targetElem) {
            if (targetElem.classList.contains(_self.options.sidebar.visibleClass)) {
                _self.isVisible = true;
                // TO DO: Add sidebar-is-open class to body (General class for all sidebars)
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
                    // TO DO: Take in to consideration sidebar-item nesting
                    //        Closing all sidebar items blows this option
                    closeAllSidebarItems(wrapper, _self.options.sidebar.itemActiveClass, classToToggle);
                    element.parentNode.classList.add(classToToggle);
                }
            }

            XXX.handleEvent(targetElem, 'click', _self.options.sidebar.itemBtn, function(){
                // TO DO: handle other events
                // TO DO: handle disabled items
                toggleSidebarItems(targetElem, this, _self.options.sidebar.itemActiveClass);
            });
        }
        
    }

    Sidebar.prototype.show = function() {
        this.isVisible = true;
        // TO DO: Add sidebar-is-open class to body

        // TO DO: Clean up this duplicate garbage
        var targetElem = document.querySelector(this.options.target);
        targetElem.classList.add(this.options.sidebar.visibleClass);

        if (typeof this.options.onShow === 'function'){
            this.options.onShow();
        }
    }

    Sidebar.prototype.hide = function() {
        this.isVisible = false;
        // TO DO: remove sidebar-is-open class from body

        // TO DO: Clean up this duplicate garbage
        var targetElem = document.querySelector(this.options.target);
        targetElem.classList.remove(this.options.sidebar.visibleClass);

        if (typeof this.options.onHide === 'function'){
            this.options.onHide();
        }
    }

    window.Sidebar = Sidebar;
})( window );