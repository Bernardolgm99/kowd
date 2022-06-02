export function createModuleOnStorage(nameModule) {
    let modules = []
    let idModule = 1

    if (localStorage.getItem("modules")) {
        modules = JSON.parse(localStorage.getItem("modules"))
        idModule = modules[modules.length - 1].id + 1
    }
    if(!modules.filter(module => {if (module.name == nameModule) return true; else return false}).length) modules.push(new Module(idModule, nameModule))
    
    localStorage.setItem("modules", JSON.stringify(modules))
}


class Module {
    id = 0
    name = ''

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}