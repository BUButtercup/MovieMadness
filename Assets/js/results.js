let listCont = document.querySelector('#list-container');
let genreCats = [{id: 28, name: 'Action'}, {id: 12, name: 'Adventure'}, {id: 16, name: 'Animation'}, {id: 35, name: 'Comedy'}, {id: 80, name: 'Crime'}, {id: 99, name: 'Documentary'}, {id: 18, name: 'Drama'}, {id: 10751, name: 'Family'}, {id: 14, name: 'Fantasy'}, {id: 36, name: 'History'}, {id: 27, name: 'Horror'}, {id: 10402, name: 'Music'}, {id: 9648, name: 'Mystery'}, {id: 10749, name: 'Romance'}, {id: 878, name: 'Sci Fi'}, {id: 10770, name: 'TV Movie'}, {id: 53, name: 'Thriller'}, {id: 10752, name: 'War'}, {id: 37, name: 'Western'}];
let movieObjects = Array.from(JSON.parse(localStorage.getItem('movieObjects')));
// let getInfoBtns = document.querySelectorAll('.movieCard');;
let subTextBox = [];


function loadInfo(index){
    console.log(movieObjects)
    subTextBox = Array.from(subTextBox.slice(0, 10));
    console.log(subTextBox)
    for (let i=0; i<subTextBox.length; i++){
        for (let j=0; j<movieObjects.length; j++){
            if (subTextBox[i] === movieObjects[j]){
            console.log('yes');
            }
        }
    }
    console.log(index)
    console.log(movieObjects[index])

    console.log(movieObjects[index])
    mObj = [movieObjects[index], subTextBox]
    localStorage.setItem("movieObject", JSON.stringify(mObj));
    window.location.assign("./info.html")
}

// event listener for the cards
listCont.addEventListener("click", function (event) {
    let element = event.target  
    if (hasParentWithMatchingSelector(element, ".movieCard") || element.className == "movieCard") {
        let index = element.id
        loadInfo(index);
    }
    
})

// returns true if the element or one of its parents has the class classname
// taken off stackoverflow
function hasParentWithMatchingSelector (target, selector) {
    return [...document.querySelectorAll(selector)].some(el =>
      el !== target && el.contains(target)
    )
  }
function makeListCard(arrInd){ //what is feeding into here is the object that is stored within the array index location
    let movieObj = movieObjects[arrInd];       //the object fed into the fxn
    let genreIDs;               //holder for the genre names that have been assigned to the movie
    let releaseYear;
    let genres = [];

    console.log("movieObj : ", movieObj.title, movieObj);

    function getGenres(){
        genreIDs = movieObj.genre_ids;
        genreIDNums = [];
        for (let i=0; i<genreIDs.length; i++){              //matching genre IDs with their names and pushing to an array that will be used
            let gIDNum = parseInt(genreIDs[i]);             //later on movie card
            genreIDNums.push(gIDNum);
            for (let j=0; j<genreCats.length; j++){
                if (genreIDNums[i] === genreCats[j].id){
                    let genreName = genreCats[j].name;
                    genres.push(genreName);
                }
            }
        }
        genres = genres.join(' / ');            //joining and formatting genres for display
        console.log('genres: ', genres);
    }

    function getReleaseYear() {                     //to get release year
        let releaseDate = movieObj.release_date;
        releaseYear = releaseDate.split('-');
        releaseYear = parseInt(releaseYear[0]);     //parse out release year as a number
        console.log('releaseYear: ', releaseYear);
    }
        getGenres();
        getReleaseYear();
            
        //vars to create elements w/ basic styling
        let createH4 = document.createElement('h4');   
        createH4.setAttribute('style', 'margin-bottom: -5px; font-weight: bold')
        createH4.setAttribute('id', arrInd)
        let createH5 = document.createElement('h5');
        createH5.setAttribute('id', arrInd)
        let infoP = document.createElement('p');
        infoP.setAttribute('style', 'line-height: 1.25em')
        infoP.setAttribute('id', arrInd)
        let movieBox = document.createElement('div');
        movieBox.setAttribute('class', 'movieBox');
        movieBox.setAttribute('style', 'margin-left:10px')
        
        let posterID = movieObj.poster_path;                                    //pulling and formatting pics
        let moviePoster = 'https://image.tmdb.org/t/p/original/' + posterID;
        let poster = document.createElement('img')
        poster.setAttribute('src', moviePoster);
        poster.setAttribute('id', arrInd);
        poster.setAttribute('style', 'width: 100px; height: 150px');

        let movieCard = document.createElement('div');
        movieCard.setAttribute('class', 'movieCard');
        movieCard.setAttribute('id', arrInd); // added by henry
        movieCard.setAttribute('style', 'display:flex; align-items: center; border: 1px solid white; margin: 20px; padding: 10px')

        createH4.textContent = movieObj.title;
        let subText = 'released ' + releaseYear + ' | ' + genres + '';
        createH5.textContent = subText;
        let newObj = {
            title: movieObj.title,
            relGen: subText
        };
        subTextBox.push(newObj);
        infoP.textContent = movieObj.overview;
        movieBox.appendChild(createH4);
        movieBox.appendChild(createH5);
        movieBox.appendChild(infoP);
        
        movieCard.appendChild(poster);
        movieCard.appendChild(movieBox);

        listCont.appendChild(movieCard);
};
console.log('stb', subTextBox);

window.onload = () =>{
    listCont.innerHTML = '';
    for (let i=0; i< movieObjects.length; i++){      //for each of the first 10 movies on the list
        makeListCard(i)
    } 
}
