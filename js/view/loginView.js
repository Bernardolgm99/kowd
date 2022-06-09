
let usersData = JSON.parse(localStorage.users)
console.log(usersData)
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

    let userArray = usersData.filter(user => user.email == email && user.password == password)
    let loggedUser = userArray[0]

    try {
        if(loggedUser != undefined){
            alert('welcome back!')
            localStorage.setItem('Current User', JSON.stringify(loggedUser))
        } else {
            throw error
        }

    } catch (error) {
        alert('Email or password are invalid! Please try again')
    }
})