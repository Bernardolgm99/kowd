let usersData = JSON.parse(localStorage.users)

//REGISTER USER
export function register(first_name, last_name, email, password, confirm_password) {
    let newEmail = usersData.find(user => user.email == email)
    
//VERIFICATION TO SEE IF THE PASSWORDS MATCH WITH EACH OTHER
    if((password == confirm_password) && (newEmail == undefined)) {
        usersData.push(new User(first_name, last_name, password, email, 0))
        localStorage.setItem('users', JSON.stringify(usersData))
        window.location.href = "./login.html"
    } else {
        throw Error('Something went wrong, try again.')
    }
}

//LOGIN USER
export function login(email, password){
    
    //CHECK IF THERE IS A USER WITH THE SAME EMAIL AND PASSWORD
    let loggedUser = usersData.find(user => user.email == email && user.password == password)

    if(loggedUser != undefined){
        alert('welcome back!')
        localStorage.setItem('Current User', JSON.stringify(loggedUser))
    } else {
        throw Error('Email or password are invalid! Please try again')
    }
}

export default class User{
    id = 0
    first_name = ''
    last_name = ''
    password = ''
    email = ''
    type = 0 //(0 - user) (1 - admin)
    currentExercise = 0
    bag = [0,0,0,0]
    level = 0
    point = 0
    constructor(first_name,last_name, password, email, type){
        this.id = (
            usersData.length = 0 ? 1 : usersData[usersData.length - 1].id + 1)
        this.first_name = first_name
        this.last_name = last_name
        this.password = password
        this.email = email
        this.type = type
    }
}