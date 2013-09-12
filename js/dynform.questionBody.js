// question body widget:
// --------------------
$.widget( "dynform.questionBody", {

    _inputs : [],
    
    options : {
        acceptedInputsTag : [
            '.dyn-question-input',
            '[data-role="question-input"]'
        ]
    },
    
    // construct
    _create: function() {
        this.element.addClass( "dyn-question-body" );
        this._inputs = this._detectInputs() || this._createInputs();
    },

    // _detectInputs : function() {
    //     var inputs = this.element.find( this.options.acceptedInputsTag.join() );
    //     if (inputs.length) {
    //         inputs.each( this._setUpInput );
    //         return inputs;
    //     }
    //     return false;
    // },

    // _createInputs : function() {
    //     this._inputs.push($('<div></div>').questionInput(this.options).appendTo(this.element));
    //     return this._inputs;
    // },     

    // _setUpInput : function() {
    //     return $(this).questionInput();
    // },   

    // public methods
    addInput: function() {
        this._createinputs();
    }, 

    inputs : function() {
        return this._inputs;
    }        
});