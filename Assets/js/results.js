let listCont = document.querySelector('#list-container');
let genreCats = [{id: 28, name: 'Action'}, {id: 12, name: 'Adventure'}, {id: 16, name: 'Animation'}, {id: 35, name: 'Comedy'}, {id: 80, name: 'Crime'}, {id: 99, name: 'Documentary'}, {id: 18, name: 'Drama'}, {id: 10751, name: 'Family'}, {id: 14, name: 'Fantasy'}, {id: 36, name: 'History'}, {id: 27, name: 'Horror'}, {id: 10402, name: 'Music'}, {id: 9648, name: 'Mystery'}, {id: 10749, name: 'Romance'}, {id: 878, name: 'Sci Fi'}, {id: 10770, name: 'TV Movie'}, {id: 53, name: 'Thriller'}, {id: 10752, name: 'War'}, {id: 37, name: 'Western'}];
let movieObjects = JSON.parse(localStorage.getItem('movieObjects'));
// let getInfoBtns = document.querySelectorAll('.movieCard');;


function loadInfo(index){
    console.log(movieObjects)
    console.log(index)
    console.log(movieObjects[index])
    console.log(movieObjects[index].id)
    localStorage.setItem("movieID", JSON.stringify(movieObjects[index].id))
    window.location.assign("info.html")
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
    //this first section extracts the genres and release year info from the fetched movie object
    let movieObj = movieObjects[arrInd];
    let genreIDs;
    let releaseYear;
    let genres = [];

    console.log("movieObj : ", movieObj.title, movieObj);

    function getGenres(){
        genreIDs = movieObj.genre_ids;
        genreIDNums = [];
        //matching genre IDs with their names and formatting them for use on card later
        for (let i=0; i<genreIDs.length; i++){ 
            let gIDNum = parseInt(genreIDs[i]);             
            genreIDNums.push(gIDNum);
            for (let j=0; j<genreCats.length; j++){
                if (genreIDNums[i] === genreCats[j].id){
                    let genreName = genreCats[j].name;
                    genres.push(genreName);
                }
            }
        }
        genres = genres.join(' / ');            
    }

    function getReleaseYear() {      
        let releaseDate = movieObj.release_date;
        releaseYear = releaseDate.split('-');
        releaseYear = releaseYear[0];
        console.log('releaseYear: ', releaseYear);
    }

    getGenres();
    getReleaseYear();
            
    //getting pics on cards//
    let posterID = movieObj.poster_path;
    let moviePoster = 'https://image.tmdb.org/t/p/original/' + posterID;
    let poster = document.createElement('img')
    poster.setAttribute('src', moviePoster);
    poster.setAttribute('id', arrInd);
    poster.setAttribute('style', 'width: 100px; height: 150px');

    //creating empty elements to put on card
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
    
    //creating card itself
    let movieCard = document.createElement('div');
    movieCard.setAttribute('class', 'movieCard');
    movieCard.setAttribute('id', arrInd); // added by henry
    movieCard.setAttribute('style', 'display:flex; align-items: center; border: 1px solid white; margin: 20px; padding: 10px')

    //filling empty elements and putting them on the card
    createH4.textContent = movieObj.title;
    let subText = 'released ' + releaseYear + ' | ' + genres + '';
    createH5.textContent = subText;
    infoP.textContent = movieObj.overview;
    movieBox.appendChild(createH4);
    movieBox.appendChild(createH5);
    movieBox.appendChild(infoP);   
    movieCard.appendChild(poster);
    movieCard.appendChild(movieBox);

    //putting the card in the list
    listCont.appendChild(movieCard);

};

window.onload = () =>{
    listCont.innerHTML = '';
    for (let i=0; i< movieObjects.length; i++){      //for each of the first 5 movies on the list
        makeListCard(i)
    } 
}