import User from "./models/userModel.js"
import Lesson from "./models/lessonModel.js"
import Module from "./models/moduleModel.js"
import exModel from "./models/exModel.js"

let arrayModules = ["Basic", "Intermediate", "Advanced"];
let arrayLessons = ['Variable', 'Loop', 'Conditional'];


//CREATE DROPDOWN LIST

arrayModules.forEach(module =>{
    document.querySelector('#drop_lesson').innerHTML += `<li value="${module}"><a class="dropdown-item" href="#">${module}</a></li>`
})

/* Create catch error when the target don't have "className" */
document.querySelector('#btn_module').addEventListener('focusout', (event) => {
    if (event.relatedTarget.className === "dropdown-item"){
        document.querySelector('#btn_module').innerHTML = event.relatedTarget.innerHTML
    }
})

arrayLessons.forEach(lesson =>{
    document.querySelector('#drop_exercises').innerHTML += `<li value="${lesson}"><a class="dropdown-item" href="#">${lesson}</a></li>`
})

document.querySelector('#btn_lesson').addEventListener('focusout', (event) => {
    if (event.relatedTarget.className === "dropdown-item"){
        document.querySelector('#btn_lesson').innerHTML = event.relatedTarget.innerHTML
    }
})









document.querySelector('#typeExercise1').addEventListener('click', () => {
    document.querySelector('#form').innerHTML = `
    <div class="mb-3" id="v-pills-tab">
        <div class="input-group mb-3">
            <span class="input-group-text">Answer</span>
            <input type="text" aria-label="" class="form-control">
        </div>
        <div class="input-group" id="typeExercise1Form">
            <span class="input-group-text">Options</span>
            <input type="text" aria-label="" class="form-control">
            <input type="text" aria-label="" class="form-control">
            <input type="text" aria-label="" class="form-control">
            <input type="text" aria-label="" class="form-control">
        </div>
    </div>
    <button class="btn btn-primary" id="typeExercise1" type="button">Send</button>
    `
})

document.querySelector('#typeExercise2').addEventListener('click', () => {
    document.querySelector('#form').innerHTML = `
    <div class="mb-3">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
            <label class="form-check-label" for="flexRadioDefault1">
                True
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
            <label class="form-check-label" for="flexRadioDefault2">
                False
            </label>
        </div>
    </div>
    <button class="btn btn-primary" id="typeExercise1" type="button">Send</button>
    `
})

document.querySelector('#typeExercise3').addEventListener('click', () => {
    document.querySelector('#form').innerHTML = `
    <div class="mb-3">
        <div class="input-group mb-3">
            <span class="input-group-text">Question</span>
            <textarea class="form-control" aria-label="With textarea"></textarea>
        </div>
        <div class="input-group mb-1">
            <span class="input-group-text">Answer</span>
            <input type="text" aria-label="" class="form-control">
        </div>
        <p class="text-secondary">Please, put a comma between answers</p>
    </div>
    <button class="btn btn-primary" id="typeExercise1" type="button">Send</button>
    `
})










// TRYING TO CREATE A CLASS ON LOCAL STORAGE

createClassOnStorage('basic','variable', '#')
createClassOnStorage('medium','loop', '#')

function createClassOnStorage(nameModule, nameLesson, urlLesson){
    let modules = []
    let lessons = []
    let idModule = 1
    let idLesson = 1
    if (localStorage.getItem['modules']){
        modules = JSON.parse(localStorage.getItem['modules'])
        idModule = modules[modules.length - 1].getID + 1
    }
    if (localStorage.getItem['lessons']){
        lessons = JSON.parse(localStorage.getItem['lessons'])
        idLesson = lessons[lessons.length - 1].getID + 1
    }
    modules.push(new Module(idModule,nameModule))
    lessons.push(new Lesson(idLesson,nameLesson, urlLesson, idModule, 1))

    let a = {a:1, b:2, c:3}
    let b = []
    b.push(a)
    console.log(new Lesson(idLesson,nameLesson, urlLesson, idModule, 1))
    
    localStorage.setItem("modules", modules)
    localStorage.setItem("lessons", JSON.stringify(lessons))
}