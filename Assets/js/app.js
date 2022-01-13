$(document).foundation()

// Fetch TMDB API for genre
var getMovieByGenre = function(genre){
    //sorting results on the basis of vote count >=10 and vote average
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=734711869501c48d5ea1cb162098c006&sort_by=vote_average.desc&vote_count.gte=10000&with_genres='+genre)
        .then(response => response.json())
    .then(data => {
        let movieObjects = Array.from(data.results)
        //console.log(movieObjects)
        movieObjects = movieObjects.slice(0, 5); //cutting it down to an array of 5 movie objects
        console.log(movieObjects);
        localStorage.setItem('movieObjects', JSON.stringify(movieObjects));
    });
    //open up the result page
    window.open('./Assets/html/results.html');
};
// Fetch TMDB API for year
// var getMovieByYear = function(year){
//         fetch('https://api.themoviedb.org/3/discover/movie?api_key=734711869501c48d5ea1cb162098c006&primary_release_year='+year)
//         .then(response => response.json())
//     .then(data => console.log(data));
//     };

//Fetch TMDB API for user input
var getMovieByTitle = function(){
    var userInputEl = $("#userInput").val();
        fetch('https://api.themoviedb.org/3/search/movie?&api_key=734711869501c48d5ea1cb162098c006&sort_by=title&sort_by=backdrop_path&query='+userInputEl)
        .then(response => response.json())
    .then(data => console.log(data));
     //open up the result page
     window.open('./Assets/html/results.html');
    }
$("#btn").on( "click",getMovieByTitle);