let usersData = JSON.parse(localStorage.users)
 
//REGISTER USER
export function register(first_name, last_name, email, password, confirm_password) {
    let newEmail = usersData.find(user => user.email == email)
    
    
    //VERIFICATION TO SEE IF THE PASSWORDS MATCH WITH EACH OTHER
    if((password == confirm_password) && (newEmail == undefined)) {
        /*let validation = validateEmail(email)
        if(validation == true) {*/
            usersData.push(new User(first_name, last_name, password, email, 0))
            localStorage.setItem('users', JSON.stringify(usersData))
            window.location.href = "./login.html"
        } else {
            throw Error('Invalid Email Address')
        }
    /*} else {
        throw Error('Something went wrong, try again.')
    }*/
}

//EMAIL VERIFICATION
/*function validateEmail(email) {
    console.log(email)
    console.log(email.match(/^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/));
    if(email.match(/^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/))
  {
    return (true)
  }
    return (false)
}*/


//LOGIN USER
export function login(email, password){
    
    //CHECK IF THERE IS A USER WITH THE SAME EMAIL AND PASSWORD
    let loggedUser = usersData.find(user => user.email == email && user.password == password)

    if(loggedUser != undefined){
        alert('welcome back!')
        localStorage.setItem('currentUser', JSON.stringify(loggedUser))
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

export default class User{
    id = 0
    first_name = ''
    last_name = ''
    password = ''
    email = ''
    type = 0 //(0 - user) (1 - admin)
    exercises_finished = 0
    bag = [0,0,0,0]
    level = 0
    point = 0
    img= "../media/userIcon/user1.jpg"
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