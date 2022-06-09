import User from '../models/userModel.js'

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

    let usersData = JSON.parse(localStorage.users)
    console.log(usersData)
    let first_name = document.querySelector('#txtFirstName').value
    let last_name = document.querySelector('#txtLastName').value
    let email = document.querySelector('#txtEmail').value
    let pwValue = pw.value
    let confirm_pwValue = confirm_pw.value

    let newEmail = usersData.find(user => user.email == email)


    //VERIFICATION TO SEE IF THE PASSWORDS MATCH WITH EACH OTHER
    try{
        if((pwValue == confirm_pwValue) && (newEmail == undefined)) {
            usersData.push(new User(first_name, last_name, pwValue, email, 0))
            console.log(usersData)
            localStorage.setItem('users', JSON.stringify(usersData))
            window.location.href = "./login.html"
        } else {
            throw error
        }
    } catch(error) {
        alert(`Something went wrong, try again.`)
    }
})