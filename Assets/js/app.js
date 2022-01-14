$(document).foundation()
let staffPicks = [
    "861345", // Free guy
    "105864", // The good dinosaur
    "10637", // Remember the Titans
    "102899", // Ant Man
    "926", // Galaxy Quest
    "264660", // Ex Machina
    "318846", // The Big Short
    "157336",  // interstellar
    "18240", // The proposal
    "324857", // Spiderman, spiderverse
    "9806", // Incredibles
    "129", // Spirited Away
    "1498", // TMNT
    "546554", // Knives Out
    "2493",  // Princess Bride
    "314365", // Spotlight
    "60308", // Moneyball
    "530385" // MidSommar
]

// Fetch TMDB API for genre
var getMovieByGenre = function(genre){
    //sorting results on the basis of vote count >=10 and vote average
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=734711869501c48d5ea1cb162098c006&sort_by=vote_average.desc&vote_count.gte=1000&with_genres='+genre)
        .then(response => response.json())
    .then(data => {
        console.log(genre)
        let movieObjects = Array.from(data.results)
        //console.log(movieObjects)
        movieObjects = movieObjects.slice(0, 10); //cutting it down to an array of 10 movie objects
        console.log(movieObjects);
        localStorage.setItem('movieObjects', JSON.stringify(movieObjects));
       //open up the result page
        window.location.assign('./Assets/html/results.html');
    });
    
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
    .then(data => {
        console.log(data);
        let movieObjects = Array.from(data.results)
        //console.log(movieObjects)
        movieObjects = movieObjects.slice(0, 10); //cutting it down to an array of 5 movie objects
        console.log(movieObjects);
        localStorage.setItem('movieObjects', JSON.stringify(movieObjects));
     //open up the result page
     window.location.assign('./Assets/html/results.html');
    })
};
$("#btn").on( "click",getMovieByTitle);

var randomMovie = function() {
    let movieId = staffPicks[Math.floor(Math.random()*staffPicks.length)]
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=734711869501c48d5ea1cb162098c006&language=en-US`)
    .then(response => response.json())
        .then(data => {
            console.log(data);
            storageBox = [data, data.id] //created this variable to match array style of normal movieObject
            localStorage.setItem("movieObject", JSON.stringify(storageBox));
            window.location.assign('./Assets/html/info.html')
        })
}

// event listener for randomizer
let randomizer = $("#reel")
console.log(randomizer)
randomizer.click(randomMovie);