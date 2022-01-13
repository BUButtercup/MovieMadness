let listCont = document.querySelector('#list-container');
let genreCats = [{id: 28, name: 'Action'}, {id: 12, name: 'Adventure'}, {id: 16, name: 'Animation'}, {id: 35, name: 'Comedy'}, {id: 80, name: 'Crime'}, {id: 99, name: 'Documentary'}, {id: 18, name: 'Drama'}, {id: 10751, name: 'Family'}, {id: 14, name: 'Fantasy'}, {id: 36, name: 'History'}, {id: 27, name: 'Horror'}, {id: 10402, name: 'Music'}, {id: 9648, name: 'Mystery'}, {id: 10749, name: 'Romance'}, {id: 878, name: 'Sci Fi'}, {id: 10770, name: 'TV Movie'}, {id: 53, name: 'Thriller'}, {id: 10752, name: 'War'}, {id: 37, name: 'Western'}];
let movieObjects = JSON.parse(localStorage.getItem('movieObjects'));
// let getInfoBtns = document.querySelectorAll('.movieCard');;


// function goToInfo(){
//     console.log('hi');

    
// }

function makeListCard(arrInd){ //what is feeding into here is the object that is stored within the array index location
    let movieObj = arrInd       //the object fed into the fxn
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
        let createH5 = document.createElement('h5');
        let infoP = document.createElement('p');
        infoP.setAttribute('style', 'line-height: 1.25em')
        let movieBox = document.createElement('div');
        movieBox.setAttribute('class', 'movieBox');
        movieBox.setAttribute('style', 'margin-left:10px')
        
        let posterID = movieObj.poster_path;                                    //pulling and formatting pics
        let moviePoster = 'https://image.tmdb.org/t/p/original/' + posterID;
        let poster = document.createElement('img')
        poster.setAttribute('src', moviePoster);
        poster.setAttribute('style', 'width: 100px; height: 150px');

        let movieCard = document.createElement('div');
        movieCard.setAttribute('class', 'movieCard');
        movieCard.setAttribute('style', 'display:flex; align-items: center; border: 1px solid white; margin: 20px; padding: 10px')
        // movieCard.setAttribute('onclick', 'goToInfo(event)')
        // movieCard.onclick = (event) => {
        //     let currentDI = event.target.getAttribute('data-index')
        //     console.log(currentDI);
        // };

        createH4.textContent = movieObj.title;
        let subText = 'released ' + releaseYear + ' | ' + genres + '';
        createH5.textContent = subText;
        infoP.textContent = movieObj.overview;
        movieBox.appendChild(createH4);
        movieBox.appendChild(createH5);
        movieBox.appendChild(infoP);
        
        movieCard.appendChild(poster);
        movieCard.appendChild(movieBox);

        // movieCard.onclick = (event) => {
        //     let currentDI = event.target.getAttribute('data-index')
        //     console.log(currentDI);
        // };

        listCont.appendChild(movieCard);
        // let list = Array.from(listCont);
        // console.log(list.length);  
        // for (let i=0; i<list.length; i++){
        //     movieCard.setAttribute('data-index', [i]+1)
        // }
};

function clearStorage() {
    localStorage.clear();
}

window.onload = () =>{
    listCont.innerHTML = '';
    for (let i=0; i< movieObjects.length; i++){      //for each of the first 5 movies on the list
        makeListCard(movieObjects[i])
    } 
    let getInfoBtns = document.querySelectorAll('.movieCard');
    console.log('getbtns', getInfoBtns);
    // for (let i=0; i<getInfoBtns.length; i++){
    //     getInfoBtns[i].setAttribute('data-index', [i]);
        // getInfoBtns[i].setAttribute('id', [i]+1);
    // }
    // getInfoBtns.onclick = (event) => {
    //     let currentDI = event.target.getAttribute('data-index')
    //     console.log(currentDI);
    // };
}

// clearStorage();

//     console.log('getbtns', getInfoBtns);
//     getInfoBtns.forEach(item =>{
//         item.setAttribute('onclick', 'goToInfo())');
//             // for (let i=0; i < getInfoBtns.length; i++){
//             //     console.log('hi');
//             //     if (event.target.getAttribute('data-index') == movieObjects[i]){
//             //         localStorage.setItem('movieInfo', JSON.stringify(movieObjects[i]));
//             //     }
//             // }
//         })
//     });
// };



// function start(){
//     // listCont.innerHTML = '';
//     for (let i=0; i< movieObjects.length; i++){      //for each of the first 5 movies on the list
//     makeListCard(movieObjects[i])
//     }
// };

// start();