export default class User{
    id = 0
    name = ''
    type = 0 //(0 - user) (1 - admin)
    last_name = ''
    password = ''
    email = ''
    currentExercise = 0
    bag = [0,0,0,0]
    level = 0
    point = 0
    constructor(id, name,last_name, password, email, type){
        this.id = id
        this.name = name
        this.last_name = last_name
        this.password = password
        this.email = email
        this.type = type
    }
}