const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/";

let albumTest = 'album/75622562'

import {generaClone} from "./template.js";


let templateHome = generaClone("#home-page");
let templateAlbum = generaClone('#album-page');
let templateSearch = generaClone('#search-page')

let pageContainer = document.querySelector('#center-page');

pageContainer.appendChild(templateHome)


let searchPage1 = document.querySelector('#search-btn-top')
searchPage1.addEventListener('click', function(){
  pageContainer.innerHTML = ''
  pageContainer.appendChild(templateSearch)
})

let albumPageBtn = document.querySelector('#album-toggle')
albumPageBtn.addEventListener('click', function(){
  pageContainer.innerHTML = '';
  pageContainer.appendChild(templateAlbum)
})

let homePageBtn1 = document.querySelector('#homepage-bnt-top')
homePageBtn1.addEventListener('click', function(){
  pageContainer.innerHTML = '';
  pageContainer.appendChild(templateHome) 
})
let homePageBtn2 = document.querySelector('#homepage-bnt-bottom')
homePageBtn2.addEventListener('click', function(){
  pageContainer.innerHTML = '';
  pageContainer.appendChild(templateHome)
})


//test della fetch
function fetcher(folder) {

    divFinto = document.querySelector('#div-finto')
    titoloFinto = document.querySelector('.nome-finto')
    albumFinto = document.querySelector('.album-finto')
    tracciaFinta = document.querySelector('.traccia-finta')
    imgFinta = document.querySelector('.cover-finta')

  fetch((apiUrl + folder),
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((album) => {
        console.log(album);
        titoloFinto.innerText = album.title
        tracciaFinta.innerText = album.tracks.data[0].title
        imgFinta.src = album.cover_medium
      });
}




// id, 
// title, 
// cover_medium artist->name 
// tracks{}->data[]->title

// canzone da riprodurre:
// tracks{}->data[]->preview