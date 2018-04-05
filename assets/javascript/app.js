$(document).ready(function() {

    // ========== global variables ==========
    // ======================================

    // our array of classic movies
    var topicsArr = ["the big sleep", "vertigo", "casablanca", "citizen kane", "an american in paris", "psycho", "rear window", "a streetcar named desire", "gone with the wind", "key largo", "miracle on 34th street", "duck soup", "seven samurai", "rashomon", "his girl friday", "the maltese falcon", "the birds", "carnival of souls"];

    // ============== actions ===============
    // ======================================

    // function that updates tag display
    function updateButtons() {

        $("#tag-content").empty();

        for (var i = 0; i < topicsArr.length; i++) {
        
            var tagButton = $("<button>");
            tagButton.attr("data-movie", topicsArr[i]).addClass("tag");
            tagButton.text(topicsArr[i]);

            $("#tag-content").append(tagButton);

        }

    };

    // function that lets user add to array and updates tag display
    $("#add-button").on("click", function(event) {

        event.preventDefault();

        var textInput = $("#addbutton-input").val().trim();

        if (textInput === "") {
            return;
        }

        else {

        topicsArr.push(textInput);
        console.log(topicsArr);
        
        // display
        updateButtons();

        }

    });

    // function that presents giphy gifs when user clicks tags 
    $(document.body).on("click", "button", function() {

        // display
        $("#tag-content button").removeClass("active");
        $(this).addClass("active");
        $("#gifs-content").empty();

        var movie = $(this).attr("data-movie");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var movieDiv = $("<div>");
                var p = $("<p>");
                var movieImage = $("<img>");

                p.text("rating: " + results[i].rating);
                movieImage.attr("src", results[i].images.fixed_height_still.url).addClass("img-responsive");
                movieImage.attr("data-still", "true");
                movieImage.attr("data-number", i);

                // display
                movieDiv.append(movieImage);
                movieDiv.append(p);
                $("#gifs-content").append(movieDiv);

            }

            // function that toggles above gifs on and off
            $("#gifs-content img").on("click", function() {

                var gifNumber = $(this).attr("data-number");
                console.log("Is this working?");
                console.log(gifNumber);

                if ($(this).attr("data-still") === "true") {
                    
                    $(this).attr("src", results[gifNumber].images.fixed_height.url);
                    $(this).attr("data-still", "false");

                }

                else if ($(this).attr("data-still") === "false") {

                    $(this).attr("src", results[gifNumber].images.fixed_height_still.url);
                    $(this).attr("data-still", "true");

                }

            });

        });

    });

    // presents initial tag display when page first loads
    updateButtons();

});