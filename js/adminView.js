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



document.querySelector('#typeExercise2').addEventListener('click', () => {
    document.querySelector('#form').innerHTML = `
    <div class="mb-3" id="v-pills-tab">
        <div class="input-group mb-3">
            <span class="input-group-text">Answer</span>
            <input id="answer" type="text" aria-label="" class="form-control">
        </div>
        <div class="input-group" id="typeExercise1Form">
            <span class="input-group-text">Wrong Answers</span>
            <input id="option1" type="text" aria-label="" class="form-control">
            <input id="option2" type="text" aria-label="" class="form-control">
            <input id="option3" type="text" aria-label="" class="form-control">
        </div>
    </div>
    <button class="btn btn-primary" id="exerciseSend" type="button">Send</button>
    `
    document.querySelector("#exerciseSend").addEventListener("click", () => {
        const lesson = document.querySelector("#btn_lesson").innerHTML
        const text_exercise = document.querySelector("#text-exercise").value
        const answer = document.querySelector("#answer").value
        const option1 = document.querySelector("#option1").value
        const option2 = document.querySelector("#option2").value
        const option3 = document.querySelector("#option3").value
        const options = [option1, option2, option3]
        exModel.createExerciseType2OnStorage(text_exercise, answer, options, lesson)
    })
})


document.querySelector('#typeExercise1').addEventListener('click', () => {
    document.querySelector('#form').innerHTML = `
    <div class="mb-3">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="answer" id="answer1" value="true">
            <label class="form-check-label" for="answer1">
                True
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="answer" id="answer2" value="false" checked>
            <label class="form-check-label" for="answer2">
                False
            </label>
        </div>
    </div>
    <button class="btn btn-primary" id="exerciseSend" type="button">Send</button>
    `
    document.querySelector("#exerciseSend").addEventListener("click", () => {
        const lesson = document.querySelector("#btn_lesson").innerHTML
        const text_exercise = document.querySelector("#text-exercise").value
        const answer = document.querySelector('input[name="answer"]:checked').value
        exModel.createExerciseType1OnStorage(text_exercise, answer, lesson)
    })
})


document.querySelector('#typeExercise3').addEventListener('click', () => {
    document.querySelector('#form').innerHTML = `
    <div class="mb-3">
        <div class="input-group mb-3">
            <span class="input-group-text">Question</span>
            <textarea id="question" class="form-control" aria-label="With textarea"></textarea>
        </div>
        <div class="input-group mb-1">
            <span class="input-group-text">Answer</span>
            <input id="answer" type="text" aria-label="" class="form-control">
        </div>
        <p class="text-secondary">Please, put a comma between answers</p>
    </div>
    <button class="btn btn-primary" id="exerciseSend" type="button">Send</button>
    `
    document.querySelector("#exerciseSend").addEventListener("click", () => {
        const lesson = document.querySelector("#btn_lesson").innerHTML
        const text_exercise = document.querySelector("#text-exercise").value
        const question = document.querySelector("#question").value
        const answer = document.querySelector("#answer").value
        exModel.createExerciseType3OnStorage(text_exercise, answer, lesson, question)
    })
})

/*Comment.createCommentOnStorage(1,"Bernardo Lage","Bom dia!!!")
Comment.createCommentOnStorage(2,"Bernardo Lage","Bom dia!!!")
Comment.createCommentOnStorage(3,"Bernardo Lage","Bom dia!!!") */

document.querySelector('#time-stamp-submit').addEventListener('click', () => {
    const qtyTimeStamp = document.querySelector('#time-stamp-quantity').value
    let div_insert = document.querySelector('#insert-time-stamp')
    div_insert.innerHTML = `The tructure of the time should be splited for ":"<br>Example:<br>-> 1:32:22<br>-> 12:20`
    for (let i = 0; i < qtyTimeStamp; i++) {
        div_insert.innerHTML += `
        <div class="input-group mb-1 timeStamp">
            <span class="input-group-text">Timestamp ${i + 1}</span>
            <span class="input-group-text">Title</span>
            <input id="time-stamp${i}" type="input" class="form-control title-value">
            <span class="input-group-text">Time</span>
            <input id="time-stamp${i}" type="input" class="form-control time-value">
        </div>
        `
    }
})
document.querySelector("#createLesson").addEventListener('click', () => {
    const nameModule = document.querySelector('#btn_module').innerHTML
    const nameLesson = document.querySelector('#input_lesson').value
    const urlLesson = document.querySelector('#input_url').value
    const description = document.querySelector('#description').value
    const timeStampsList = document.querySelectorAll('.timeStamp')
    let timeStamps = []
    if(timeStampsList.length > 0){
        timeStampsList.forEach(timeStamp => {
            let infoTimeStamp = []
            console.log(timeStamp);
            infoTimeStamp.push(timeStamp.querySelector('.title-value').value)
            infoTimeStamp.push(timeStamp.querySelector('.time-value').value)
            console.log("bom dia", infoTimeStamp);
            timeStamps.push(infoTimeStamp)
        })
    }
    console.log(timeStamps);

    if (nameModule != "Module") {
        if (nameLesson != "") {
            if (urlLesson != "") Lesson.createLessonOnStorage(nameModule, nameLesson, urlLesson, description, timeStamps)
            else alert("Please select a video")
        }
        else alert("Please type a title")
    }
    else alert("Please select a module")
})