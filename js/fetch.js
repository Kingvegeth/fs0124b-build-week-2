import { generaTraccia } from "./template.js";
import { generaTracciaArtista } from "./template.js";
import { generaTracciaSearch } from "./template.js";
import { centerHome } from "./pulsanti.js";
const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const apiUrlArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const apiUrlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const apiUrlSong = "https://striveschool-api.herokuapp.com/api/deezer/track/"


centerHome();

let homepageAlbums = [
  51001312,311000727, 10975090, 447101, 13475611, 1208939, 542665382, 7824595,
  177888572, 12207660, 299814, 61394162, 226069, 434095547, 360638247, 455130,
  14880659,9410086, 68614721, 9045853, 1442650, 82107, 81763, 1440802, 344440,
  7090257, 1421957, 8910319, 40203611, 7075121, 79118, 246245, 6227255
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
      let bigImg = advCard.querySelector(".big-img")
      bigImg.src = albumSong.cover_xl;
      bigImg.id = albumSong.id
      bigImg.addEventListener('click',function(){
        albumPlay(bigImg.id)
      })

      advCard.querySelector(".song-title").innerText =
        albumSong.tracks.data[index].title;
      advCard.querySelector(".song-artist").innerText =
        albumSong.tracks.data[index].artist.name;
      advCard.querySelector(".song-artist-adv").innerText +=
        " " + albumSong.tracks.data[index].artist.name;
      let playRick = document.querySelector('.adv-play')
      playRick.id = albumSong.tracks.data[index].id
      playRick.addEventListener('click', function(){
        songPlay(playRick.id)
      })
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
      artistName.id = albumSong.contributors[0].id
      console.log(artistName.id)
      artistName.innerText = albumSong.artist.name;
      let albumYear = document.querySelector(".album-date");
      albumYear.innerText = albumSong.release_date.substring(0, 4);
      let trackNumber = document.querySelector(".track-number");
      trackNumber.innerText = albumSong.nb_tracks + " brani";
      let totalTime = document.querySelector(".total-time");
      totalTime.innerText = longTime(albumSong.duration);

      let playBtn = document.querySelector('.bi-play-fill')
      playBtn.id = albumSong.id
      playBtn.addEventListener('click', function(){
        albumPlay(playBtn.id)
      })
      
      document.querySelector('#album-songs').innerHTML = ''
      //popolazione tracklist
      albumSong.tracks.data.forEach((el, i) => {

        let templateTracks = generaTraccia();

        let titolo = templateTracks.querySelector(".title-track");
        titolo.innerText = el.title;

        let artista = templateTracks.querySelector(".artist-track");
        artista.innerText = el.artist.name;
        artista.id = el.artist.id
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
      bgImage.style.backgroundImage =  `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url(${albumSong.data[0].contributors[0].picture_xl})`
      document.querySelector('#artist-songs').innerHTML = ''
      
      
      let artistPlaybtnBottom = document.querySelector('.artist-play-btn-bottom')
      artistPlaybtnBottom.id = albumSong.data[0].artist.id
      artistPlaybtnBottom.addEventListener('click', function(){
        listPlay(artistPlaybtnBottom.id)
        autoPlay()
      })

      let artistPlaybtnTop = document.querySelector('.artist-play-btn-top')
      artistPlaybtnTop.id = albumSong.data[0].artist.id
      artistPlaybtnTop.addEventListener('click', function(){
        listPlay(artistPlaybtnTop.id)
        autoPlay()
      })
      
      //popolazione brani popolari
      albumSong.data.forEach((el,i) => {
        let templateArtistTracks = generaTracciaArtista();
        let number = templateArtistTracks.querySelector('.number-artist')
        number.innerText = i + 1

        let img = templateArtistTracks.querySelector('.img-artist')
        img.src = el.album.cover_small
        let titolo = templateArtistTracks.querySelector('.song-title');
        titolo.innerText = el.title_short;
        let views = templateArtistTracks.querySelector('.song-view');
        views.innerText = el.rank
        let durata = templateArtistTracks.querySelector('.song-minutes')
        durata.innerText = goodTime(el.duration)

        document.querySelector('#artist-songs').appendChild(templateArtistTracks);
      });


    }).catch((error) => new Error(error));
  }


  export function search(artist) {

    fetch((apiUrlSearch + artist),
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
        console.log(artist);
        let resultsTitle = document.querySelector('.search-result-title')
        console.log(resultsTitle);
        resultsTitle.innerText = "Risultati per " + (artist.charAt(0).toUpperCase() + artist.slice(1));
        //popolazione brani popolari
        document.querySelector('#search-container').innerHTML=''
        for (let i = 0; i < 10; i++) {
          
          let templateSearchTracks = generaTracciaSearch();

          let canzone = templateSearchTracks.querySelector('.track-search')
          canzone.id = albumSong.data[i].id
          canzone.addEventListener('click', function(e){
            e.preventDefault()
            console.log(canzone.id);
            songPlay(canzone.id)
          })
          let titolo = templateSearchTracks.querySelector('.titolo-raccolta')
          titolo.innerText = albumSong.data[i].title
          console.log(titolo);
          let img = templateSearchTracks.querySelector('.img-search')
          img.src = albumSong.data[i].album.cover_small
          let duration = templateSearchTracks.querySelector('.duration-search')
          duration.innerText = goodTime(albumSong.data[i].duration)

          
          document.querySelector('#search-container').appendChild(templateSearchTracks)

        }


      })

      .catch((error) => new Error(error));
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

