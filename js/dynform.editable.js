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
        html        : 'Click to edit',
        editable    : true,
        value       : null
    },
    
    // construct
    _create: function() {
        this.element.addClass( "dyn-editable" );

        this.setId();
        this.setHtml();
    
        if ( this.options.editable ) {
            this.makeEditable();
        }
        
    },

    setId: function( id ) {
        var id = id || this.options.id || this.element.attr('id') || this.element.guid().attr('id');
        this._setOption('id', id);
        return this;
    }, 

    setHtml: function( html ) {
        var html = html || this.options.html || this.element.html();
        this._setOption('html', html);
        this.element.html( html );
        return this;
    },    

    makeEditable : function(){
        this.element.prop('contenteditable', true);
        CKEDITOR.inline( this.element.get(0) );

        this.element.on('blur', this._onBlurEditable.bind(this) );
    },

    _onBlurEditable : function(event){
        this._setOption('html', this.element.html() );
        this._setOption('value', this.element.text() );
        this._trigger("update",event, this.options);
        console.log( this.toJSON() );
    },
    
    _setOption: function( key, value ) {
        this._super( key, value );
    },
    
    _setOptions: function( options ) {
        this._super( options );
    },   

    toJSON : function() {
        return JSON.stringify( this.options );
    }, 
       
    refresh: function() {
        console.log("refresh");
        console.log("caller is " + arguments.callee.caller);
    }
});