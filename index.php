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

		<script src="js/dynform.questionTip.js"></script>

		<script src="js/ckeditor/ckeditor.js"></script>


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
		</div>

		<div id="test"></div>

<!-- 		<div class="question" data-type="text">

			<div class="dyn-question-input" id="js-2b759ade-6942-4327-bad1-e6c06da91bf6">
				<label>label nueva<input value="Default value" type="text" name="input1"></label>
			</div>

			<div class="dyn-question-input">
				<label>label 2<input value="Default value" type="radio" name="input2"></label>
			</div>				

		</div>


 		<div class="question dyn-question" data-type="text" id="js-aefde997-b6ac-4c2d-9ebb-dcf85635e478">
			<div class="dyn-question-title">Hola</div>
			<div class="dyn-question-body">
				<div class="dyn-question-input" id="js-2b759ade-6942-4327-bad1-e6c06da91bf6">
					<label>label 1<input value="Default value" type="text" name="input1"></label>
				</div>

				<div class="dyn-question-input">
					<label>label 2<input value="Default value" type="text" name="input2"></label>
				</div>				
			</div>
			<div class="dyn-question-tip">Question tipeo</div>
		</div>  -->

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
				var add = $('<div>fgfg</div>');

				add.editable().appendTo('#test');

				// CKEDITOR.inline( add.editable("option", 'id') );

			});


			
		</script>

	</body>

</html>