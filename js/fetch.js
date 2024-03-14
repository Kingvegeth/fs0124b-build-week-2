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
  albumContainer.forEach((el,i) =>{
  
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

function singleSong (album, index){

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
singleSong(214959662,0)



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
      albumYear.innerText = albumSong.release_date.substring(0,4);
      let trackNumber = document.querySelector('.track-number');
      trackNumber.innerText = albumSong.nb_tracks + " brani";
      let totalTime = document.querySelector('.total-time');
      totalTime.innerText = longTime(albumSong.duration);

      
      //popolazione tracklist
      albumSong.tracks.data.forEach((el,i) => {
        let templateTracks = generaTraccia();

        let titolo = templateTracks.querySelector('.title-track');
        titolo.innerText = el.title;
        let artista = templateTracks.querySelector('.artist-track');
        artista.innerText = el.artist.name;
        let durata = templateTracks.querySelector('.song-time');
        durata.innerText = goodTime(el.duration) ;
        let reproductions = templateTracks.querySelector('.reproductions');
        reproductions.innerText = el.rank;
        let trackNumber = templateTracks.querySelector('.number-track');
        trackNumber.innerText = i+1;

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



https://api.deezer.com/album/75623562/tracks

/*
fetch((apiUrl + 75623562 ),
{
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
})
.then((res) => res.json())
.then((album) => {

  console.log(album)

  imgPlayerMini = document.getElementById('imgPlayerMini')
  titlePlayerMini = document.getElementById('titlePlayerMini')


  imgPlayer = document.getElementById('imgPlayer')
  songTitlePlayer = document.getElementById('songTitlePlayer')
  artistPlayer = document.getElementById('artistPlayer')

  parcialTime = document.getElementById('parcialTime')
  totalTime = document.getElementById('totalTime')




});




console.log(singleSong(214959662,0))

*/

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

 

 
 


fetch((apiUrl + 177888572),
{
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
})
.then((res) => res.json())
  .then((album) => {
    
    console.log(album)

      setTimeout(() => {
        imgPlayer = document.getElementById('imgPlayer')
        songTitlePlayer = document.getElementById('songTitlePlayer')
        artistPlayer = document.getElementById('artistPlayer')
  
        parcialTime = document.getElementById('parcialTime')
        totalTime = document.getElementById('totalTime')
  
        audioPlayer = document.getElementById('audioPlayer')
        
  
        
        btnlastsong = document.getElementById('lastsong')
        btnnextsong = document.getElementById('nextsong')

        myInput = document.getElementById('myinput')
        myinputValue = myinput.value



      }, 2000);


      let song = 0

    

     

      
/*
      let x = document.getElementById('myinput')

      x.addEventListener('input', function() {

        let y  = durationSong

        let value = x.value;
        console.log('Valore del range:', value);
      });
*/





/*
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

*/
      imgPlayer.src = album.tracks.data[song].album.cover
      songTitlePlayer.innerText = album.tracks.data[song].title
      artistPlayer.innerText = album.tracks.data[song].artist.name
      audioPlayer.src = album.tracks.data[song].preview;

      let durationSong = ((album.tracks.data[song].duration))
      totalTime.innerText = Math.floor(durationSong.toFixed(2))


      let parcialSong = ((album.tracks.data[song].duration))
      parcialTime.innerText = Math.floor(parcialSong.toFixed(2))

     
      function barmove () {

        durationSong


      }
      
    
      document.getElementById('playPlayer').addEventListener('click',function(){
    
        audioPlayer.play()
    
        document.getElementById('playPlayer').classList.add('d-none')
        document.getElementById('pausePlayer').classList.remove('d-none')
    
    
      })
    
      document.getElementById('pausePlayer').addEventListener('click',function(){
    
        audioPlayer.pause();
    
        document.getElementById('pausePlayer').classList.add('d-none')
        document.getElementById('playPlayer').classList.remove('d-none')
    
      })


      document.getElementById('lastsong').addEventListener('click',function(){
        
        song --

        audioPlayer.src = album.tracks.data[song].preview;

        songTitlePlayer.innerText = album.tracks.data[song].title

        let dutationSong = album.tracks.data[song].duration

        totalTime.innerText = Math.floor(dutationSong.toFixed(2))


        let parcialSong = ((album.tracks.data[song].duration))
        parcialTime.innerText = Math.floor(parcialSong.toFixed(2))


        document.getElementById('audioPlayer').load()

        audioPlayer.play()
        
      })

      document.getElementById('nextsong').addEventListener('click',function(){
        
        song++

        audioPlayer.src = album.tracks.data[song].preview;

        songTitlePlayer.innerText = album.tracks.data[song].title

        let dutationSong = album.tracks.data[song].duration

        totalTime.innerText = Math.floor(dutationSong.toFixed(2))


        let parcialSong = ((album.tracks.data[song].duration))
        parcialTime.innerText = Math.floor(parcialSong.toFixed(2))


        document.getElementById('audioPlayer').load()

        audioPlayer.play()

      })


    

    });

  