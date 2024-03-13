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