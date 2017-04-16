
(function(){
    var sidebar = document.querySelector('#sidebar');

    if(sidebar){
        var si = document.querySelectorAll('.sidebar-item-has-children > a');
        var siac = "sidebar-item-active";

        function closeAll() {
            for(i=0; i<si.length; i++) {
                si[i].parentNode.classList.remove(siac);
            }
        }
        for(i=0; i<si.length; i++) {
            si[i].addEventListener("click", function(ev){
                ev.preventDefault();
                var el = ev.target.parentNode;
                if(el.classList.contains(siac)) {
                    el.classList.remove(siac);
                } else {
                    closeAll();
                    el.classList.add(siac);
                }
            })
        }
    }
})();