


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
            item: 'sidebar-item-has-children',  //
            itemActive: 'sidebar-item-active',  //
            itemBtn: 'a'         //
        },
		onShow : function() { return false; },
		onHide : function() { return false; }
	};

    Sidebar.prototype._init = function() {
        var target = this.options.target, 
            trigger = this.options.trigger;

            this._initEvents(target);
    }

    Sidebar.prototype._initEvents = function(elem) {
        var _self = this;
        var sidebarWrapper = document.querySelector(elem);

        if (sidebarWrapper){
            var si = document.querySelectorAll('.'+_self.options.sidebar.item),
                siac = _self.options.sidebar.itemActive,
                sibtn = _self.options.sidebar.itemBtn,
                el,ael,v;

            si.forEach(function(item) {
                v = item.querySelector(sibtn);
                v.addEventListener("click", function(ev){
                    ev.preventDefault();
                    el = ev.target.parentNode;
                    ael = document.querySelector('.'+siac);

                    if (el.classList.contains(siac)){
                        el.classList.remove(siac);
                    } else {
                        if(ael){ael.classList.remove(siac)};
                        el.classList.add(siac);
                    }
                })
            });
        }
    }

    Sidebar.prototype._toggleElem = function() {
    }

    Sidebar.prototype.show = function() {

        if (typeof this.options.onShow === 'function') {
            this.options.onShow();
        }
    }

    Sidebar.prototype.hide = function() {

        if (typeof this.options.onHide === 'function') {
            this.options.onHide();
        }
    }

    Sidebar.prototype.destroy = function() {
    }

    window.Sidebar = Sidebar;
})( window );

new Sidebar();