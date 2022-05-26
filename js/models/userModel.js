export default class User{
    #id = 0
    #name = ''
    #type = ''
    #last_name = ''
    #password = ''
    #email = ''
    current_exercise = 0
    bag = new Bag
    level = 0
    point = 0
    constructor(id, name,last_name, password, email){
        this.#id = id
        this.#name = name
        this.#last_name = last_name
        this.#password = password
        this.#email = email
        this.#type = type
    }

    //Getter
    get getName(){return this.#name}
    get getLastName(){return this.#last_name}
    get getPassword(){return this.#password}
    get getEmail(){return this.#email}
    get getCurrentExercise(){return this.current_exercise}
    get getBag(){return this.bag}
    get getLevel(){return this.level}
    get getPoint(){return this.point}
    get getType(){return this.#type}

    //Setter
    set setEmail(email){
        this.email = email
    }
    set setPassword(password){
        this.password = password
    }
    set setCurrentExercise(current_exercise){
        this.current_exercise = current_exercise
    }
    set setBag(bag){
        this.bag = bag
    }
    set setPoint(point){
        this.point = point
        this.level += level
    }
    set setType(type){
        this.type = type
    }
}

export class Bag {
    #id = 0
    item1 = 0
    item2 = 0
    item3 = 0
    item4 = 0
    constructor(id){
        this.#id = id
    }
}