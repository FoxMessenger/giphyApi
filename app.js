

// this initial array of anime characters
var animeChar = [ "Naruto", "Ichigo", "Monkey D Luffy", "Goku" ];

$( window ).on( "load", function() {
// the display function to render on the HTML my content
	function displayAnimeCharacter() {
	
		// var name will grab the information from this which is the document window at the moment and add a data attribute 'data-name'
		var characterName = $( this ).attr( 'data-name' );
		// this is the static API key for giphy
		var apiKey = 'api_key=dc6zaTOxFJmzC'
		// this is the query. the website, + the name + plus the API key, and finally our 10 gifs
		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + characterName + apiKey + '&limit=10';

		// our ajax call
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function( response ) {
			// once we get the call we want the results. which is the data retrieved
			var results = response.data;
			console.log( response.data );
		});
	};

	// render original list of button
	function renderBtns (){
		//before we start we need to empty the button field so we don't have repeated button
		$('#rendered-buttons').empty();
		// we will create a series of button according to the length of the animeChar array
		for (i = 0; i < animeChar.length; i++) {

			var button = $('<button>');
			button.addClass('anime');
			button.attr('data-name', animeChar[i]);
			button.text(animeChar[i]);
			$('#rendered-buttons').append(button);
		}
	}

	// when we click submit, we want to grab that information
	$('#add-anime').on('click', function(e){
		e.preventDefault();

		var newAnimeChar = $('#anime-input').val().trim();
		animeChar.push(newAnimeChar);
		renderBtns();
	})

	// $(document).on('click', '.anime', displayAnimeCharacter);
})