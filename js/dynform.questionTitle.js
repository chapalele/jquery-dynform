// question label widget:
// ----------------------
$.widget( "dynform.questionTitle", {
    
    options: {
        title : 'Question title'
    },
    
    // construct
    _create: function() {
        this.element.addClass( "dyn-question-title" );
        var content = $.trim(this.element.text());
        if ( content ) this._setOption('title', content);
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
        this.element.text( this.options.title );
    }
});