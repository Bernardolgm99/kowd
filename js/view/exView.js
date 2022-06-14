import * as User from "../models/userModel.js"

const exercise_point = 100
const exercise_point_bonus = 1000
const exercise_point_repeated = 0

let exerciseId = JSON.parse(localStorage.getItem('currentExercise')).id
let lessonId = JSON.parse(localStorage.getItem('currentLesson')).id
let currentUser = JSON.parse(localStorage.getItem('currentUser'))
let exercisesInLesson = JSON.parse(localStorage.getItem('exercises')).filter(exercise => exercise.lessonId == lessonId)

const div = document.querySelector('.exercise')
let currentExercise = exercisesInLesson.find(exercise => exercise.id === exerciseId)
console.log(currentExercise)
const exercises = JSON.parse(localStorage.getItem('exercises'))

templateExercise()

function templateExercise() {
    div.innerHTML = `
    <h1 class="mb-5">Exercise #${exercises.findIndex(exercise => exercise.id === currentExercise.id) + 1}</h1>
    <div class="col-lg-6 col-sm-12 mb-3 fs-3"><p>${currentExercise.question}</p></div>`

    switch (currentExercise.type) {
        case 1:
            div.childNodes[3].className = "col-12 mb-3"

            div.innerHTML += `
            <div id="test" class="col-12 row justify-content-evenly">
            <button class="btn btn-primary col-lg-5 col-sm-12 true">True</button>
            <button class="btn btn-primary col-lg-5 col-sm-12 false">False</button>
            </div>
            `
            if (currentExercise.answer == "true") {
                document.querySelector('.true').addEventListener('click', rightAnswer)
                document.querySelector('.true').setAttribute('data-bs-toggle', 'modal')
                document.querySelector('.true').setAttribute('data-bs-target', '#modalAnswer')
                document.querySelector('.false').addEventListener('click', wrongAnswer)
                document.querySelector('.false').setAttribute('data-bs-toggle', 'modal')
                document.querySelector('.false').setAttribute('data-bs-target', '#modalAnswer')
            }
            else {
                document.querySelector('.true').addEventListener('click', wrongAnswer)
                document.querySelector('.true').setAttribute('data-bs-toggle', 'modal')
                document.querySelector('.true').setAttribute('data-bs-target', '#modalAnswer')
                document.querySelector('.false').addEventListener('click', rightAnswer)
                document.querySelector('.false').setAttribute('data-bs-toggle', 'modal')
                document.querySelector('.false').setAttribute('data-bs-target', '#modalAnswer')
            }
            break
        case 2:
            let array = currentExercise.wrong_answers
            array.push(currentExercise.answer)

            // Randomize the answer
            let currentIndex = array.length, randomIndex;
            while (currentIndex != 0) {
                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * array.length);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }

            div.innerHTML += `
            <div class="col-lg-6 col-sm-12 d-flex flex-column bd-highlight">
            <button class="btn btn-primary mb-2 ${array[0] === currentExercise.answer ? "true" : "false"}">${array[0]}</button>
            <button class="btn btn-primary mb-2 ${array[1] === currentExercise.answer ? "true" : "false"}">${array[1]}</button>
            <button class="btn btn-primary mb-2 ${array[2] === currentExercise.answer ? "true" : "false"}">${array[2]}</button>
            <button class="btn btn-primary ${array[3] === currentExercise.answer ? "true" : "false"}">${array[3]}</button>
            </div>
            `

            //Add fuctions to buttons
            document.querySelector('.true').addEventListener('click', rightAnswer)
            document.querySelector('.true').setAttribute('data-bs-toggle', 'modal')
            document.querySelector('.true').setAttribute('data-bs-target', '#modalAnswer')
            document.querySelectorAll('.false').forEach((button) => {
                button.addEventListener('click', wrongAnswer)
                button.setAttribute('data-bs-toggle', 'modal')
                button.setAttribute('data-bs-target', '#modalAnswer')
            })
            break
        case 3:

            div.innerHTML += `<div class="col-lg-6 col-sm-12 mb-5 fs-4 d-flex flex-column"><div class="mb-5"></div></div>`
            let questionArray = currentExercise.question_text.split('')
            console.log(div.childNodes);
            questionArray.forEach((letter) => {
                if (letter == '_') {
                    div.childNodes[4].childNodes[0].innerHTML += `<input value="" class="input-hide" maxlength="1" style="width: 15px; padding: 0px; text-align: center; border:0px; border-bottom: 1px solid #fff; background-color: rgba(255,255,255,0); color: #fff; margin: 0px 1px">`
                } else {
                    div.childNodes[4].childNodes[0].innerHTML += `${letter}`
                }
            })

            div.childNodes[4].innerHTML += `<button class="btn btn-primary" id="submit">Submit</button>`
            document.querySelector('#submit').addEventListener('click', () => {
                let answers_user = []
                document.querySelectorAll('.input-hide').forEach((input) => {
                    answers_user.push(input.value)
                })
                answers_user = answers_user.join()
                if (answers_user === currentExercise.answer) rightAnswer()
                else wrongAnswer()
            })
            document.querySelector('#submit').setAttribute('data-bs-toggle', 'modal')
            document.querySelector('#submit').setAttribute('data-bs-target', '#modalAnswer')
    }
}


