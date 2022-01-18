$(document).foundation();
let staffPicks = [
  "550988", // Free guy
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
var movieObjects = [];
var lastPage = 0;
var totalItems = 0;

// Fetch TMDB API for genre
var getMovieByGenre = function (genre, pageNo) {
  //sorting results on the basis of vote count >=10 and vote average
  fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=734711869501c48d5ea1cb162098c006&vote_count.gte=5000&with_genres="+genre+"&page="+pageNo)
    .then((response) => response.json())
    .then((data) => {
       console.log(data);
      lastPage = Math.min(10, data.total_pages);
      totalItems = Math.min(100, data.total_results);
      for(var i=0; i<data.results.length; i++) {
        movieObjects.push(data.results[i]);
      }
      if(pageNo >= lastPage) {
        // console.log(movieObjects)
        localStorage.setItem("movieObjects", JSON.stringify(movieObjects));
        localStorage.setItem("totalItems", totalItems);
        //open up the result page
         window.location.assign("results.html");
      }
      else {
        console.log("here");
       getMovieByGenre(genre, pageNo+1);
      }
        });
};

//PR: Function for generating random pages on search of a genre
function getRandomInt(min, max) {
  max = Math.min(max, 500);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//Fetch TMDB API for user input
var getMovieByTitle = function (pageNo) {
  var userInputEl = $("#userInput").val();
  // var lastPage = 0;
  // var totalItems = 0;
    fetch(
      "https://api.themoviedb.org/3/search/movie?&api_key=734711869501c48d5ea1cb162098c006&sort_by=title&sort_by=vote_count.desc&sort_by=backdrop_path&query="+userInputEl+"&page="+pageNo)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
         
        lastPage = data.total_pages;
        totalItems = data.total_results;
        console.log(pageNo)
        console.log(totalItems);
        for(var i=0; i<data.results.length; i++) {
          movieObjects.push(data.results[i]);
        }
        if(pageNo >= lastPage) {
          // console.log(movieObjects)
          localStorage.setItem("movieObjects", JSON.stringify(movieObjects));
          localStorage.setItem("totalItems", totalItems);
          //open up the result page
           window.location.assign("results.html");
        }
        else {
          console.log("here");
         getMovieByTitle(pageNo+1);
        }
        
      });
};
$("#btn").on("click", function() {
  getMovieByTitle(1)
});

var randomMovie = function() {
  let randomID = staffPicks[Math.floor(Math.random()*staffPicks.length)];
  localStorage.setItem("movieID", randomID);
  window.location.assign("info.html");
}

// event listener for randomizer
let randomizer = $("#randomGen")
randomizer.click(randomMovie);



// Fetch TMDB API for year
// var getMovieByYear = function(year){
//         fetch('https://api.themoviedb.org/3/discover/movie?api_key=734711869501c48d5ea1cb162098c006&primary_release_year='+year)
//         .then(response => response.json())
//     .then(data => console.log(data));
//     };
