<html>
	<head>
		<title>jQuery form plugin</title>
		<link rel="stylesheet" href="css/style.css"/>
		<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css"/>


		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>

		<script src="js/guid.js"></script>

		<script src="js/dynform.questionInput.js"></script>
		<script src="js/dynform.questionTitle.js"></script>
		<script src="js/dynform.questionTip.js"></script>

		<script src="js/dynform.editable.js"></script>
		<script src="js/dynform.input.js"></script>
		<script src="js/dynform.textarea.js"></script>
		<script src="js/dynform.newquestion.js"></script>

		<script src="js/dynform.questionTip.js"></script>

		<script src="js/ckeditor/ckeditor.js"></script>
		<script src="js/ckeditor/adapters/jquery.js"></script>


	</head>

	<body>

		<div class="buttons">
			<button id="textarea">+ textarea</button>
			<button id="text">+ text</button>
			<button id="radio">+ radio</button>
			<button id="checkbox">+ checkbox</button>

		</div>

		<div>
			<button id="editable">editable</button>
			<button id="check">checkbox input</button>
			<button id="question">question</button>
		</div>

		<div id="test"></div>


		<script>

			$(function() {
				CKEDITOR.disableAutoInline = true;
			     // var uli = $(".question").question();

			     // uli.question("addInput");
			});

			$(".buttons").on('click', function(e){
				var etype = e.target.id || 'textarea';
				added = $("<div>");
				added.question({type: etype }).appendTo('body');
				console.log( added.question("toJSON") );
			});

			$('#editable').on('click', function(){
				var editable = $('<div>Click to edit or remove</div>');
				editable.editable().appendTo('#test').addClass("dyn-question-title");
			});

			$('#check').on('click', function(){
				var label = $('<div/>')
				var input = $('<input/>');
				var editable = $('<div>Click to edit or remove</div>');
				input.input({type:'checkbox'}).appendTo(label);
				editable.editable().appendTo(label);

				editable.on("editableupdate", function(event,options){
					input.input("setValue", options.value)
				});

				label.appendTo('#test').addClass("dyn-question-input");

			});

			$('#question').on('click', function(){
				var question = $('<div/>');
				question.newquestion({type:'textarea'}).appendTo('#test');

			});




			
		</script>

	</body>

</html>