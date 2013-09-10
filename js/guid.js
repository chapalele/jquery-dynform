// GUID
(function( $ ) {
    $.fn.guid = function( options ) {

    	var defaults = {
    		attribute 	: 'id'
    	};

		var settings = $.extend( {}, defaults, options );    	

        return this.each(function( ) {
        	$this = $(this);
        	
        	var unique = 'js-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);return v.toString(16)});

            if ( $this.attr( settings.attribute )  == '' || typeof $this.attr( settings.attribute )  == 'undefined') {
                $this.attr( settings.attribute, unique );
            }
        });
    };
}( jQuery ));