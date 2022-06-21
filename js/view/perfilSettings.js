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
let input = document.querySelector('.fileAdd')
input.addEventListener('change', () => {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        console.log(reader, reader.result)
        currentUser.img = reader.result;
        User.attUserOnStorage(currentUser)
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        console.log(currentUser)
    })
    reader.readAsDataURL(input.files[0])
})

/* reset */
document.querySelector('#resetBtn').addEventListener('click', () => {reset()})

/* change items */
document.querySelector('#saveBtn').addEventListener('click', (event) => {
    event.preventDefault();
    let password = document.querySelector('#new').value;
    let confirm_password = document.querySelector('#confirm').value;

    if(currentUser.password == password){
        document.querySelector('.inform').innerHTML = `<div class="alert alert-danger" role="alert">Your password is the same as before! Try again.</div>`
    } else if(password == confirm_password) {
        console.log()
        document.querySelector('.inform').innerHTML = `<div class="alert alert-success" role="alert">Your password was changed!</div>`
        /* update change password */
        currentUser.password = password
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        User.attUserOnStorage(currentUser)
        reset()
    } else {
        document.querySelector('.inform').innerHTML = `<div class="alert alert-danger" role="alert">Your passwords don't match! Try again.</div>`
    }
});