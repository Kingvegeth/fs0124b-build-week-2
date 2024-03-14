import { generaTraccia } from "./template.js";
import { generaConsigliati } from "./template.js";
import { centerHome } from "./pulsanti.js";
import { generaTracciaArtista } from "./template.js";
const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const apiUrlArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
let albumTest = "album/51001312";
centerHome();

let homepageAlbums = [
  51001312,75623562, 75223442, 75233142, 75233222, 75233272, 542665382, 7824595,
  177888572, 12207660, 299814, 61394162, 226069, 434095547, 360638247, 455130,
  14880659
];



let albumContainer = document.querySelectorAll(".home-album");
albumContainer.forEach((el, i) => {
  let artist = el.querySelector(".song-artist");
  let disco = el.querySelector(".song-album");
  let cover = el.querySelector(".song-image");
  fetcher(homepageAlbums[i], artist, disco, cover);
});

//test della fetch
export function fetcher(folder, _artist, _disco, _cover) {
  fetch(apiUrl + folder, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((album) => {
      _artist.innerText = album.artist.name;
      _artist.id = album.artist.id
      _disco.innerText = album.title;
      _disco.id = album.id
      _cover.src = album.cover_medium;
      

    });
}


function singleSong(album, index) {
  fetch(apiUrl + album, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((albumSong) => {
      let advCard = document.querySelector("#adv-card");

      advCard.querySelector(".big-img").src = albumSong.cover_xl;
      advCard.querySelector(".song-title").innerText =
        albumSong.tracks.data[index].title;
      advCard.querySelector(".song-artist").innerText =
        albumSong.tracks.data[index].artist.name;
      advCard.querySelector(".song-artist-adv").innerText +=
        " " + albumSong.tracks.data[index].artist.name;
    });
}
singleSong(214959662, 0);

export function singleAlbum(album) {
  fetch(apiUrl + album, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => {
      console.log(res);

      if (!res.ok) throw new Error("Errore");
      return res.json();
    })
    .then((albumSong) => {
      //popolazione header

      let bigImage = document.querySelector(".img-info");
      bigImage.src = albumSong.cover_xl;
      let avatarImage = document.querySelector(".avatar");
      avatarImage.src = albumSong.artist.picture_small;
      let albumTitle = document.querySelector(".album-album");
      albumTitle.innerText = albumSong.title;
      let artistName = document.querySelector(".artist-name-album");
      artistName.innerText = albumSong.artist.name;
      let albumYear = document.querySelector(".album-date");
      albumYear.innerText = albumSong.release_date.substring(0, 4);
      let trackNumber = document.querySelector(".track-number");
      trackNumber.innerText = albumSong.nb_tracks + " brani";
      let totalTime = document.querySelector(".total-time");
      totalTime.innerText = longTime(albumSong.duration);

      //popolazione tracklist
      albumSong.tracks.data.forEach((el, i) => {
        let templateTracks = generaTraccia();

        let titolo = templateTracks.querySelector(".title-track");
        titolo.innerText = el.title;
        let artista = templateTracks.querySelector(".artist-track");
        artista.innerText = el.artist.name;
        let durata = templateTracks.querySelector(".song-time");
        durata.innerText = goodTime(el.duration);
        let reproductions = templateTracks.querySelector(".reproductions");
        reproductions.innerText = el.rank;
        let trackNumber = templateTracks.querySelector(".number-track");
        trackNumber.innerText = i + 1;

        document.querySelector("#album-songs").appendChild(templateTracks);
      });
    })
    .catch((error) => new Error(error));
}


let songsNumber = '/top?limit=50'

export function singleArtist(artist) {

  fetch((apiUrlArtist + artist + songsNumber),
  {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
  .then((res) => {

    console.log(res);

            if (!res.ok) throw new Error("Errore");
    return res.json();
  })
    .then((albumSong) => {
      //popolazione header
      
      let artistName = document.querySelector('.artist-name');
      artistName.innerText = albumSong.data[1].artist.name
      let ascoltatori = document.querySelector('.listeners');
      ascoltatori.innerText = "Ascoltatori mensili " + albumSong.data[1].rank
      //let avatarArtista = document.querySelector('.artist-avatar');
      //avatarArtista.src = albumSong.data[1].artist.picture_small
      let artistPicture = document.querySelector('.artist-avatar')
      artistPicture.src = albumSong.data[0].contributors[0].picture_medium
      let bgImage = document.querySelector('.artist-header')
      bgImage.style.backgroundImage = `url(${albumSong.data[0].contributors[0].picture_xl})`
      
      
      
      //popolazione brani popolari
      
      console.log(albumSong);
      albumSong.data.forEach(el => {
        let templateArtistTracks = generaTracciaArtista();
        
        console.log(el);
        console.log(templateArtistTracks)
        let img = templateArtistTracks.querySelector('.img-artist')
        img.src = el.album.cover_small
        let titolo = templateArtistTracks.querySelector('.song-title');
        titolo.innerText = el.title_short;
        console.log(el.title);
        let views = templateArtistTracks.querySelector('.song-view');
        views.innerText = el.rank
        let durata = templateArtistTracks.querySelector('.song-minutes')
        durata.innerText = goodTime(el.duration)

        document.querySelector('#artist-songs').appendChild(templateArtistTracks);
      });


    }).catch((error) => new Error(error));
  }

function goodTime(e) {
  let m = 0;
  let s = 0;
  for (let i = 0; i < e; i++) {
    s++;
    if (s >= 60) {
      m++;
      s = 0;
    }
  }
  return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}

function longTime(e) {
  let m = 0;
  let s = 0;
  for (let i = 0; i < e; i++) {
    s++;
    if (s >= 60) {
      m++;
      s = 0;
    }
  }
  return (
    (m < 10 ? "0" + m : m) + " minuti " + (s < 10 ? "0" + s : s) + " secondi"
  );
}

//albumSong.tracks.data[index].album.cover_big

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
// rick astley: 214959662

// id,
// title,
// cover_medium artist->name
// tracks{}->data[]->title

// canzone da riprodurre:
// tracks{}->data[]->preview
