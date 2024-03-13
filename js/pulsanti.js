
            //pulsante che mostra e nasconde la lista amici
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