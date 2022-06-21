let usersData = JSON.parse(localStorage.users)

//REGISTER USER
export function register(first_name, last_name, email, password, confirm_password) {

    let newEmail = usersData.find(user => user.email == email)
    
    //VERIFICATION TO SEE IF THE PASSWORDS MATCH WITH EACH OTHER
    if((password == confirm_password) && (newEmail == undefined)) {
        if(validateEmail(email) == true) {
            usersData.push(new User(first_name, last_name, password, email))
            console.log(usersData)
            localStorage.setItem('users', JSON.stringify(usersData))
            return 
        } else {
            throw Error('Invalid Email Address')
        }
    } else {
        throw Error('Something went wrong, try again.')
    }
}

//EMAIL VERIFICATION
function validateEmail(email) {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
    if(email.match(pattern))
  {
    return (true)
  }
    return (false)
}


//LOGIN USER
export function login(email, password){
    
    //CHECK IF THERE IS A USER WITH THE SAME EMAIL AND PASSWORD

    let allAdmins = usersData.filter(user => user.type == 1)
    let loggedAdmin = allAdmins.find(admin => admin.email == email && admin.password == password)

    if(loggedAdmin != undefined){
        if(loggedAdmin.email == email) {
            if(loggedAdmin != undefined){
                localStorage.setItem('currentUser', JSON.stringify(loggedAdmin))
                window.location.href="/admin.html"
            } else {
                throw Error('Email or password are invalid! Please try again')
            }
        }
    }
    console.log(email)

    let loggedUser = usersData.find(user => user.email == email && user.password == password)

    if(loggedUser != undefined){
        localStorage.setItem('currentUser', JSON.stringify(loggedUser))
        return (loggedUser)
    } else {
        throw Error('Email or password are invalid! Please try again')
    }
}

export function attUserOnStorage(attUser){
    let users = JSON.parse(localStorage.getItem('users'))
    users.forEach((user,i) => {
        if (user.id === attUser.id) users[i] = attUser
    })
    localStorage.setItem('users', JSON.stringify(users))
}

export function removeUserOnStorage(deleteUser){
    console.log(deleteUser)
    let users = JSON.parse(localStorage.getItem('users'))
    console.log(users.findIndex(user => user.id == deleteUser.id));
    users.splice(users.findIndex(user => user.id == deleteUser.id),1)
    localStorage.setItem('users', JSON.stringify(users))
}

export default class User{
    id = 0
    first_name = ''
    last_name = ''
    password = ''
    email = ''
    type = 0 //(0 - user) (1 - admin)
    currentExercise = 110
    bag = []
    level = 0
    point = 0
    easteregg = []
    achievements = []
    img= "../media/userIcon/user1.jpg"
    constructor(first_name, last_name, password, email, type = 0){
        this.id = (
            usersData.length == 0 ? 1 : usersData[usersData.length - 1].id + 1)
        this.first_name = first_name
        this.last_name = last_name
        this.password = password
        this.email = email
        this.type = type
    }
}