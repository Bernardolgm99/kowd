export default class ModuleId {
    #id = 0
    #name = ''

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    }

    get getId() { 
        return this.#id
    }

    get getName() { 
        return this.#name
    }
}