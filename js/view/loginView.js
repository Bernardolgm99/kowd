import * as User from "../models/userModel.js"

let radioPw = document.querySelector('#radioPassword')
let pw = document.querySelector('#txtPw')

//SHOW/HIDE THE PASSWORD
radioPw.addEventListener('click', () => {

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
        let validation = User.login(email, password)
        if(validation){
            document.querySelector('#inform').innerHTML = `<div class="alert alert-success" role="alert">
                                                                Welcome back ${validation.first_name}!
                                                            </div>`
            setTimeout(() => {window.location.href = "./userHome.html"},1000)
        }
    } catch(error){
        document.querySelector('#inform').innerHTML = `<div class="alert alert-danger" role="alert">
                                                            ${error}
                                                        </div>`

    }
})