//function autoPlay(){
//  let audioPlayer = document.querySelector('#audioPlayer')
//  audioPlayer.load()
//  document.getElementById('playPlayer').classList.add('d-none');
//  document.getElementById('pausePlayer').classList.remove('d-none');
//  audioPlayer.play()
//}


export function songPlay(song){


fetch(apiUrlSong + song, {
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
})
  .then((res) => res.json())
  .then((traccia) => {
    

    let song = 0;

    let imgPlayer = document.querySelector('#imgPlayer');
    imgPlayer.src = traccia.album.cover;
    let songTitlePlayer = document.querySelector('#songTitlePlayer');
    songTitlePlayer.innerText = traccia.title;
    let artistPlayer = document.querySelector('#artistPlayer');
    artistPlayer.innerText = traccia.artist.name;
    let audioPlayer = document.querySelector('#audioPlayer')
    audioPlayer.src = traccia.preview;

    let titleMini = document.querySelector('#title-mini')
    titleMini.innerText = traccia.title;
    
    let parcialTime = document.querySelector('#parcialTime')
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

    function firstPlay(){
        
      clearInterval(timerInterval);
      audioPlayer.play();
      document.getElementById('playPlayer').classList.add('d-none');
      document.getElementById('pausePlayer').classList.remove('d-none');
      timerInterval = setInterval(aggiornaTimer, 1000);
      //tempoTrascorso = 0
      
    }
    firstPlay()

    let play = document.getElementById('playPlayer')

    play.addEventListener('click', function () {
      firstPlay()
    });

    let pause = document.getElementById('pausePlayer')

    pause.addEventListener('click', function () {
      audioPlayer.pause();
      document.getElementById('pausePlayer').classList.add('d-none');
      document.getElementById('playPlayer').classList.remove('d-none');
      clearInterval(timerInterval);
    });

    //torna alla traccia precedente
    document.getElementById('lastsong').addEventListener('click', function () {
      song--;
      if (song < 0) song = album.tracks.data.length - 1;
      loadSong(song);
    });

    //passa alla traccia successiva
    document.getElementById('nextsong').addEventListener('click', function () {
      song++;
      if (song >= album.tracks.data.length) song = 0;
      loadSong(song);
    });

    //aggiorna tempo canzone al cambiamento della barra
    document.getElementById('myinput').addEventListener('change', function () {

      let newTime = Math.round((this.value / 6000) * totalMinutes);
      tempoTrascorso = newTime;
      audioPlayer.currentTime = newTime;
      aggiornaTimer();
    });

    //carica nuova canzone
    function loadSong(songIndex) {
      audioPlayer.src = traccia.preview;
      songTitlePlayer.innerText = traccia.title;
      artistPlayer.innerText = traccia.artist.name;
      let titleMini = document.querySelector('#title-mini')
titleMini.innerText = traccia.title;

      audioPlayer.load();
      tempoTrascorso = 0;
      myinput.value = 0;
      aggiornaTimer();


        setTimeout(function () {
          audioPlayer.play();
        }, 100);

    }

    //player mobile
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

}

export function albumPlay(disco, song=0){


  fetch(apiUrl + disco, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((album) => {
      console.log(album);
  
      
  
      let imgPlayer = document.querySelector('#imgPlayer');
      imgPlayer.src = album.tracks.data[song].album.cover;
      let songTitlePlayer = document.querySelector('#songTitlePlayer');
      songTitlePlayer.innerText = album.tracks.data[song].title;
      let artistPlayer = document.querySelector('#artistPlayer');
      artistPlayer.innerText = album.tracks.data[song].artist.name;
      let audioPlayer = document.querySelector('#audioPlayer')
      audioPlayer.src = album.tracks.data[song].preview;
  
      let titleMini = document.querySelector('#title-mini')
      titleMini.innerText = album.tracks.data[song].title;
      
      let parcialTime = document.querySelector('#parcialTime')
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
  
      function firstPlay(){
        
        clearInterval(timerInterval);
        audioPlayer.play();
        document.getElementById('playPlayer').classList.add('d-none');
        document.getElementById('pausePlayer').classList.remove('d-none');
        timerInterval = setInterval(aggiornaTimer, 1000);
        //tempoTrascorso = 0
        
      }
      firstPlay()

      let play = document.getElementById('playPlayer')
  
      play.addEventListener('click', function () {
        firstPlay()
      });
      let pause = document.getElementById('pausePlayer')
  
      pause.addEventListener('click', function () {
        audioPlayer.pause();
        document.getElementById('pausePlayer').classList.add('d-none');
        document.getElementById('playPlayer').classList.remove('d-none');
        clearInterval(timerInterval);
      });
  
      //torna alla traccia precedente
      document.getElementById('lastsong').addEventListener('click', function () {
        song--;
        if (song < 0) song = album.tracks.data.length - 1;
        loadSong(song);
      });
  
      //passa alla traccia successiva
      document.getElementById('nextsong').addEventListener('click', function () {
        song++;
        if (song >= album.tracks.data.length) song = 0;
        loadSong(song);
      });
  
      //aggiorna tempo canzone al cambiamento della barra
      document.getElementById('myinput').addEventListener('change', function () {
  
        let newTime = Math.round((this.value / 6000) * totalMinutes);
        tempoTrascorso = newTime;
        audioPlayer.currentTime = newTime;
        aggiornaTimer();
      });
  
      //carica nuova canzone
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
  
      //player mobile
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
  
}

export function listPlay(list, song=0){


  fetch(apiUrlArtist + list + songsNumber, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((album) => {
      console.log(album);
  
      
  
      let imgPlayer = document.querySelector('#imgPlayer');
      imgPlayer.src = album.data[song].album.cover;
      let songTitlePlayer = document.querySelector('#songTitlePlayer');
      songTitlePlayer.innerText = album.data[song].title;
      let artistPlayer = document.querySelector('#artistPlayer');
      artistPlayer.innerText = album.data[song].artist.name;
      let audioPlayer = document.querySelector('#audioPlayer')
      audioPlayer.src = album.data[song].preview;
  
      let titleMini = document.querySelector('#title-mini')
      titleMini.innerText = album.data[song].title;
      
      let parcialTime = document.querySelector('#parcialTime')
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
  
      function firstPlay(){
        
        clearInterval(timerInterval);
        audioPlayer.play();
        document.getElementById('playPlayer').classList.add('d-none');
        document.getElementById('pausePlayer').classList.remove('d-none');
        timerInterval = setInterval(aggiornaTimer, 1000);
        //tempoTrascorso = 0
        
      }
      firstPlay()

      let play = document.getElementById('playPlayer')
  
      play.addEventListener('click', function () {
        firstPlay()
      });
  
      let pause = document.getElementById('pausePlayer')
  
      pause.addEventListener('click', function () {
        audioPlayer.pause();
        document.getElementById('pausePlayer').classList.add('d-none');
        document.getElementById('playPlayer').classList.remove('d-none');
        clearInterval(timerInterval);
      });
  
      //torna alla traccia precedente
      document.getElementById('lastsong').addEventListener('click', function () {
        song--;
        if (song < 0) song = album.data.length - 1;
        loadSong(song);
      });
  
      //passa alla traccia successiva
      document.getElementById('nextsong').addEventListener('click', function () {
        song++;
        if (song >= album.data.length) song = 0;
        loadSong(song);
      });
  
      //aggiorna tempo canzone al cambiamento della barra
      document.getElementById('myinput').addEventListener('change', function () {
  
        let newTime = Math.round((this.value / 6000) * totalMinutes);
        tempoTrascorso = newTime;
        audioPlayer.currentTime = newTime;
        aggiornaTimer();
      });
  
      //carica nuova canzone
      function loadSong(songIndex) {
        imgPlayer.src = album.data[song].album.cover;
        audioPlayer.src = album.data[songIndex].preview;
        songTitlePlayer.innerText = album.data[songIndex].title;
        artistPlayer.innerText = album.data[songIndex].artist.name;
        let titleMini = document.querySelector('#title-mini')
  titleMini.innerText = album.data[song].title;
  
        
        audioPlayer.load();
        tempoTrascorso = 0;
        myinput.value = 0;
        aggiornaTimer();
        
  
  
          setTimeout(function () {
            audioPlayer.play();
          }, 100);
  
      }
  
      //player mobile
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
  
}