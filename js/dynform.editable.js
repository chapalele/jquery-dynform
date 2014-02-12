/**
 * editable widget:
 * ----------------------
 * produces: 
 * <div class="dyn-editable .....(options)" id="unique" attribute="attribute">
 *     options.content
 * </div>
 *
 * Requires:
 * ---------
 * -jQueryUI widget
 * -guid
 * 
 */
$.widget( "dynform.editable", {
    
    options: {
        id          : null,
        html        : 'Click to edit',
        editable    : true
    },
    
    // construct
    _create: function() {
        this.element.addClass( "dyn-editable" );

        if( ! this.options.id ) {
            this.setId();
        }

        if ( this.element.html() ) {
            this.setHtml();
        }        

        if ( this.options.editable ) {
            this.makeEditable();
        }
        
    },

    setId: function( id ) {
        var id = id || this.element.guid().attr('id');
        this._setOption('id', id);
    },

    setHtml: function(html) {
        var html = html || this.element.html();
        this._setOption('html', html);
    },

    getHtml : function() {
        return this.element.html();
    },

    makeEditable : function(){
        this.element.prop('contenteditable', true);
        CKEDITOR.inline( this.element.get(0) );
    },
    
    _setOption: function( key, value ) {
        this._super( key, value );
    },
    
    _setOptions: function( options ) {
        this._super( options );
    },    
       
    refresh: function() {
        console.log("refresh");
        console.log("caller is " + arguments.callee.caller);
    }
});