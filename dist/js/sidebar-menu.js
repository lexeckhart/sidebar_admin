


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
            visibleClass: 'sidebar-visible',
            item: '.sidebar-item-has-children',  //
            itemActiveClass: 'sidebar-item-active',  //
            itemBtn: 'a'                        //
        },
		onShow : function() { return false; },
		onHide : function() { return false; }
	};

    Sidebar.prototype._init = function() {
        var _self = this,
            triggerElem = document.querySelectorAll(this.options.trigger),
            targetElem = document.querySelector(this.options.target);
        
        //var type =  (trigger && typeof trigger === 'string' ) ? 'string' : 'object';

        if (targetElem) {
            triggerElem.forEach(function(trig){
                trig.addEventListener('click', function(){
                    if(targetElem.classList.contains(_self.options.sidebar.visibleClass)){
                        _self.hide();
                    } else {
                        _self.show();
                    }
                });
            });
            this._initEvents(this.options.target);
        }
    }

    Sidebar.prototype._initEvents = function(elem) {
        var _self = this;
        var sidebarWrapper = document.querySelector(elem);

        if (sidebarWrapper){
            var si = document.querySelectorAll(_self.options.sidebar.item),
                siac = _self.options.sidebar.itemActiveClass,
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
        var targetElem = document.querySelector(this.options.target);
        targetElem.classList.add(this.options.sidebar.visibleClass);

        if (typeof this.options.onShow === 'function') {
            this.options.onShow();
        }
    }

    Sidebar.prototype.hide = function() {
        var targetElem = document.querySelector(this.options.target);
        targetElem.classList.remove(this.options.sidebar.visibleClass);

        if (typeof this.options.onHide === 'function') {
            this.options.onHide();
        }
    }

    Sidebar.prototype.destroy = function() {
    }

    window.Sidebar = Sidebar;
})( window );