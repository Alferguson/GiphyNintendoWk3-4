// array of nintendo characters that will have buttons at each refresh of page
var nintendoArr = ["Link", "Mario", "Luigi", "Samus", "Ice Climbers", "Toad"];

var nintendoButton = $("<button type='button'>");

var querySearch;
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + querySearch + "api_key=dc6zaTOxFJmzC&limit=10";


// function to dynamically create buttons from nintendoArr
function buttonCreater() {

	event.preventDefault();

	buttonName = $("#submit-button").val().trim();

	nintendoArr.push(buttonName);

	nintendoButton.addClass("btn btn btn-outline-info btn-sm");

	nintendoButton.attr("id", buttonName + "Button");

	nintendoButton.text(buttonName);

	$("#nintendo-buttons-group").append(nintendoButton);


	$.ajax({
		  url: queryURL,
		  method: 'GET'
		}).done(function(result) {
		  console.log(result);

		 
		});
}
// Start of page or submit button click, dynamically creates buttons from nintendoArr by putting index into queryURL and pushes input value into the array
$("#submit-button").on("click", buttonCreater) 
 
	

// nintendoArr button click, appends 10 gifs to id="gifs" of the name of that name

$("#nintendo-buttons").on("click", function() { 

	// function to empty gifs-group so new nintendoArr button click empties previous gifs
	$("#gifs-group").empty();

	event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();
	$.ajax({
	  url: queryURL,
	  method: 'GET'
	}).done(function(result) {
	  console.log(result);

	 
	});
})
// gif is clicked, animate them, and if clicked again, they will go back to initial frame
$("#gifs").on("click", function());

