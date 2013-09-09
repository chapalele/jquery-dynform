// question widget:
// ----------------
// produces:
// <div class="dyn-question" id="unique" attribute="attributte">
// 
//      <div class="dyn-question-title">contents of title</div> //questionTitle object
//
//      <div class="dyn-question-body">
//      
//          <div class="dyn-question-input" id="uniqueInputID#1">contents of input</div> //questionInput object
//          <div class="dyn-question-input" id="uniqueInputID#2">contents of input</div> //questionInput object
//          ...
//          <div class="dyn-question-input" id="uniqueInputID#N">contents of input</div> //questionInput object     
//                         
//      </div>
//                  
//      <div class="dyn-question-tip">contents of tip</div> //questionTip object
//      
//      <div class="dyn-question-controls"></div>
// </div>
// 
// 
// 
$.widget( "dynform.question", {
    
    _title  : null,
    _body   : null,
    _tip    : null,
    
    options: {
        acceptedTitleTag : [
            'h2',
            'h3',
            '.dyn-question-title',
            '[data-role="question-title"]'
        ],

        acceptedBodyTag : [
            '.dyn-question-body',
            '[data-role="question-body"]'
        ],    

        acceptedTipTag : [
            '.dyn-question-tip',
            '[data-role="question-tip"]'
        ],             

        title   : {},
        body    : {},
        tip     : {}
    },
    
    // construct
    _create: function() {
        this.element.addClass( "dyn-question" );    
        
        this.options = $.extend(this.options,this.element.data());

        this._title = this._detectTitle()   || this._createTitle();
        this._body  = this._detectBody()    || this._createBody();
        this._tip   = this._detectTip()     || this._createTip();
        
        return this;
    },
    
    _detectTitle : function() {
        var title = this.element.find( this.options.acceptedTitleTag.join() ).first();
        if ( !title.length ) return false;
        this.options.title.text = title.text();
        return title.questionTitle();        
    },

    _detectBody : function() {
        var body = this.element.find( this.options.acceptedBodyTag.join() ).first();
        if ( !body.length ) return false;
        return body.questionBody();                
    },

    _detectTip : function() {
        var tip = this.element.find( this.options.acceptedTipTag.join() ).first();
        if ( !tip.length ) return false;
        return tip.questionTip();    
    },


    _createTitle : function() {
        var title = $('<div></div>').questionTitle(this.options.title);
        return title.prependTo(this.element);  
    },

    _createBody : function() {
        var body = $('<div></div>').questionBody(this.options.body);
        return body.appendTo(this.element);  
    },    
        
    _createTip : function() {
        var tip = $('<div></div>').questionTip(this.options.tip);
        return tip.appendTo(this.element);      
    },

    
    // public methods
    label : function( value ) {
        return (value === undefined) ? _title.questionTitle("option","text") : this._title.questionTitle("option","text",value);
    },
    
    tip : function( value ) {
        return (value === undefined) ? _tip.questionTip("option","text") : this._tip.questionTip("option","text",value);
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