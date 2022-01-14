let picBox = document.querySelector('#pic-box');
let movieTitle = document.querySelector('#title-text');
let movieCast = document.querySelector('#cast');
let movieAdInfo = document.querySelector('#ad-info');
let movieOver = document.querySelector('#over');
let movieCard = document.querySelector('#movie-card');
let titleBox = document.getElementById('titlebox')
let YGBox = document.getElementById('year-gen');
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


let storedMovie = JSON.parse(localStorage.getItem('movieObject')); 
// in future local from results will be called storedMovie
let storedTitle = storedMovie[0].title;
let storedOver = storedMovie[0].overview;
let movieID = storedMovie[0].id;
let storedYGBox = storedMovie[1];
let movieYG = '';

function getStoredYearGenre(){
    const storedYG = [];

    for (let i=0; i<storedYGBox.length; i++){
        let newArr = [storedYGBox[i].title, storedYGBox[i].relGen];
        storedYG.push(newArr);
    }
    for (let i=0; i < storedYG.length; i++){
        let sYG = storedYG[i];
        if (storedTitle === sYG[0]){
        YGBox.textContent = sYG[1];
        }
    }
    // titleBox.setAttribute('style', 'display:flex; align-items: center')
    movieTitle.setAttribute('style', 'margin-top: -10px; margin-bottom: -5px; font-size: 2em')
    YGBox.setAttribute('style', 'margin-bottom: -10px; font-style: italic')

    console.log(storedYG);
    console.log(movieYG);
}





let getMovieCast = function(){
    fetch('https://api.themoviedb.org/3/movie/' + movieID + '/credits?api_key=734711869501c48d5ea1cb162098c006&')
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

let posterID = storedMovie[0].poster_path;                                    //pulling and formatting pics
let moviePoster = 'https://image.tmdb.org/t/p/original/' + posterID;
let poster = document.getElementById('pic-box')
poster.setAttribute('src', moviePoster);

movieTitle.textContent = storedTitle;
movieOver.textContent = storedOver;

var randomMovie = function() {
    let movieId = staffPicks[Math.floor(Math.random()*staffPicks.length)]
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=734711869501c48d5ea1cb162098c006&language=en-US`)
    .then(response => response.json())
        .then(data => {
            console.log(data);
            storageBox = [data, movieID] //created this variable to match array style of normal movieObject
            localStorage.setItem("movieObject", JSON.stringify(storageBox));
            window.location.assign("./info.html")
        })
}

// event listener for randomizer
let randomizer = $("#randomizer")
console.log(randomizer)
randomizer.click(randomMovie);



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
getMovieCast();
getStoredYearGenre()


