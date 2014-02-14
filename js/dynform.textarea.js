$.widget( "dynform.textarea", {
    
    options: {
        id          : null,
        name        : null,
        value       : null
    },
    
    // construct
    _create: function() {
        this.element.addClass( "dyn-textarea" );
        
        this.setId();
        this.setName();
        this.setValue();
    },


    setId: function( id ) {
        var id = id || this.options.id || this.element.attr('id') || this.element.guid().attr('id');
        this._setOption('id', id);
        return this;
    }, 

    setValue: function( value ) {
        var value = value || this.options.id || this.element.val('value');
        this._setOption('value', value);
        this.element.val(value);
        return this;
    },

    setName: function( name ) {
        var name = name || this.options.name || this.element.attr('name') || this.options.id;        
        this._setOption('name',  name);
        this.element.attr('name', name);
        return this;
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