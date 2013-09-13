/**
 * question label widget:
 * ----------------------
 * produces: 
 * <div class="dyn-input" id="unique" attribute="attribute">
 *     <label>Label text
 *         <input type="type" value="value" name="name" properties[selected, cheqcked, disabled]>
 *         or
 *         <textarea name="name">value</textarea>
 *     </label>
 *     <div class="dyn-input-controls"> ./ control buttons /. </div>
 * </div>
 *
 * Requires:
 * ---------
 * -jQueryUI widget
 * -JQueryUI buttons
 * 
 */

$.widget( "dynform.questionInput", {

    _label      : null,
    _input      : null,
    _control    : null,
    
    options: {
        acceptedLabelTag : [
            'label',
            '.question-input-label',
            '[data-role="question-input-label"]'
        ],

        acceptedInputTag : [
            'input',
            'textarea',
            '.question-input-input',
            '[data-role="question-input-input"]'
        ],        

        type    : 'text',
        label   : 'input label',
        value   : 'Default value',
        name    : null,
        checked : false
    },
    
    // construct
    _create: function() {

        this.element.addClass( "dyn-question-input" );

        if ( this._mustHaveId ) {
            this.element.guid();
        }  

        this.options.name = this.options.name || this.element.attr("id");      

        if ( this.options.editable ) {
            this.element.addClass( "dyn-editable");
        }

        this._label     = this._detectLabel() || this._createLabel();
        this._input     = this._detectInput() || this._createInput();

        console.log(this.options.editable);

        if ( this.options.editable ) {
            this._control   = this._createControl();    
        }
        

    },

    _mustHaveId : function() {
        return ($.inArray(this.options.type, ['text', 'checkbox']) !== -1) ? true : false;
    },

    /**
     * _detectLabel method
     * ===================
     * Looks for a inner label element
     * selector for accepted label elements are defined in options.acceptedLabelTag
     * 
     * @return {mixed [bool/jQuery Object]} 
     * - false, or 
     * - jQuery Object containing the first inner element that matches selector 
     *
     * @author Danilo Lizama (dlizama@cisal.cl)
     * @version 1.0 2013/09/09
     */
    _detectLabel : function() {
        var label = this.element.find( this.options.acceptedLabelTag.join() ).first();

        if ( !label.length ) return false;

        this.options.label = label.text();

        return label;
    },

    /**
     * _detectInput method
     * ===================
     * Looks for a inner input element
     * selector for accepted input elements are defined in options.acceptedInputTag
     * 
     * @return {mixed [bool/jQuery Object]} 
     * - false, or 
     * - jQuery Object containing the first inner element that matches selector 
     *
     * @author Danilo Lizama (dlizama@cisal.cl)
     * @version 1.0 2013/09/09
     */
    _detectInput : function() {
        var input = this.element.find( this.options.acceptedInputTag.join() ).first();

        if ( !input.length ) return false;

        this.options.type   = ( input.is("textarea") ) ? "textarea" : input.attr("type");
        this.options.value  = input.attr("value");
        this.options.name   = input.attr("name");

        return input;
    },    

    /**
     * _createLabel method
     * ===================
     * Creates and inserts a label element
     * 
     * @return {jQuery Object} 
     * - jQuery Object containing the recently created label element 
     *
     * @author Danilo Lizama (dlizama@cisal.cl)
     * @version 1.0 2013/09/09
     */
    _createLabel : function() {
        var label = $('<label></label>');
        if (this.options.type !== 'textarea') {
            label.text(this.options.label);
        }
        return label.prependTo(this.element);
    },
    
    /**
     * _createInput method
     * ===================
     * Creates and inserts a input or textarea element
     * 
     * @return {jQuery Object} 
     * - jQuery Object containing the recently created input/textarea element 
     *
     * @author Danilo Lizama (dlizama@cisal.cl)
     * @version 1.0 2013/09/09
     */    
    _createInput : function() {

        switch (this.options.type)
        {
            case 'textarea':
                input = $('<textarea></textarea>')
                    .attr('name', this.options.name)
                    .text(this.options.value);
                break;

            default:
                input = $('<input/>')
                    .attr({
                        name : this.options.name,
                        value: this.options.value,
                        type : this.options.type, 
                    });    
        }

        return input.appendTo(this._label);  
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
        var menu = $('<div></div>')
                        .addClass("dyn-question-input-control dyn-control buttongroup")
                        .on('click', '.button', this._onButtonClick);

        // var editButton      = $('<span/>').text('e')
        //                             .addClass("button edit")
        //                             .appendTo(menu)
        //                             .button( { text: false, icons: {primary: "ui-icon-pencil"} } );

        var deleteButton    = $('<span/>')
                                    .text('delete option')
                                    .addClass("button delete")
                                    .appendTo(menu).button( { text: false, icons: {primary: "ui-icon-trash"} } );

        return menu.prependTo(this.element);
    },   

    destroy : function() {

        console.log("destroying...");

        if (this._control) {
            this._control.off('click', '.button', this._onButtonClick);
            this.element.remove();
        }

        this._super();

    },


    

    /**
     * _onButtonClick method
     * =====================
     * Handles click event for controls (in edition mode)
     * 
     * @param  {eventObject}    : click 
     * @return {jQueryObject}   : target element
     */
    _onButtonClick : function(e) {
        e.preventDefault();

        var $clicked = $(e.target);

        var $button = ( $clicked.hasClass("button") ) ? $clicked : $clicked.parent('.button');

        console.log("working...");

        if ($button.hasClass("delete")) {
            console.log("deleting...");
            console.log($button.parents(".dyn-question-input").get(0));
            $button.parents(".dyn-question-input").questionInput("destroy");
        }

    }, 

    /**
     * type method
     * =================
     * returns option.type of this object
     * 
     * @param {any} value  : changes in type are not allowed
     *
     * @author Danilo Lizama (dlizama@cisal.cl)
     * @version 1.0 2013/09/12
     */
    type : function( value ) {
        if (value !== undefined) {
            console.log("type attribute cannot be modified");
        } 
        return this.options.type;
    },    

    /**
     * _setOption method
     * =================
     * Overrides $.widget _setOption method
     * 
     * @param {objet property} key  : name of option to set
     * @param {mixed: any} value    : setted value 
     *
     * @author Danilo Lizama (dlizama@cisal.cl)
     * @version 1.0 2013/09/09
     */
    _setOption: function( key, value ) {
        this._super( key, value );
    },
    
    /**
     * _setOption method
     * =================
     * Overrides $.widget _setOptions method
     * 
     * @param {objet} options object
     *
     * @author Danilo Lizama (dlizama@cisal.cl)
     * @version 1.0 2013/09/09
     */    
    _setOptions: function( options ) {
        this._super( options );
    }
       
});