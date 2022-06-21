import * as User from "../models/userModel.js"
/* current User */
let currentUser = JSON.parse(localStorage.getItem('currentUser'))
/* show name */
function reset() {
    document.querySelector('.imgPerfil').src = currentUser.img
    document.getElementById('Name').placeholder = currentUser.first_name;
    document.getElementById('lastName').placeholder = currentUser.last_name
    document.getElementById('email').placeholder = currentUser.email;
    document.querySelectorAll('.pass').forEach(input => {
        input.value = ""
    })
    if(showPassword.checked == true) {
        showPassword.checked = false
        inputs.forEach(input => {
            input.type = "password"
        })
    }
    document.querySelector('.divHide').innerHTML = ""
    document.querySelector('.inform').innerHTML = ""
}

/* password */
let showPassword = document.querySelector('.showPassword')
let inputs = document.querySelectorAll('.pass')
showPassword.addEventListener('click', () => {
    if(showPassword.checked == true) {
        inputs.forEach(input => {
            input.type = "text"
        })
    } else {
        inputs.forEach(input => {
            input.type = "password"
        })
    }
})
reset()/* apenas inicia aqui por causa do let showPassword e dos inputs */

/* change img */
let myInput = document.querySelector('.imgPerfil')
let valor = 0
myInput.addEventListener('click', (event) => {
    event.preventDefault()
    let divEscondida = document.querySelector('.divHide')
    if(valor == 0){
        divEscondida.innerHTML = ''
        let imgName = ['../media/userIcon/user1.jpg','../media/userIcon/user2.png','../media/userIcon/user3.png', '../media/userIcon/user4.png']
        imgName.forEach(img => {
            divEscondida.innerHTML += `<img class='responsive imgOP' src="${img}">`
        })
        valor = 1
    } else {
        divEscondida.innerHTML = ""
        valor = 0
    }
    addToPerfilImg()
})

function addToPerfilImg() {
    let imgPerf = document.querySelectorAll('.imgOP')
    imgPerf.forEach(image => {
        image.addEventListener('click', (event) =>{
            event.preventDefault();
            document.querySelector('.imgPerfil').src = image.src
        })
    })
}

/* reset */
document.querySelector('#resetBtn').addEventListener('click', () => {reset()})

/* change items */
document.querySelector('#saveBtn').addEventListener('click', (event) => {
    event.preventDefault();
    let password = document.querySelector('#new').value;
    let confirm_password = document.querySelector('#confirm').value;

    if(currentUser.password == password && password != null){
        document.querySelector('.inform').innerHTML = `<div class="alert alert-danger" role="alert">Your password is the same as before! Try again.</div>`
    } else if(password == confirm_password && password != "") {
        /* change password */
        currentUser.password = password
    } else {
        document.querySelector('.inform').innerHTML = `<div class="alert alert-danger" role="alert">Your passwords don't match! Try again.</div>`
    }
    document.querySelector('.inform').innerHTML = `<div class="alert alert-success" role="alert">Changes heve been made!</div>`
    /* update imagem */
    currentUser.img = document.querySelector('.imgPerfil').src
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    User.attUserOnStorage(currentUser)
    console.log('teste')
    setTimeout(reset, 3000)
    document.querySelector('#userIcon').querySelector('img').src = document.querySelector('.imgPerfil').src
});