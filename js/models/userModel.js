export default class User{
    #id = 0
    #name = ''
    #type = 0 //(0 - user) (1 - admin)
    #last_name = ''
    #password = ''
    #email = ''
    #currentExercise = 0
    #bag = [0,0,0,0]
    #level = 0
    #point = 0
    constructor(id, name,last_name, password, email, type){
        this.#id = id
        this.#name = name
        this.#last_name = last_name
        this.#password = password
        this.#email = email
        this.#type = type
    }

    //Getter
    get getId(){return this.#id}
    get getName(){return this.#name}
    get getLastName(){return this.#last_name}
    get getPassword(){return this.#password}
    get getEmail(){return this.#email}
    get getCurrentExercise(){return this.#currentExercise}
    get getBag(){return this.#bag}
    get getLevel(){return this.#level}
    get getPoint(){return this.#point}
    get getType(){return this.#type}

    //Setter
    set setEmail(email){
        this.#email = email
    }
    set setPassword(password){
        this.#password = password
    }
    set setCurrentExercise(currentExercise){
        this.#currentExercise = currentExercise
    }
    set setBag(bag){
        this.#bag = bag
    }
    set setPoint(point){
        this.#point = point
        this.#level += point
    }
    set setType(type){
        this.#type = type
    }
}