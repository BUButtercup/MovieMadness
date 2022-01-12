$(document).foundation()

// dropdown
// $('.dropdown-trigger').dropdown();

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var options = {
        dropdownOptions: {
            alignment: 'bottom',
            hover: false,
            coverTrigger: false,
            closeOnClick: true
        }
    }
    //var instances = M.Dropdown.init(elems, options);
  });



// Fetch TMDB API for genre
var getMovieByGenre = function(genre){
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=734711869501c48d5ea1cb162098c006&with_genres='+genre)
        .then(response => response.json())
    .then(data => console.log(data));
    };
// Fetch TMDB API for year
var getMovieByYear = function(year){
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=734711869501c48d5ea1cb162098c006&primary_release_year='+year)
        .then(response => response.json())
    .then(data => console.log(data));
    };
