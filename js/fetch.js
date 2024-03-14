import { generaTraccia } from "./template.js";
import { centerHome } from "./pulsanti.js";

const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";

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

centerHome()




let albumContainer = document.querySelectorAll('.home-album')
albumContainer.forEach((el, i) => {

  let artist = el.querySelector('.song-artist')
  let disco = el.querySelector('.song-album')
  let cover = el.querySelector('.song-image')


  fetcher(homepageAlbums[i], artist, disco, cover)

})



//test della fetch
function fetcher(folder, _artist, _disco, _cover) {

  fetch((apiUrl + folder),
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((album) => {
      _artist.innerText = album.artist.name
      _disco.innerText = album.title
      _cover.src = album.cover_medium

    });
}

function singleSong(album, index) {

  fetch((apiUrl + album),
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((albumSong) => {

      let advCard = document.querySelector('#adv-card')

      advCard.querySelector('.big-img').src = albumSong.cover_xl
      advCard.querySelector('.song-title').innerText = albumSong.tracks.data[index].title
      advCard.querySelector('.song-artist').innerText = albumSong.tracks.data[index].artist.name
      advCard.querySelector('.song-artist-adv').innerText += " " + albumSong.tracks.data[index].artist.name      
    });


}
singleSong(214959662, 0)



export function singleAlbum(album) {

  fetch((apiUrl + album),
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


      let bigImage = document.querySelector('.img-info');
      bigImage.src = albumSong.cover_xl;
      let avatarImage = document.querySelector('.avatar');
      avatarImage.src = albumSong.artist.picture_small;
      let albumTitle = document.querySelector('.album-album');
      albumTitle.innerText = albumSong.title;
      let artistName = document.querySelector('.artist-name-album');
      artistName.innerText = albumSong.artist.name;
      let albumYear = document.querySelector('.album-date');
      albumYear.innerText = albumSong.release_date.substring(0, 4);
      let trackNumber = document.querySelector('.track-number');
      trackNumber.innerText = albumSong.nb_tracks + " brani";
      let totalTime = document.querySelector('.total-time');
      totalTime.innerText = longTime(albumSong.duration);


      //popolazione tracklist
      albumSong.tracks.data.forEach((el, i) => {
        let templateTracks = generaTraccia();

        let titolo = templateTracks.querySelector('.title-track');
        titolo.innerText = el.title;
        let artista = templateTracks.querySelector('.artist-track');
        artista.innerText = el.artist.name;
        let durata = templateTracks.querySelector('.song-time');
        durata.innerText = goodTime(el.duration);
        let reproductions = templateTracks.querySelector('.reproductions');
        reproductions.innerText = el.rank;
        let trackNumber = templateTracks.querySelector('.number-track');
        trackNumber.innerText = i + 1;

        document.querySelector('#album-songs').appendChild(templateTracks);


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
  return (m < 10 ? "0" + m : m) + " minuti " + (s < 10 ? "0" + s : s) + " secondi";
}








let volumeControl = document.getElementById("vol");
let audioPlayer = document.getElementById("audioPlayer");

volumeControl.addEventListener("input", function () {
  let volumeValue = parseFloat(volumeControl.value) / 100;
  setVolume(volumeValue);
});

function setVolume(volume) {
  if (audioPlayer.readyState === 4) {
    audioPlayer.volume = volume;
  } else {
    console.log("Elemento audio non pronto.");
  }
}

fetch(apiUrl + 177888572, {
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
})
  .then((res) => res.json())
  .then((album) => {
    console.log(album);

    let song = 0;

    imgPlayer.src = album.tracks.data[song].album.cover;
    songTitlePlayer.innerText = album.tracks.data[song].title;
    artistPlayer.innerText = album.tracks.data[song].artist.name;
    audioPlayer.src = album.tracks.data[song].preview;

let titleMini = document.querySelector('#title-mini')
titleMini.innerText = album.tracks.data[song].title;


    parcialTime.innerText = '0:00';

    let valoreMassimo = 30;
    let tempoTrascorso = 0;
    let totalMinutes = 30;
    let timerInterval;

    function aggiornaTimer() {
      const minuti = Math.floor(tempoTrascorso / 60);
      const secondi = Math.round(tempoTrascorso % 60);

      const tempoFormattato = `${minuti}:${secondi.toString().padStart(2, '0')}`;

      parcialTime.textContent = tempoFormattato;

      if (tempoTrascorso >= valoreMassimo) {
        clearInterval(timerInterval);
      }

      tempoTrascorso++;

      let currentMinutes = tempoTrascorso;
      let sliderPosition = (currentMinutes / totalMinutes) * 6000;

      myinput.value = sliderPosition;

      if (tempoTrascorso === totalMinutes) {
        tempoTrascorso = 0;
        myinput.value = 0;
        document.getElementById('nextsong').click();
       // audioPlayer.load();
       // audioPlayer.play();
      }
    }

    let play = document.getElementById('playPlayer')

    play.addEventListener('click', function () {
      loadSong(song);
      audioPlayer.play();
      document.getElementById('playPlayer').classList.add('d-none');
      document.getElementById('pausePlayer').classList.remove('d-none');
      timerInterval = setInterval(aggiornaTimer, 1000);
    });

    let pause = document.getElementById('pausePlayer')

    pause.addEventListener('click', function () {
      audioPlayer.pause();
      document.getElementById('pausePlayer').classList.add('d-none');
      document.getElementById('playPlayer').classList.remove('d-none');
      clearInterval(timerInterval);
    });

    document.getElementById('lastsong').addEventListener('click', function () {
      song--;
      if (song < 0) song = album.tracks.data.length - 1;
      loadSong(song);
    });

    document.getElementById('nextsong').addEventListener('click', function () {
      song++;
      if (song >= album.tracks.data.length) song = 0;
      loadSong(song);
    });


    document.getElementById('myinput').addEventListener('change', function () {

      let newTime = Math.round((this.value / 6000) * totalMinutes);



      tempoTrascorso = newTime;


      audioPlayer.currentTime = newTime;


      aggiornaTimer();
    });

    function loadSong(songIndex) {
      audioPlayer.src = album.tracks.data[songIndex].preview;
      songTitlePlayer.innerText = album.tracks.data[songIndex].title;
      artistPlayer.innerText = album.tracks.data[songIndex].artist.name;
      let titleMini = document.querySelector('#title-mini')
titleMini.innerText = album.tracks.data[song].title;

      audioPlayer.load();
      tempoTrascorso = 0;
      myinput.value = 0;
      aggiornaTimer();
      setTimeout(function () {
        audioPlayer.play();
      }, 100);
    }

    let playPiccolo = document.querySelector('#play-piccolo')
    let pausePiccolo = document.getElementById('pause-piccolo')
    playPiccolo.addEventListener('click', function () {
      
      playPiccolo.classList.add('d-none');
      pausePiccolo.classList.remove('d-none');
      timerInterval = setInterval(aggiornaTimer, 1000);
    });
    pausePiccolo.addEventListener('click', function () {
      audioPlayer.pause();
      pausePiccolo.classList.add('d-none');
      playPiccolo.classList.remove('d-none');
      clearInterval(timerInterval);
    })



  })



