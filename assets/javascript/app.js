$(document).ready(function() {

    // ========== global variables ==========
    // ======================================

    // our array of classic movies
    var topicsArr = ["the big sleep", "vertigo", "casablanca", "citizen kane", "an american in paris", "psycho", "rear window", "a streetcar named desire", "gone with the wind", "miracle on 34th street", "duck soup", "seven samurai", "rashomon", "the maltese falcon"];

    // ============== actions ===============
    // ======================================

    // function that updates tag display
    function updateButtons() {

        $("#tag-content").empty();

        for (var i = 0; i < topicsArr.length; i++) {
        
            var tagButton = $("<button>");
            tagButton.attr("data-movie", topicsArr[i]);
            tagButton.text(topicsArr[i]);

            $("#tag-content").append(tagButton);

        }

    };

    // function that lets user add to array and updates tag display
    $("#add-button").on("click", function () {

        event.preventDefault();

        var textInput = $("#addbutton-input").val().trim();

        topicsArr.push(textInput);
        console.log(topicsArr);
        
        // display
        updateButtons();

    });

    // function that presents giphy gifs when user clicks tags 
    $(document.body).on("click", "button", function () {

        // display
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
                p.text(results[i].rating);

                var movieImage = $("<img>");
                movieImage.attr("src", results[i].images.fixed_height.url);

                // display
                movieDiv.append(p);
                movieDiv.append(movieImage);
                $("#gifs-content").append(movieDiv);

            }

        });
    });

    // presents initial tag display when page first loads
    updateButtons();

});