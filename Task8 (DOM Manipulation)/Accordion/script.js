// variables
var accordion = document.getElementsByClassName('content-container')

for(let i=0; i<accordion.length; i++){
    accordion[i].addEventListener('click', () => {
        console.log(accordion[i])
        accordion[i].classList.toggle('active')
    })

}