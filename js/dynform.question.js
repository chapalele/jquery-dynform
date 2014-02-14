// question widget:
// ----------------
// produces:
// <div class="dyn-question" id="unique" attribute="attributte">
// 
//      <div class="dyn-question-controls"> / .... / </div> 
// 
//      <div class="dyn-question-title">contents of title</div>                         // *** questionTitle object
//      <div class="dyn-question-tip">contents of tip</div>                             // *** questionTip object
//      
//      <div class="dyn-question-input" id="uniqueInputID#1">contents of input</div>    // *** questionInput object
//      <div class="dyn-question-input" id="uniqueInputID#2">contents of input</div>    // *** questionInput object
//      ...
//      <div class="dyn-question-input" id="uniqueInputID#N">contents of input</div>    // *** questionInput object     
//      
// </div>

$.widget( "dynform.question", {
    
    _title      : null,
    _body       : null,
    _tip        : null,
    _control    : null,
    _inputs     : [],
    _nada       : "content",
    
    options: {
        acceptedTitleTag : [
            'h2',
            'h3',
            '.dyn-question-title',
            '[data-role="question-title"]'
        ],

        acceptedInputsTag : [
            '.dyn-question-input',
            '[data-role="question-input"]'
        ],         

        acceptedTipTag : [
            '.dyn-question-tip',
            '[data-role="question-tip"]'
        ],             

        title           : 'Question title',
        tip             : 'Question tip',
        name            : null,
        editable        : true,
        confirmDelete   : true, 
        type            : 'textarea'
    },
    
    // construct
    _create: function() {
        
        this.element.addClass( "dyn-question" );   

        // each question element would have an unique ID, so if the ID attribute is not present, it will be created using guid plugin
        this.element.guid(); 
        
        // we can set options using data attribute in html, this can be useful in combination with a php script
        // i.e. <div data-type="textarea"> will generate this.options.type = "textarea" in this object
        // ATENTION: this overrides options setted by javascript when creating the object: $( [selector] ).question( { overriden-option-if-using-html-data: 'never used value'} )
        $.extend( true, this.options, this.element.data() );

        // if there's no name, we are going to use id
        // name is not used in question elements, but we will save it among options for further usage
        this.options.name   = this.options.name || this.element.attr("id");

        if ( this._acceptMultipleName() ) {
            this.options.name   = this._prepMultipleName ( this.options.name );    
        }   

        if ( ! this._detectInputs() ) {
            this._createInputs( this.options );
        }

        this._title         = this._detectTitle()   || this._createTitle();
        this._tip           = this._detectTip()     || this._createTip();


        if (this.options.editable) {
            this._control   = this._createControl();
        }
        
        return this;
    },



    _createInputs : function( options ) {
        return [ this.addInput( options ) ];
    },  

    _setUpInput : function() {
        return $(this).questionInput();
    },       

    _createTitle : function() {
        var title = $('<div></div>').questionTitle(this.options);
        return title.prependTo(this.element);  
    },

    _createBody : function() {
        var body = $('<div></div>').questionBody(this.options);
        return body.appendTo(this.element);  
    },    
        
    _createTip : function() {
        var tip = $('<div></div>').questionTip(this.options);
        return tip.insertAfter(this._title);      
    },

    _allowCreate : function() {
        return ($.inArray(this.options.type, ['text','checkbox','radio']) !== -1) ? true : false;
    },

    _acceptMultipleName : function () {
        return ($.inArray(this.options.type, ['text', 'checkbox']) !== -1) ? true : false;
    },

    /**
     * _createControl method
     * =====================
     * Creates and inserts elements to be used in edition mode
     * 
     * @return {jQuery Object} 
     * - jQuery Object containing the recently created div and its children elements 
     *
     * @author Danilo Lizama (dlizama@cisal.cl)
     * @version 1.0 2013/09/09
     */   
    _createControl : function() {
        var menu            = $('<div></div>')
                                    .addClass("dyn-question-control dyn-control buttongroup");

        // var editButton      = $('<span/>')
        //                             .text('e')
        //                             .addClass("button edit")
        //                             .appendTo(menu).button( { text: false, icons: {primary: "ui-icon-pencil"} } );

        var deleteButton    = $('<span/>')
                                    .text('delete question')
                                    .addClass("button delete")
                                    .appendTo(menu).button( { text: false, icons: {primary: "ui-icon-trash"} } );

        if ( this._allowCreate() ) {
            var addInputButton  = $('<span/>')
                                        .text('add an option')
                                        .addClass("button add")
                                        .appendTo(menu).button( { text: false, icons: {primary: "ui-icon-plus"} } );            
        }


        menu.on('click','.button', this._onButtonClick);

        return menu.prependTo(this.element);
    },    

    _onButtonClick : function(e) {
        e.preventDefault();

        var $clicked = $(e.target);

        var $button = ( $clicked.hasClass("button") ) ? $clicked : $clicked.parent('.button');

        if ($button.hasClass("delete")) {
            $button.parents(".dyn-question").question("destroy");
        }

        if ($button.hasClass("add")) {
            $button.parents(".dyn-question").question("addInput");
        }
    },


    destroy : function() {

        if ( this._control ) {
            this._control.off('click', '.button', this._onButtonClick);
            this.element.remove();
        }

        this._super();

    },    

    // public methods
    label : function( value ) {
        return (value === undefined) ? _title.questionTitle("option","text") : this._title.questionTitle("option","text",value);
    },
    
    tip : function( value ) {
        return (value === undefined) ? _tip.questionTip("option","text") : this._tip.questionTip("option","text",value);
    },

    inputs : function () {
        return this._inputs;
    },

    addInput : function( ) {
        var input = $('<div></div>').questionInput( this.options );
        
        return input.appendTo(this.element);
    },  


    _prepMultipleName : function( name ) {
        var suffix = '[]';
        if ( name.slice(-2) !== suffix ) {
            name = name + suffix;
        }
        return name;
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

    config: function() {
        var config = {
            name    : this.options.name,
            type    : this.options.type,
            title   : this.options.title,
            tip     : this.options.tip,
            inputs  : []
        };

        $.each( this._inputs, function( index, value ) {
            config.inputs.push( value.questionInput("config") );
        });

        return config;
    },   

    toJSON : function() {
        return JSON.stringify( this.config() );
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