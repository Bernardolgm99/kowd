// create a class of module in localStorage
export function createModuleOnStorage(nameModule) {
    let modules = []
    let idModule = 1

    // verify if have "modules" in localStorage to get Id of the last module, to create a new one
    if (localStorage.getItem("modules")) {
        modules = JSON.parse(localStorage.getItem("modules"))
        idModule = modules[modules.length - 1].id + 1
    }

    // if module don't aready exist in localStorage, create a class of Module and push it in array
    if(!modules.filter(module => {if (module.name == nameModule) return true; else return false}).length) modules.push(new Module(idModule, nameModule))
    
    // storage the list again
    localStorage.setItem("modules", JSON.stringify(modules))
}

class Module {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}