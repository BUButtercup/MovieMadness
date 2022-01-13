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
let storedOver = storedMovie[0].overview;
let movieID = storedMovie[0].id;

let getMovieCast = function(){
    fetch('https://api.themoviedb.org/3/movie/' + movieID + '/credits?api_key=734711869501c48d5ea1cb162098c006&')
    .then(response => response.json())
        .then(data => {
            // console.log(data);
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
picBox.setAttribute('src', moviePoster);
movieTitle.textContent = storedTitle;
movieOver.textContent = storedOver;

getMovieCast();