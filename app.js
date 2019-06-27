//create a dynamic kweb page that populates passed into it through text
//create array to hold the "buttons"


$(document).ready(function(){

    let foods = ["Cheese", "Milk", "Eggs", "Bacon", "Cereal"];
    //function to make the buttons and add them to the page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo){
        $(areaToAddTo).empty();
        
        for (let i=0; i < arrayToUse.length; i++){

            let a =$("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    }

    //Create a function that will populate images from the giphy app API 
    $(document).on("click", ".food-button", function(){
        //$("#images").empty();

       // $(".food-button").removeClass("active");
        //$(this).addClass("active");

        let type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        type + "&api_key=DLaR3fkwkjQGYxvsC8ankszBYkwzeNIU&limit=10";
        //ajax Call

        $.ajax({
            url:queryURL,
            method: "GET"
        })

        .then(function(response){
            let results = response.data;
         
            console.log(response);
            for (var i = 0; i < results.length; i++){
                 let foodDiv = $("<div class=\"food-item\">");
                 let rating = results[i].rating;
                 let p = $("<p>").text("Rating:" + rating);
                 let animated = $("<img>");
                  animated.attr("src", results[i].images.fixed_height_still.url);

                //  let foodImage = $("<img>");
                //  foodImage.attr("src", still);
                //  foodImage.attr("data-still", still);
                //  foodImage.attr("data-animate", animated);
                //  foodImage.attr("data-state", "still");
                //  foodImage.addClass("food-image");

                 foodDiv.append(p);
                 foodDiv.append(foodImage);

                 $("#images").append(foodDiv);
                  

            }
        });
    });

    //set images from still to animated when clicking each image

    $(document).on("click", ".food-image", function(){
        let state = $(this).attr("date-state");

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }  

    });

    $("#add-food").on("click", function(event){
        event.preventDefault();
        let newFood = $("input").eq(0).val();
        
        
        if(newFood.length > 2){
            foods.push(newFood);
        }
        populateButtons(foods, "food-button", "#food-buttons");
    });

    populateButtons(foods, "food-button", "#food-buttons");

})