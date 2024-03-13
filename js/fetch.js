const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/";

let albumTest = 'album/75622562'

let randomAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/75622562"

import {generaClone} from "./template.js";


let templateHome = generaClone("#home-page");
let templateAlbum = generaClone('#album-page');
let templateSearch = generaClone('#search-page')

let pageContainer = document.querySelector('#center-page');

pageContainer.appendChild(templateHome)



//test della fetch
function fetcher(folder) {

    
   let artist = document.querySelector('.song-artist')
   let album = document.querySelector('.song-album')
   let cover = document.querySelector('.song-image')

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
        artist.innerText = artist.name
        album.innerText = album.title
        cover.src = album.cover_medium
      });
}

fetcher(albumTest)







// id, 
// title, 
// cover_medium artist->name 
// tracks{}->data[]->title

// canzone da riprodurre:
// tracks{}->data[]->preview