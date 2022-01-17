let picBox = document.querySelector('#pic-box');
let movieTitle = document.querySelector('#title-box');

let movieCast = document.querySelector('#cast');
let movieAdInfo = document.querySelector('#ad-info');
let movieOver = document.querySelector('#over');
let movieCard = document.querySelector('#movie-card');
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

movieCard.setAttribute('style', 'display:flex');
let storedID = JSON.parse(localStorage.getItem('movieID')); 

var getMovieInfo = function(sourceID) {
    let movieId = sourceID
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=734711869501c48d5ea1cb162098c006&language=en-US`)
    .then(response => response.json())
        .then(data => {
            console.log(data);
            let title=document.querySelector('#title-text');
            title.textContent=data.title;
            title.setAttribute('style', 'order: -1; margin-bottom: -5px; font-weight: bold; font-size: 1.5em')
            movieTitle.appendChild(title);
            movieTitle.setAttribute('style', 'display: flex; flex-direction: column');
            movieOver.textContent = data.overview;
            let tagLine = document.getElementById('tagline');
            let overviewBox = document.getElementById('overbox');
            tagLine.textContent = '';
            if (data.tagline !== ''){
                tagLine.textContent = '"' + data.tagline + '"';
                tagLine.setAttribute('style', 'font-style:italic; font-size: 1.5em; font-weight:bold; text-align:center; padding-top: 10px')
                // movieOver.setAttribute('style', 'margin-bottom: -50px')
                overviewBox.setAttribute('style', 'display:flex; flex-direction: column')
            }
            //getting genres//
            let genres = data.genres;
            let movGen = []; 
            for (let i=0; i<genres.length; i++){
                movGen.push(genres[i].name)
                console.log(movGen)
            }
            movGen = movGen.join(' / ');                //this will pass to the page
            console.log(movGen);
            //getting release year//
            let releaseDate = data.release_date;
            releaseYear = releaseDate.split('-');
            releaseYear = releaseYear[0];               //this will pass to the page
            console.log('releaseYear: ', releaseYear);
            //putting year and genre on page//
            let movieYearGenre = `${releaseYear} | ${movGen}`;
            console.log(movieYearGenre);
            let movYG = document.getElementById('year-gen');
            movYG.textContent = movieYearGenre;
            movYG.setAttribute('style', 'font-style:italic; font-size: 1em')
            //populating poster img//
            let posterID = data.poster_path;                                    
            let moviePoster = 'https://image.tmdb.org/t/p/original/' + posterID;
            let poster = document.getElementById('pic-box');
            //PR : Allow get image file from Cross Origin
            poster.crossOrigin = '';
            poster.onload = function() {
                Grade(document.querySelectorAll('.gradient-wrap'), null, function(gradientData){
                    //PR: Linear gradient for info page when a movie info is displayed
                    var rgba1 = (gradientData[0].gradientData)[0].rgba;
                    var rgba2 = (gradientData[0].gradientData)[1].rgba;
                    var color1 = 'rgb('+rgba1[0]+','+rgba1[1]+','+rgba1[2]+')';
                    var color2 = 'rgb('+rgba2[0]+','+rgba2[1]+','+rgba2[2]+')';
                    $("body").css('background','linear-gradient(to right, '+color1+', '+color2+')' );
                })                  
            };
            poster.src = moviePoster;   
        })
}

let getMovieCast = function(sourceID){
    fetch('https://api.themoviedb.org/3/movie/' + sourceID + '/credits?api_key=734711869501c48d5ea1cb162098c006&')
    .then(response => response.json())
        .then(data => {
            console.log(data);
            let movieAct = data.cast;
            let movieCrew = data.crew;
            let starring = movieAct.splice(0, 4);
            let stars = [];
            function getStars(){
                for (let i=0; i<starring.length; i++){
                    stars.push(starring[i].name);
                }
            }
            getStars();
            stars = 'Starring: ' + stars.join(', ');
            let directorsAll = [];
            function getDirector(){
                for (let i=0; i<movieCrew.length; i++){
                    if (movieCrew[i].known_for_department === 'Directing'){
                        directorsAll.push(movieCrew[i].name);
                    }
                }
            }
            getDirector();

            function getFullCast() {
                let director = 'Directed by: ' + directorsAll[0];
                let cast = director + ' | ' + stars;
                console.log(cast);
                movieCast.textContent = cast
            }
            getFullCast();

        })

};

//PR: Movie Trailer
let getMovieTrailer = function(sourceID) {
    fetch('https://api.themoviedb.org/3/movie/' + sourceID + '/videos?api_key=734711869501c48d5ea1cb162098c006')
    .then(response => response.json())
        .then(data => {
            var youtubeKey;
            var results = data.results;
            console.log(results)
            //PR: Either find an official trailer
            for(var i=0; i<results.length; i++) {
                console.log(results[i].official==true)
                if(results[i].type=="Trailer" && results[i].official==true) {
                    youtubeKey = results[i].key
                }
            }
            //PR: Otherwise get an unofficial trailer
            if(youtubeKey == undefined) {
                for(var i=0; i<results.length; i++) {
                    console.log(results[i].official==true)
                    if(results[i].type=="Trailer") {
                        youtubeKey = results[i].key
                    }
                }
            }
            $("#trailerCard").empty().append('<iframe width="410" height="300" src="https://www.youtube.com/embed/'+youtubeKey+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        });

    
}

var randomMovie = function() {
    let randomID = staffPicks[Math.floor(Math.random()*staffPicks.length)];
    getMovieInfo(randomID);
    getMovieCast(randomID);
    getMovieTrailer(randomID);
}

// event listener for randomizer
let randomizer = $("#randomizer")
console.log(randomizer)
randomizer.click(randomMovie);


//generate a cocktail recipe
var cocktail = function() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        document.getElementById('cocktailName').textContent = data.drinks[0].strDrink;
        document.getElementById('ingredients').textContent = "";
        document.getElementById('cocktailBtn').textContent = "Anotha!";
        var ing = Object.keys(data.drinks[0]) 
        for (let i = 1; i < 16; i++) {
            var ingredient = data.drinks[0][`strIngredient${i}`] 
            var amount = data.drinks[0][`strMeasure${i}`] 
            console.log(ingredient)
            if (ingredient == null) {
                return false;
            }
            var newLi = document.createElement("li")
            newLi.textContent = amount + " " + ingredient;
            var list = document.getElementById("ingredients")
            list.appendChild(newLi)
        }
      });
}

let cocktailBtn = $("#cocktailBtn")
cocktailBtn.click(cocktail);

// get movie cast since not contained in movie object
getMovieCast(storedID);
getMovieInfo(storedID);
getMovieTrailer(storedID);

