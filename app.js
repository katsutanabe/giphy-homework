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
    $("#food-buttons").on("click", ".food-button", function(){
        //$("#images").empty();
    event.preventDefault();
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
         
            // console.log(response);
            for (var i = 0; i < results.length; i++){
                // console.log(response[i])
                let foodDiv = $("<div >");//class=\"food-item\"
                let rating = results[i].rating;
                let p = $("<p>").text("Rating:" + rating);
                let animated = $("<img>");
                animated.attr("src", results[i].images.fixed_height_still.url);
                animated.attr('data-isMoving', 'false')
                animated.attr('data-stillImageSource', results[i].images.fixed_height_still.url);
                animated.attr('data-movingImageSource', results[i].images.fixed_height.url);
            
                animated.addClass('image');

                //  let foodImage = $("<img>");
                //  foodImage.attr("src", still);
                //  foodImage.attr("data-still", still);
                //  foodImage.attr("data-animate", animated);
                //  foodImage.attr("data-state", "still");
                //  foodImage.addClass("food-image");

                foodDiv.prepend(p);
                foodDiv.prepend(animated);

                $("#images").prepend(foodDiv);
                  

            }
        });
    });

    //set images from still to animated when clicking each image
   
    $("#images").on("click", ".image", function(){
        let dataSource
        let isMoving = $(this).attr("data-isMoving");

        if (isMoving === "false"){
            dataSource = $(this).attr("data-movingImageSource");
            $(this).attr("src", dataSource);
            $(this).attr("data-isMoving", "true");

        }
        if (isMoving === "true") {
            dataSource = $(this).attr("data-stillImageSource");
            $(this).attr("src", dataSource);
            $(this).attr("data-isMoving", "false");
        }  

    });

    $("#add-food").on("click", function(event){
        event.preventDefault();
        //let newFood = $("input").eq(0).val();
          let newFood = $("input").val().trim();
        
        if (newFood === "") {
            return;
        }else if (newFood.indexOf(foods) === -1) {
            console.log(newFood);
            foods.push(newFood);
            
        }
        // if(newFood.length > 2){
        //     foods.push(newFood);
        $("#food-input").val("");
        populateButtons(foods, "food-button", "#food-buttons");
        //$("#add-food").val("");
    });

    populateButtons(foods, "food-button", "#food-buttons");

})