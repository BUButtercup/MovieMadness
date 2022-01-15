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

// Fetch TMDB API for genre
var getMovieByGenre = function (genre) {
  //sorting results on the basis of vote count >=10 and vote average
  fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=734711869501c48d5ea1cb162098c006&vote_count.gte=1000&with_genres="+genre)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var totalPages = data.total_pages;
      console.log("totalPages : " + totalPages);
      //generating a random number between 1 and total pages
      var randomPage = getRandomInt(1, totalPages);
      console.log(randomPage);

      fetch("https://api.themoviedb.org/3/discover/movie?api_key=734711869501c48d5ea1cb162098c006&vote_count.gte=1000&with_genres="+genre +"&page=" +randomPage)
        .then((genrePageresponse) => genrePageresponse.json())
        .then((genrePage) => {
          console.log(genrePage);
          let movieObjects = Array.from(genrePage.results);
          //console.log(movieObjects)
          movieObjects = movieObjects.slice(0, 10); //cutting it down to an array of 10 movie objects
          // console.log(movieObjects);
          localStorage.setItem("movieObjects", JSON.stringify(movieObjects));

          //open up the result page
          window.location.assign("results.html");
        });
    });
};

//PR: Function for generating random pages on search of a genre
function getRandomInt(min, max) {
  max = Math.min(max, 500);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//Fetch TMDB API for user input
var getMovieByTitle = function () {
  var userInputEl = $("#userInput").val();
  fetch(
    "https://api.themoviedb.org/3/search/movie?&api_key=734711869501c48d5ea1cb162098c006&sort_by=title&sort_by=backdrop_path&query=" +userInputEl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let movieObjects = Array.from(data.results);
      //console.log(movieObjects)
      movieObjects = movieObjects.slice(0, 10); //cutting it down to an array of 5 movie objects
      console.log(movieObjects);
      localStorage.setItem("movieObjects", JSON.stringify(movieObjects));
      //open up the result page
      window.location.assign("results.html");
    });
};
$("#btn").on("click", getMovieByTitle);

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
