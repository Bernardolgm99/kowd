import * as exModel from "./models/exModel.js"
import * as Comment from "./models/commentsModel.js"
import * as Module from "./models/moduleModel.js"
import * as Lesson from "./models/lessonModel.js"
import * as User from "./models/userModel.js"

/* Module.createModuleOnStorage("Basic")
Module.createModuleOnStorage("Medium")
Module.createModuleOnStorage("Hard") */

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
        try {
            exModel.createExerciseType2OnStorage(text_exercise, answer, options, lesson)
        } catch (error) {
            document.querySelector('#exercises').querySelector('.alert').innerText = error
            document.querySelector('#exercises').querySelector('.alert').style.display = 'block'
        }
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
        try {
            exModel.createExerciseType1OnStorage(text_exercise, answer, lesson)
        } catch (error) {
            document.querySelector('#exercises').querySelector('.alert').innerText = error
            document.querySelector('#exercises').querySelector('.alert').style.display = 'block'
        }
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
        try {
            exModel.createExerciseType3OnStorage(text_exercise, answer, lesson, question)
        } catch (error) {
            document.querySelector('#exercises').querySelector('.alert').innerText = error
            document.querySelector('#exercises').querySelector('.alert').style.display = 'block'
        }
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
    if (timeStampsList.length > 0) {
        timeStampsList.forEach(timeStamp => {
            let infoTimeStamp = []
            infoTimeStamp.push(timeStamp.querySelector('.title-value').value)
            infoTimeStamp.push(timeStamp.querySelector('.time-value').value)
            timeStamps.push(infoTimeStamp)
        })
    }
    try {
        Lesson.createLessonOnStorage(nameModule, nameLesson, urlLesson, description, timeStamps)
    } catch (error) {
        document.querySelector('#lessons').querySelector('.alert').innerText = error
        document.querySelector('#lessons').querySelector('.alert').style.display = 'block'
    }
})


let users = JSON.parse(localStorage.getItem('users'))
let tableUser = document.querySelector('#users')
let adminList = users.filter(user => user.type == 1)
let userList = users.filter(user => user.type == 0)


users.forEach(user => {
    tableUser.innerHTML += `
    <tr>
    <td>${user.id}</td>
    <td>${user.first_name} ${user.last_name}</td>
    <td>${user.level}</td>
    <td>${user.point}</td>
    <td>
        <button class="admin btn btn-primary" value="${user.id}">
            Admin
        </button>
        <button class="ban btn btn-primary" value="${user.id}">
            Ban
        </button>
    </td>
    </tr>
    `
})



let btns_admin = document.querySelectorAll('.admin')
btns_admin.forEach(admin => {
    let user = users.find(user => user.id === +admin.getAttribute('value'))
    if (adminList.find(admin => admin.id === user.id)) admin.style.backgroundColor = "#0f0"
    else admin.style.backgroundColor = "#f00"
    admin.addEventListener('click', () => {
        if (user.type) {
            user.type = 0
            User.attUserOnStorage(user)
            admin.style.backgroundColor = "#f00"
        } else {
            user.type = 1
            User.attUserOnStorage(user)
            admin.style.backgroundColor = "#0f0"
        }
    })
})


let btns_ban = document.querySelectorAll('.ban')
btns_ban.forEach(ban => {
    ban.addEventListener('click', () => {
        let user = users.find(user => user.id === +ban.getAttribute('value'))
        User.removeUserOnStorage(user)
        ban.parentNode.parentNode.remove()
    })
})

let bossDiv = document.querySelector('.boss-questions')

bossDiv.querySelector('#boss-question-submit').addEventListener('click', () => {
    let qty = bossDiv.querySelector('#qty-boss').value
    bossDiv.querySelector('#boss-questions').innerHTML = ""
    for (let i = 0; i < qty; i++) {
        bossDiv.querySelector('#boss-questions').innerHTML += `
        <div class="boss-question">
            <div class="input-group mb-1">
                <label class="input-group-text" for="time-stamp-quantity">Question #${i + 1}</label>
                <textarea class="question-boss form-control" aria-label="With textarea"></textarea>
            </div>
            <div class="input-group mb-3">
                <label class="input-group-text" for="time-stamp-quantity">Answers #${i + 1}</label>
                <textarea class="answer-boss form-control" aria-label="With textarea"></textarea>
            </div>
        </div>
        `
    }
    document.querySelector('#createModule').style.display = 'block'
})

document.querySelector('#createModule').addEventListener('click', () => {
    let module_name = document.querySelector('#module-name').value
    let boss_life = document.querySelector('#boss-life').value
    let question_boss = document.querySelectorAll('.boss-question')
    let array_boss = []
    question_boss.forEach(question => {
        let question_boss = question.querySelector('.question-boss').innertText
        let answer_boss = question.querySelector('.answer-boss').innerText
        array_boss.push([question_boss, answer_boss])
    })
    try {
        Module.createModuleOnStorage(module_name, boss_life, array_boss);
    } catch (error) {
        document.querySelector('#module').querySelector('.alert').innerText = error
        document.querySelector('#module').querySelector('.alert').style.display = 'block'
    }
})