import {generaClone} from "./template.js";
import { singleAlbum } from "./fetch.js";
import { singleArtist } from "./fetch.js";
import { search } from "./fetch.js";

function homePage(){
  return new Promise ((resolve) => {
    let templateHome = generaClone("#home-page");
    let templateAlbum = generaClone('#album-page');
    let templateArtist = generaClone('#artist-page')
    let templateSearch = generaClone('#search-page')
    let pageContainer = document.querySelector('#center-page');
    pageContainer.appendChild(templateHome)
    let friendsToggle = document.getElementById('friendlist-toggle');
            let sectionRight = document.getElementById('section-right');
            let sectionCenter = document.getElementById('central-container');

            friendsToggle.addEventListener('click',function(){

                    sectionRight.classList.remove('d-none')
                    sectionCenter.classList.remove('col-lg-10')
                    sectionCenter.classList.add('col-lg-8')
            })

            let closeFriends = document.querySelector('.close-friends')
            closeFriends.addEventListener('click', function(){
                sectionRight.classList.add('d-none')
                    sectionCenter.classList.remove('col-lg-8')
                    sectionCenter.classList.add('col-lg-10')
            })
                let searchPage1 = document.querySelector('#search-btn-top')
                searchPage1.addEventListener('click', function(){
                  pageContainer.innerHTML = ''
                  pageContainer.appendChild(templateSearch)
                  searchPageBtn()
                })

                let albumPageBtn = document.querySelector('#album-toggle')
                albumPageBtn.addEventListener('click', function(){
                  pageContainer.innerHTML = '';
                  pageContainer.appendChild(templateAlbum)
                  singleAlbum(214959662)
                })

                let artistPageBtn = document.querySelector('#artist-toggle')
                artistPageBtn.addEventListener('click', function(){
                  pageContainer.innerHTML = '';
                  pageContainer.appendChild(templateArtist)
                  singleArtist(6160)
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
    resolve('resolved!');
  });
}

export async function centerHome(){
  try {
  const result = await homePage();
  console.log(result);
  } catch (error){
    console.error("Errore durante l'aggiunta della homePage:", error);
  }
}

function searchPageBtn() {
  
  let searchBtn = document.querySelector('#cerca-icon')
  
  console.log(searchBtn);
  searchBtn.addEventListener('click', function(e){
    e.preventDefault();
    alert('ciao')
    let input = document.querySelector('#input-search')
    search(input.value)
    
  })
}