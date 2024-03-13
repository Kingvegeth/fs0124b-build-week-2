
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
