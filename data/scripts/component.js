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
        target:  '.sidebar',                    // wrapper that holds the sidebar  
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
            targetElem = document.querySelector(this.options.target),
            sidebarElem = document.querySelector(_self.options.target);

        if (targetElem && triggerElem) {
            triggerElem.forEach(function(trig){
                trig.addEventListener('click', function(){
                    if(targetElem.classList.contains(_self.options.sidebar.visibleClass)){
                        _self.hide();
                    } else {
                        _self.show();
                    }
                });
            });
        }

        if (sidebarElem) {
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

            XXX.handleEvent(sidebarElem, 'click', _self.options.sidebar.itemBtn, function(){
                toggleSidebarItems(sidebarElem, this, _self.options.sidebar.itemActiveClass);
            });
        }
        
    }

    Sidebar.prototype.show = function() {
        var targetElem = document.querySelector(this.options.target);
        targetElem.classList.add(this.options.sidebar.visibleClass);

        if (typeof this.options.onShow === 'function'){
            this.options.onShow();
        }
    }

    Sidebar.prototype.hide = function() {
        var targetElem = document.querySelector(this.options.target);
        targetElem.classList.remove(this.options.sidebar.visibleClass);

        if (typeof this.options.onHide === 'function'){
            this.options.onHide();
        }
    }

    window.Sidebar = Sidebar;
})( window );