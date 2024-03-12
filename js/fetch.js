const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/";

let albumTest = 'album/75622562'

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

fetcher(albumTest);


// id, 
// title, 
// cover_medium artist->name 
// tracks{}->data[]->title

// canzone da riprodurre:
// tracks{}->data[]->preview