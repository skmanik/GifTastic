$("#add-button").on("click", function () {

    event.preventDefault();

    var animalInput = $("#addbutton-input").val().trim();

    console.log(animalInput);
    var newButton = $("<button>");
    newButton.attr("data-animal", animalInput);
    newButton.text(animalInput);

    $(".test").append(newButton);

});

$(document.body).on("click", "button", function () {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var results = response.data;


        for (var i = 0; i < results.length; i++) {

            var animalDiv = $("<div>");
            var p = $("<p>");

            p.text(results[i].rating);

            var animalImage = $("<img>");

            animalImage.attr("src", results[i].images.fixed_height.url);

            animalDiv.append(p);
            animalDiv.append(animalImage);
            $("#gifs-appear-here").prepend(animalDiv);

        }

    });
});