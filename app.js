$(document).ready(function() {

	// All my global variables
	var fantasyThemedStuff = [
	"Raistlin", "D&D", "Forgotten Realms", "Mistborn", "Conan", "Drizzt", "Baldur's Gate", "Tempus", "Lord of the Rings", "Shannara"
	];

	// var queryURL = "http://api.giphy.com/v1/gifs/api_key=dc6zaTOxFJmzC";

  function generatingSearchedForGifs() {
      // Grabbing and storing the data-fantasy property value from the button
      var fantasy = $("#fantasySearchBox").val().trim();
      var searchedFantasy = fantasy;

      // Constructing a queryURL using the fantasy name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      searchedFantasy + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      .done(function(response) {
        console.log(queryURL);

        console.log(response);
        var stuffFromGiphy = response.data;

          // Looping through each result item
          for (var i = 0; i < stuffFromGiphy.length; i++) {

            var fantasyDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + stuffFromGiphy[i].rating);

            // Creating and storing an image tag
            var fantasyImage = $("<img>");
            // fantasyImage.attr("src", stuffFromGiphy[i].images.fixed_height.url);
            fantasyImage.attr("src", still);
            fantasyImage.attr("data-still", still);
            fantasyImage.attr("data-animate", animated);
            fantasyImage.attr("data-state", "still");

            fantasyDiv.append(p);
            fantasyDiv.append(fantasyImage);

            $("#fantasticGifs").prepend(fantasyDiv);
          }
        });
    };


	// This is for the buttons already on the page
	$("button").on("click", function() {
      // Grabbing and storing the data-fantasy property value from the button
      var fantasy = $(this).attr("data-fantasy");

      // Constructing a queryURL using the fantasy name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      fantasy + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
      	url: queryURL,
      	method: "GET"
      })
        // After data comes back from the request
        .done(function(response) {
        	console.log(queryURL);

        	console.log(response);

          // storing the data from the AJAX request in the stuffFromGiphy variable
          var stuffFromGiphy = response.data;

          // Looping through each result item
          for (var i = 0; i < stuffFromGiphy.length; i++) {

            var fantasyDiv = $("<div>");

            var p = $("<p>").text("Rating: " + stuffFromGiphy[i].rating);

            var fantasyImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            // fantasyImage.attr("src", stuffFromGiphy[i].images.fixed_height.url);
            fantasyImage.attr("src", still);
            fantasyImage.attr("data-still", still);
            fantasyImage.attr("data-animate", animated);
            fantasyImage.attr("data-state", "still");
            // fantasyImage.addClass("animal-image");

            fantasyDiv.append(p);
            fantasyDiv.append(fantasyImage);

            $("#fantasticGifs").prepend(fantasyDiv);
          }
        });
      });

    // Need this to run when the submit button is hit
    $("#moreFantasticGifs").on("click", function(event) {
    	event.preventDefault();

        // This line grabs the input from the textbox
        var fantasy = $("#fantasySearchBox").val().trim();

        // Adding the fantasy from the textbox to our array
        fantasyThemedStuff.push(fantasy);
        console.log(fantasyThemedStuff);
        
        generatingSearchedForGifs();
        // Calling renderButtons which handles the processing of our fantasy array
        renderButtons();
      });

    // This is to create new buttons when someone searches for something, and to add that item to the appropriate array
    function renderButtons() {
    	// $("#greatFantasyButtons").empty();

    	var a = $("<button>");
      a.addClass("fantasy");
      a.attr("data-fantasy", fantasyThemedStuff[fantasyThemedStuff.length-1]);
      a.text(fantasyThemedStuff[fantasyThemedStuff.length-1]);
      $("#greatFantasyButtons").append(a);
      
    }

  });

