// array of nintendo characters that will have buttons at each refresh of page
var nintendoArr = ["Link", "Mario", "Luigi", "Ice Climbers", "Toad"];

var nintendoButton;
var gifImg;
var gifCaption;
var gifFigure;
var querySearch;
var queryURL;

window.onload = function() {
	for (var i=0;i<nintendoArr.length;i++) {
			var nintendoButton = $("<button type='button'>");
		

			nintendoButton.addClass("btn btn-outline-info btn-sm");
		

			nintendoButton.attr("id", nintendoArr[i] + "Button");
		
			

			nintendoButton.text(nintendoArr[i]);
		

			$("#nintendo-buttons-group").append(nintendoButton);
		
		}
}		

// function to dynamically create buttons from nintendoArr
var buttonCreater = function() {

	event.preventDefault();

	buttonName = $("#giphy-form").val().trim();

	// if user didn't input anything, don't create a button out of nothing
	if (buttonName != "") {

		nintendoArr.push(buttonName);

		$("#nintendo-buttons-group").empty();



		for (var i=0;i<nintendoArr.length;i++) {
			var nintendoButton = $("<button type='button'>");
		

			nintendoButton.addClass("btn btn-outline-info btn-sm");
		

			nintendoButton.attr("id", nintendoArr[i] + "Button");
		
			

			nintendoButton.text(nintendoArr[i]);
		

			$("#nintendo-buttons-group").append(nintendoButton);
		
		}

	}
}
// Start of page or submit button click, dynamically creates buttons from nintendoArr by putting index into queryURL and pushes input value into the array
$("#submit-button").on("click", buttonCreater) 
 
	

// nintendoArr button click, appends 10 gifs to id="gifs" of the name of that name

$(document).on("click", ".btn-sm", function() { 
	
	event.preventDefault();

	// function to empty gifs-group so new nintendoArr button click empties previous gifs
	$("#gifs-group").empty();

	
    // This line grabs the name of the button and removes spaces with +'s, can use regexp here??
    querySearch = $(this).text().split(" ").join('+');
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + querySearch + "&api_key=lhoLYl1nq480N9fUdxllWCnMrjfq9Kei&limit=10";
	$.ajax({
	  url: queryURL,
	  method: 'GET'
	}).done(function(result) {
	  console.log(result);

	  for(var j=0;j<result.data.length;j++) {

		  gifImg = $("<img>");
		  gifImg.attr({
		  	"data-still": result.data[j].images.original_still.url,
		  	"data-animate": result.data[j].images.original.url,
		  	// technically, state and src don't need quotations but I like to keep it consistent between the keys
		  	"data-state": "still",
		  	"src": result.data[j].images.original_still.url,
		  	"alt": "gif did not load :(" 
		  })
		  // gifImg.attr("src", result.data[j].images.original_still.url);
		  gifImg.addClass("gif figure-img img-fluid rounded");
		  gifCaption = $("<figcaption>");
		  gifCaption.addClass("figure-caption text-right").text(result.data[j].rating);
		  gifFigure = $("<figure>");
		  gifFigure.addClass("figure").html(gifImg).append(gifCaption);
		  $("#gifs-group").append(gifFigure);
		  // $("#gifs-group").append("<figcaption class='figure-caption'>" + result.data[j].rating + "</figcaption>");

		}
	 
	});
})

$(document).on("click", ".gif", function() { 
	
	state = $(this).data("state");
	still = $(this).data("still");
	animate = $(this).data("animate");
	src = $(this).context.src;
	debugger;
	if ($(this).attr("data-state") == "still") {
		debugger;
		state = "animate";
		src = animate;
		$(this).attr({
			"data-state": state,
			"src": src
		});
		
		// $(this).context.src = src;
	}
	else if ($(this).attr("data-state") == "animate") {
		state = "still";
		src = still;
		$(this).attr({
			"data-state": state,
			"src": src
		});
		// $(this).data("state") = state;
		
		// $(this).context.src = src;
	}

})