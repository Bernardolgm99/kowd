// create a class of module in localStorage
export function createModuleOnStorage(name_module, boss_life, boss_questions) {
    let modules = []
    let idModule = 1

    // verify if have "modules" in localStorage to get Id of the last module, to create a new one
    if (localStorage.getItem("modules")) {
        modules = JSON.parse(localStorage.getItem("modules"))
        idModule = modules[modules.length - 1].id + 1
    }

    // if module don't aready exist in localStorage, create a class of Module and push it in array
    if (!modules.filter(module => { if (module.name == name_module) return true; else return false }).length) modules.push(new Module(idModule, name_module, boss_life, boss_questions))
    else throw Error('This module already exists')
    // storage the list again
    localStorage.setItem("modules", JSON.stringify(modules))
}

class Module {
    constructor(id, name, boss_life, boss_questions) {
        this.id = id;
        this.name = name;
        this.boss_life = boss_life;
        this.boss_questions = boss_questions;
    }
}