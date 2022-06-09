const userData = JSON.parse(localStorage.users)

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
            userData.length = 0 ? 1 : userData[userData.length - 1].id + 1)
        this.first_name = first_name
        this.last_name = last_name
        this.password = password
        this.email = email
        this.type = type
    }
}