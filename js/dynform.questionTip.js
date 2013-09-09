// question tip widget:
// --------------------
$.widget( "dynform.questionTip", {
    
    options: {
        text : 'Question tip'
    },
    
    // construct
    _create: function() {
        this.element.addClass( "dyn-question-tip" );
        
        var content = $.trim(this.element.text());
        if ( content ) this._setOption('text', content);
        
        this.refresh();
    },
    
    _setOption: function( key, value ) {
        this._super( key, value );
    },
    
    _setOptions: function( options ) {
        this._super( options );
        this.refresh();
    },    
       
    refresh: function() {
        this.element.text( this.options.text );
    }
});