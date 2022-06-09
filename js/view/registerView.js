import * as User from '../models/userModel.js'

//CONSTANTS
let radioPw = document.querySelector('#radioPassword')
let pw = document.querySelector('#txtPw')
let confirm_pw = document.querySelector('#txtConfirmPw')


//SHOW/HIDE THE PASSWORD 
radioPw.addEventListener('click', () => {

    console.log(radioPw.checked)
    if(radioPw.checked == true){
        pw.type = "text"
        confirm_pw.type = "text"
    } else {
        pw.type = 'password'
        confirm_pw.type = 'password'
    }
})

//CREATE AN ACCOUNT
document.querySelector('#btnRegisterAcc').addEventListener('click', () => {
    event.preventDefault()

    let first_name = document.querySelector('#txtFirstName').value
    let last_name = document.querySelector('#txtLastName').value
    let email = document.querySelector('#txtEmail').value
    let pwValue = pw.value
    let confirm_pwValue = confirm_pw.value

    try{
        User.register(first_name, last_name, email, pwValue, confirm_pwValue)
    } catch(error){
        alert(error.message)
    }
})