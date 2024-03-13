const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/";

let albumTest = 'album/51001312'

let homepageAlbums = [
  75623562,
  75223442,
  75233142,
  75233222,
  75233272,
  542665382,
  7824595,
  177888572,
  12207660,
  299814,
  61394162,
  226069,
  434095547,
  360638247,
  455130,
  14880659,
  51001312]

import {generaClone} from "./template.js";


let templateHome = generaClone("#home-page");
let templateAlbum = generaClone('#album-page');
let templateSearch = generaClone('#search-page')

let pageContainer = document.querySelector('#center-page');

pageContainer.appendChild(templateHome)

let albumContainer = document.querySelectorAll('.song-artist')
console.log(albumContainer[1].value);





//test della fetch
function fetcher(folder) {

   let artist = document.querySelector('.song-artist')
   let disco = document.querySelector('.song-album')
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
        artist.innerText = album.artist.name
        disco.innerText = album.title
        cover.src = album.cover_medium
      });
}

fetcher(albumTest)






// tennessee boy: 75623562
// reindeers: 75223442
// ludo harrison: 75923442
// tizia russa: 75923142
// norlaks: 75233142
// iColor: 75233222
// cosi brutti: 75233272
// bobbe malle: 542665382
// led zeppelin 2 7824595
// black sabbath 177888572
// pink Floyd: 12207660
// ramones 299814
// clash 61394162
// dire straits 226069
// eric clapton 434095547
// eric clapton 2 360638247
// jimi hendrix: 455130
// radiohead: 14880659
// master of puppets: 51001312



// id, 
// title, 
// cover_medium artist->name 
// tracks{}->data[]->title

// canzone da riprodurre:
// tracks{}->data[]->preview