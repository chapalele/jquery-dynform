// question label widget:
// ----------------------
$.widget( "dynform.questionInput", {
    
    options: {
        type : 'textarea',
        value : 'Default value'
    },
    
    // construct
    _create: function() {
        this.element.addClass( "dyn-input" );
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
        return this.element;
        this.element.text( this.options.text );
    }
});

// question label widget:
// ----------------------
$.widget( "dynform.questionTitle", {
    
    options: {
        text : 'Question title'
    },
    
    // construct
    _create: function() {
        this.element.addClass( "dyn-title" );
        
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

// question tip widget:
// --------------------
$.widget( "dynform.questionTip", {
    
    options: {
        text : 'Question tip'
    },
    
    // construct
    _create: function() {
        this.element.addClass( "dyn-tip" );
        
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



$.widget( "dynform.question", {
    
    _label : null,
    _inputs : null,
    _tip : null,
    
    options: {
        value: 0,
        title : {},
        input : {},
        tip : {}
    },
    
    // construct
    _create: function() {
        this.element.addClass( "dyn-question" );    
        
        this.options = $.extend(this.options,this.element.data());
        console.log(this.options);
        this._title     = this._createTitle();
        this._inputs    = this._createInputs();
        this._tip       = this._createTip();
        
        return this;
    },
    
    _createTitle : function() {
        title = this.element.find('h2,h3,.question-title,[data-role="question-title"]');
        
        if (title.length) {
            // options = {label: this.options.optionTitle};
            return title.questionTitle().guid();
        }
        
        return $('<div></div>').questionTitle(this.options.title).guid().prependTo(this.element);      
    },
    
    _createInputs : function() {
        this._inputs = this.element.find('input,textarea,[data-role="question-input"]');
        
        if (this._inputs.length) {
            return this._inputs.each(this._setUpInput);
        }        
        return this._inputs.push($('<textarea></textarea>').questionInput(this.options.input).guid().appendTo(this.element));
    },
    
    _setUpInput : function(){
        inputObject = $(this).questionInput({}).guid();
        return inputObject;
    },      
    
    _createTip : function() {
        tip = this.element.find('.tip,[data-role="question-tip"]');
        
        return (tip.length) ? tip.questionTip(this.options.tip).guid() : $('<div></div>').questionTip(this.options.tip).guid().appendTo(this.element);      
    },  
    
    // public methods
    label : function( value ) {
        if ( value === undefined ) {
            return _title.questionTitle("option","text");
        }
        return this._title.questionTitle("option","text",value);
    },
    
    tip : function( value ) {
        if ( value === undefined ) {
            return _tip.questionTip("option","text");
        }
        return this._tip.questionTip("option","text",value);
    },
    
    _setOption: function( key, value ) {
        if ( key === "value" ) {
            value = this._constrain( value );
        }
        this._super( key, value );
    },
    
    _setOptions: function( options ) {
        this._super( options );
        this.refresh();
    },    
    
    // public methods.
    value: function( value ) {
        // No value passed, act as a getter.
        if ( value === undefined ) {
            return this.options.value;
        }
 
        // Value passed, act as a setter.
        this.options.value = this._constrain( value );
        var progress = this.options.value + "%";
        this.element.text( progress );
    },
    
    refresh: function() {
        var progress = this.options.value + "%";
        this.element.text( progress );
        if ( this.options.value == 100 ) {
            this._trigger( "complete", null, { value: 100 } );
        }
    },    
 
    // private methods.
    _constrain: function( value ) {
        if ( value > 100 ) {
            value = 100;
        }
        if ( value < 0 ) {
            value = 0;
        }
        return value;
    }    
});