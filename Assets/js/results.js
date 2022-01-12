let listCont = document.querySelector('#list-container');

function makeListCard(arrInd){ //what is feeding into here is the object that is stored within the array index location
    let movieObj = arrInd       //the object fed into the fxn
    let genreArr;               //holder for the genre names that have been assigned to the movie
    let releaseYear;

    console.log("movieObj : ", movieObj.title, movieObj);

    function getGenres(){
        genreArr = movieObj.genre_ids; 
    
    // for (let i=0; i < movieArr.length; i++){            
    //   //get the genre id
    //     let genreCont = [];
    //     for (let i=0; i<genreArr.length; i++){
    //         let genreName = genreArr[i].name;
    //         genreCont.push(genreName);
    //     }
        genreArr = genreArr.join(' / ');            //put it in the genreCont as a joined string
        console.log('genreArr: ', genreArr);
    }

  

    function getReleaseYear() {                     //to get release year
        let releaseDate = movieObj.release_date;
        releaseYear = releaseDate.split('-');
        releaseYear = parseInt(releaseYear[0]); //parse out release year as a number
        console.log('releaseYear: ', releaseYear);
    }
        getGenres();
        getReleaseYear();
            
        //vars to create elements
        let createH4 = document.createElement('h4');
        let createH5 = document.createElement('h5');
        let infoP = document.createElement('p');
        let movieBox = document.createElement('div');

        
        createH4.textContent = movieObj.title;
        createH5.textContent = 'released ' + releaseYear + ' | ' + genreArr + '';
        infoP.textContent = movieObj.overview;
        movieBox.setAttribute('class', 'movieBox');
        
        movieBox.appendChild(createH4);
        movieBox.appendChild(createH5);
        movieBox.appendChild(infoP);
        listCont.appendChild(movieBox);
        
};

window.onload = () =>{
    let movieObjects = JSON.parse(localStorage.getItem('movieObjects'));
    listCont.innerHTML = '';
    for (let i=0; i< movieObjects.length; i++){      //for each of the first 5 movies on the list
    makeListCard(movieObjects[i])
    }
};