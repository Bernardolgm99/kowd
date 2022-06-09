import * as User from "../models/userModel.js"

let radioPw = document.querySelector('#radioPassword')
let pw = document.querySelector('#txtPw')

//SHOW/HIDE THE PASSWORD
radioPw.addEventListener('click', () => {

    console.log(radioPw.checked)
    if(radioPw.checked == true){
        pw.type = "text"
    } else {
        pw.type = 'password'
    }
})

//CHECK IF THE VALUES MATCH WITH THE LOCAL STORAGE VALUES
document.querySelector('#btnLogInAcc').addEventListener('click', () => {
    event.preventDefault()

    let email = document.querySelector('#txtEmail').value
    let password = document.querySelector('#txtPw').value

    try{
        User.login(email, password)
    } catch(error){
        alert(error.message)
    }
})