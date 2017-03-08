$(document).ready(function() {

	// this initial array of anime characters
	var animeChar = [ "vash the stampede", "kenshin", "luffy", "lelouch" ];
	
	// the display function to render on the HTML my content
	function addAnimeChar() {
		
		// var name will grab the information from this which is the document window at the moment and add a data attribute 'data-name'
		var charName = $( this ).attr( 'data-name' );

		var state = $( this ).attr( 'data-state' );
		// this is the static API key for giphy
		var apiKey = '&api_key=dc6zaTOxFJmzC'
		// this is the query. the website, + the name + plus the API key, and finally our 10 gifs
		var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + charName + apiKey + '&limit=10';

		// our ajax call
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done( function( response ) {
			// once we get the call we want the results. which is the data retrieved


			$('#anime-view').empty();
			var results = response.data;
			for ( i = 0; i < results.length; i++ ) {
				var giphyDiv = $( '<div>' );
				var rating = results[i].rating;

				var p = $( '<p>' ).text( 'rating: ' + rating );
				var image = $( '<img>' );
				
				image.addClass( 'gif' );

				image.attr( 'src', results[i].images.fixed_height_still.url );
				image.attr( 'data-still', results[i].images.fixed_height_still.url );
				image.attr( 'data-animate', results[i].images.fixed_height.url );
				image.attr( 'data-state', 'still' );

				
				giphyDiv.prepend( p );
				giphyDiv.prepend( image );

				$( '#anime-view' ).prepend( giphyDiv );

			}

			// the gif click function 
			$( ".gif" ).on( 'click', function() {
				
				var state = $( this ).attr( 'data-state' );
				
				// not working: else is setting off.	
				if (state === 'still') {
					$( this ).attr( 'src', $( this ).attr( 'data-animate' ));
					$( this ).attr( "data-state", "animate" );
					console.log( 'if got clicked!' )
				} else {
					console.log('Else got clicked')
					$( this ).attr( 'src', $( this ).attr( 'data-still' ));
					$( this ).attr( 'data-state', 'still' );
				}
			})

		});
	};

	// render original list of button
	function renderBtns (){
		//before we start we need to empty the button field so we don't have repeated button
		$( '#rendered-buttons' ).empty();
		// we will create a series of button according to the length of the animeChar array
		for ( i = 0; i < animeChar.length; i++ ) {

			var button = $( '<button>' );
			button.addClass( 'anime btn btn-danger' );
			button.attr( 'data-name', animeChar[i] );
			button.text( animeChar[i] );
			$( '#rendered-buttons' ).append( button );
		}
	}

	// when we click submit, we want to grab that information
	$( '#add-anime' ).on( 'click', function(e){
		e.preventDefault();

		var newAnimeChar = $( '#anime-input' ).val().trim();
		animeChar.push( newAnimeChar );
		renderBtns();
	})

	$( document ).on( "click", ".anime", addAnimeChar );
	renderBtns();
})