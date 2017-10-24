// array of nintendo characters that will have buttons at each refresh of page
var nintendoArr = ["Link", "Mario", "Luigi", "Ice Climbers", "Toad"];

// global var declarations
var nintendoButton;
var gifImg;
var gifCaption;
var gifFigure;
var querySearch;
var queryURL;

// function at start of page
var buttonStarter = function() {
	for (var i=0;i<nintendoArr.length;i++) {
		// button tag
		nintendoButton = $("<button>");
		// give nintendo button classes, text, and ids
		nintendoButton
		.addClass("btn btn-outline-info btn-sm")
		.text(nintendoArr[i])
		.attr({
			"id": nintendoArr[i] + "Button",
			"type": "button"
		});
		// append buttons to jumbotron
		$("#nintendo-buttons-group").append(nintendoButton);
	}
}

// function to dynamically create buttons from nintendoArr
var buttonCreater = function() {
	// button click doesn't refresh page
	event.preventDefault();
	// git text from input box, if has many spaces, trim it
	buttonName = $("#giphy-form").val().trim();
	// if user didn't input anything, don't create a button out of nothing OR if the user input is the same as the last button, don't create another one, I thought about making a loop where already created buttons can't be created but that may acutally piss off users
	if (buttonName != "" && buttonName != nintendoArr[nintendoArr.length-1]) {
		// push the text that was entered into the array
		nintendoArr.push(buttonName);
		// set nintendoButton to button tag and add classes, text, and ids
		nintendoButton = $("<button>");
		nintendoButton
		.addClass("btn btn-outline-info btn-sm")
		.text(nintendoArr[nintendoArr.length-1])
		.attr({
			"id": nintendoArr[nintendoArr.length-1] + "Button",
			"type": "button"
		});
		// append nintendo button to jumbotron
		$("#nintendo-buttons-group").append(nintendoButton);
	}
}
// creates gifs from button 
var createGifs = function() {
	// button click doesn't refresh page
	event.preventDefault();

	// function to empty gifs-group so new nintendoArr button click empties previous gifs
	$("#gifs-group").empty();

    // This line grabs the name of the button and removes spaces with +'s, can use regexp here??
    querySearch = $(this).text().split(" ").join('+');
    // ajax call, querySearch is what the user inputed
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + querySearch + "&api_key=lhoLYl1nq480N9fUdxllWCnMrjfq9Kei&limit=10";
	$.ajax({
	  url: queryURL,
	  method: 'GET'
	}).done(function(result) {
		// for loop to create bootstrap images with figure captions into the gifs-group
	  	for(var j=0;j<result.data.length;j++) {
	  		// essentially, creating figures based off of api object
			gifImg = $("<img>");
		  	gifImg
		  	.addClass("gif figure-img img-fluid rounded")
		  	.attr({
			  	"data-still": result.data[j].images.original_still.url,
			  	"data-animate": result.data[j].images.original.url,
			  	// technically, state and src don't need quotations but I like to keep it consistent between the keys
			  	"data-state": "still",
			  	"src": result.data[j].images.original_still.url,
			  	"alt": "gif did not load :(" 
		  	});
			gifCaption = $("<figcaption>");
			gifCaption
			.addClass("figure-caption text-center")
			.text("Rating: " + result.data[j].rating);
			gifFigure = $("<figure>");
			gifFigure
			.addClass("figure")
			.html(gifImg)
			.append(gifCaption);
			$("#gifs-group").append(gifFigure);
		}
	});
}

// when a gif is clicked, do this
var clickGif = function () { 
	// sets up variables such as state, still, and animate
	state = $(this).data("state");
	still = $(this).data("still");
	animate = $(this).data("animate");
	src = $(this).context.src;
	if ($(this).attr("data-state") == "still") {
		state = "animate";
		src = animate;
		$(this).attr({
			"data-state": state,
			"src": src
		});
	}
	else if ($(this).attr("data-state") == "animate") {
		state = "still";
		src = still;
		$(this).attr({
			"data-state": state,
			"src": src
		});
	}
}

// on start of page, load nintendoArr up as buttons
window.onload = buttonStarter(); 

// Start of page or submit button click, dynamically creates buttons from nintendoArr by putting index into queryURL and pushes input value into the array
$("#submit-button").on("click", buttonCreater);

// nintendoArr button click, appends 10 gifs to id="gifs" of the name of that name
$(document).on("click", ".btn-sm", createGifs); 

// when a gif is clicked, do this
$(document).on("click", ".gif", clickGif);