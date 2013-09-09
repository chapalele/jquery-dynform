// question body widget:
// --------------------
$.widget( "dynform.questionBody", {

    _inputs : [],
    
    options : {},
    
    // construct
    _create: function() {
        this.element.addClass( "dyn-question-body" );
        this._inputs = this._detectInputs() || this._createInputs();
        this._createInputs();
    },

    _detectInputs : function() {
        console.log("detecting...");
        var inputs = this.element.find('.dyn-question-input,[data-role="question-input"]');
        console.log(inputs.length);
        if (inputs.length) {
            inputs.each( function(index,element){
                console.log("serving:"+element.id)
                $(element).questionInput();
            } );
        }

        console.log(inputs);
        return inputs;
    },

    _createInputs : function() {
        this._inputs.push($('<div></div>').questionInput().guid().appendTo(this.element));
        return this._inputs;
    },     

    _setUpInput : function(){
        return ;
    }       
});