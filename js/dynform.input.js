$.widget( "dynform.input", {
    
    options: {
        id          : null,
        name        : null,
        value       : null,
        type        : 'radio',
    },
    
    // construct
    _create: function() {
        this.element.addClass( "dyn-input" );

        if( ! this.options.id ) {
            this.setId();
        }

        if( ! this.options.name ) {
            this.setName();
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

    setName: function( name ) {
        var name = name || this.element.attr('name') || this.options.id;
        this._setOption('name', name);
    },

    _prepName : function( name ) {
        var is_multiple = name.search("[]")
    },

    _isMultiple : function(name) {
        return (this.options.name.search("[]")) ? true : false;
    },

    setHtml: function(html) {
        var html = html || this.element.html();
        this._setOption('html', html);
    },

    getHtml : function() {
        return this.options.html;
    },

    makeEditable : function(){
        this.element.prop('contenteditable', true);
        CKEDITOR.inline( this.element.get(0) );

        this.element.on('blur', this._onBlurEditable.bind(this) );
    },

    _onBlurEditable : function(event){
        this._setOption('html', this.element.html() );
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