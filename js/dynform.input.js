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

        this.element.attr('type', this.options.type);
        
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
        var value = value || this.options.id || this.element.attr('value');
        this._setOption('value', value);
        this.element.attr('value', value);
        return this;
    },

    setName: function( name ) {
        var name = this._prepName( name || this.options.name || this.element.attr('name') || this.element.attr('id') );
        this._setOption('name',  name);
        this.element.attr('name', name);
        return this;
    },

    _prepName : function( name ) {
        if (this.options.type === 'checkbox' && !this._isMultiple( name ) ) {
            name += "[]";
        }
        return name;
    },

    _isMultiple : function(name) {
        return (name.search(/\[]/) !== -1) ? true : false;
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