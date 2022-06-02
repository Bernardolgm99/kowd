import * as exModel from "./models/exModel.js"
import * as Comment from "./models/commentsModel.js"
import * as Module from "./models/moduleModel.js"
import * as Lesson from "./models/lessonModel.js"
import * as User from "./models/userModel.js"

Module.createModuleOnStorage("Basic")
Module.createModuleOnStorage("Medium")
Module.createModuleOnStorage("Hard")

let arrayModules = JSON.parse(localStorage.getItem('modules'));
let arrayLessons = [];

if (localStorage.getItem('lessons')) arrayLessons = JSON.parse(localStorage.getItem('lessons'));


//CREATE DROPDOWN LIST

arrayModules.forEach(module => {
    document.querySelector('#drop_lesson').innerHTML += `<li><a class="dropdown-item" href="#">${module.name}</a></li>`
})

/* Create catch error when the target don't have "className" */
document.querySelector('#btn_module').addEventListener('focusout', (event) => {
    if (event.relatedTarget.className === "dropdown-item") {
        document.querySelector('#btn_module').innerHTML = event.relatedTarget.innerHTML
    }
})

arrayLessons.forEach(lesson => {
    document.querySelector('#drop_exercises').innerHTML += `<li><a class="dropdown-item" href="#">${lesson.name}</a></li>`
})

document.querySelector('#btn_lesson').addEventListener('focusout', (event) => {
    if (event.relatedTarget.className === "dropdown-item") {
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

/*Comment.createCommentOnStorage(1,"Bernardo Lage","Bom dia!!!")
Comment.createCommentOnStorage(2,"Bernardo Lage","Bom dia!!!")
Comment.createCommentOnStorage(3,"Bernardo Lage","Bom dia!!!") */


document.querySelector("#createLesson").addEventListener('click', () => {
    const nameModule = document.querySelector('#btn_module').innerHTML
    const nameLesson = document.querySelector('#input_lesson').value
    const urlLesson = document.querySelector('#input_url').value
    const description = document.querySelector('#description').value


    if (nameModule != "Module") {
        if (nameLesson != "") {
            if (urlLesson != "") Lesson.createLessonOnStorage(nameModule, nameLesson, urlLesson, description)
            else alert("Please select a video")
        }
        else alert("Please type a title")
    }
    else alert("Please select a module")
})