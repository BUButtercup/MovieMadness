let picBox = document.querySelector('#pic-box');
let movieTitle = document.querySelector('#title-text');
let movieYearGen = document.querySelector('#year-gen');
let movieCast = document.querySelector('#cast');
let movieAdInfo = document.querySelector('#ad-info');
let movieOver = document.querySelector('#over');
let movieCard = document.querySelector('#movie-card');
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
    "134375", // Home Alone
    "324857", // Spiderman, spiderverse
    "9806", // Incredibles
    "129", // Spirited Away
    "98566", // TMNT
    "546554", // Knives Out
    "2493",  // Princess Bride
    "314365", // Spotlight
    "60308", // Moneyball
    "530385" // MidSommar
]

movieCard.setAttribute('style', 'display:flex');



let storedMovie = JSON.parse(localStorage.getItem('movieObject')); 
// in future local from results will be called storedMovie
let storedTitle = storedMovie.title;
// let storedYearGen = storedMovie[0].subtext;
// let Cast = //need to do another fetch;////////////////////////////
let storedOver = storedMovie.overview;

let getMovieCast = function(){
    let movieID = storedMovie.id;
    fetch('https://api.themoviedb.org/3/discover/movie/' + movieID + '/credits?api_key=734711869501c48d5ea1cb162098c006&')
    .then(response => response.json())
    .then(data => {
        console.log(data.results);
    })
};

let posterID = storedMovie[0].poster_path;                                    //pulling and formatting pics
let moviePoster = 'https://image.tmdb.org/t/p/original/' + posterID;
let poster = document.createElement('img')
poster.setAttribute('src', moviePoster);
poster.setAttribute('style', 'width: 100px; height: 300px');

// picBox.appendChild(poster);
movieTitle.textContent = storedTitle;
movieOver.textContent = storedOver;

var randomMovie = function() {
    console.log("test")
    let movieId = staffPicks[Math.floor(Math.random()*20)]
    console.log(movieId);
    console.log(`https://api.themoviedb.org/3/movie/${movieId}?api_key=734711869501c48d5ea1cb162098c006&language=en-US`)
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=734711869501c48d5ea1cb162098c006&language=en-US`)
    .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem("movieObject");
            window.location.assign("./Assets/html/info.html")
        })
}

// event listener for randomizer
let randomizer = $("#randomizer")
console.log(randomizer)
$('#randomizer').click(randomMovie);

