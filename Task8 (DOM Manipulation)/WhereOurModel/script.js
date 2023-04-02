// variables
var  openBtn = document.getElementById('open-btn')
var modalContainer = document.getElementById('modal-container')
var closeBtn = document.getElementById('close-btn')

// event listeners
openBtn.addEventListener('click', () => {
    modalContainer.style.display = 'block'
})
closeBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none'
})
window.addEventListener('click', (e) => {
    if (e.target === modalContainer){
        modalContainer.style.display = 'none'
    }
})