/* Need to create a catch error (probably) when the "exercisesInLesson[currentExercise.id]" is out of range */
function rightAnswer() {
    const modal_content = document.getElementById('modalAnswer').querySelector('.modal-content')
    if (currentUser.exercises_finished < currentExercise.id) {
        console.log(currentUser.exercises_finished)
        modal_content.innerHTML = `
            <div class="modal-body">
                ${currentUser.first_name}, you're right.<br>
                Will reciave:<br>
                -> ${exercise_point} points<br>
                -> Desbloque exercise ${currentExercise.id + 1}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Next</button>
            </div>
        `
        if (!exercisesInLesson[currentExercise.id]) {
            modal_content.querySelector('.modal-body').innerHTML = `
                ${currentUser.first_name}, you're right.<br>
                Will reciave:<br>
                -> ${exercise_point} points<br>
                -> Desbloque lesson ${lessonId + 1}
                <br>-> Bonus: ${exercise_point_bonus} points<br>
                (finish lesson)
            `
            modal_content.querySelector('button').innerHTML = `Finish`
            modal_content.querySelector('button').addEventListener('click', () => {
                window.location.href = "index.html"
            })
            currentUser.point += exercise_point_bonus
        }
        else {
            modal_content.querySelector('button').addEventListener('click', () => {
                currentExercise = exercisesInLesson.find(exercise => exercise.id == currentExercise.id + 1)
                console.log(currentExercise);
                templateExercise()
            })
        }
        currentUser.exercises_finished = currentExercise.id
        currentUser.point += exercise_point
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        User.attUserOnStorage(currentUser)
    }
    else {
        modal_content.innerHTML = `
            <div class="modal-body">
                ${currentUser.first_name}, you're right.<br>
                Will reciave:<br>
                -> ${exercise_point_repeated} points<br>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Next</button>
            </div>
        `
        if (!exercisesInLesson[currentExercise.id]) {
            modal_content.querySelector('.modal-body').innerHTML += `
                (finish lesson)
            `
            modal_content.querySelector('button').innerHTML = `Finish`
            modal_content.querySelector('button').addEventListener('click', () => {
                window.location.href = "index.html"
            })
        }
        modal_content.querySelector('button').addEventListener('click', () => {
            currentExercise = exercisesInLesson.find(exercise => exercise.id == currentExercise.id + 1)
            console.log(currentExercise);
            templateExercise()
        })
    }
}
function wrongAnswer() {
    const modal_content = document.getElementById('modalAnswer').querySelector('.modal-content')
    modal_content.innerHTML = `
        <div class="modal-body">
            ${currentUser.first_name}, you're wrong.<br>
            Want to try again or study a little bit more?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Try again</button>
            <button id="go-study" type="button" class="btn btn-primary">Go to lesson</button>
        </div>
    `
    document.querySelector('#go-study').addEventListener('click', () => {
        window.location.href = "../lesson.html"
    })
}