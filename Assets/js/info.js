let picBox = document.querySelector('#pic-box');
let movieTitle = document.querySelector('#title-text');
let movieYearGen = document.querySelector('#year-gen');
let movieCast = document.querySelector('#cast');
let movieAdInfo = document.querySelector('#ad-info');
let movieOver = document.querySelector('#over');
let movieCard = document.querySelector('#movie-card');
movieCard.setAttribute('style', 'display:flex');






let storedMovie = JSON.parse(localStorage.getItem('movieObjects')); 
// in future local from results will be called storedMovie
let storedTitle = storedMovie[0].title;
// let storedYearGen = storedMovie[0].subtext;
// let Cast = //need to do another fetch;////////////////////////////
let storedOver = storedMovie[0].overview;

let getMovieCast = function(){
    let movieID = storedMovie[0].id;
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

picBox.appendChild(poster);
movieTitle.textContent = storedTitle;
movieOver.textContent = storedOver;