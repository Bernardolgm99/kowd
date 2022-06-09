let id = 4
const div = document.querySelector('.exercise')
let currentExercise

const exercises = JSON.parse(localStorage.getItem('exercises'))

for (let exercise of exercises) {
    if (exercise.id === id) { currentExercise = exercise; break }
}

switch (currentExercise.type) {
    case 1:
        div.innerHTML = `
        <h1>Exercise #${currentExercise.id}</h1>
        <p>${currentExercise.question}</p>
        <button class="true">True</button>
        <button class="false">False</button>
        `
        if (currentExercise.answer == "true") {
            document.querySelector('.true').addEventListener('click', rightAnswer)
            document.querySelector('.false').addEventListener('click', wrongAnswer)
        }
        else {
            document.querySelector('.true').addEventListener('click', wrongAnswer)
            document.querySelector('.false').addEventListener('click', rightAnswer)
        }
        break
    case 2:
        let array = currentExercise.wrong_answers
        array.push(currentExercise.answer)
        console.log(array);
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * array.length);
            console.log(randomIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        console.log(array);

        div.innerHTML = `
        <h1>Exercise #${currentExercise.id}</h1>
        <p>${currentExercise.question}</p>
        <button class="${array[0] === currentExercise.answer ? "true" : "false"}">${array[0]}</button>
        <button class="${array[1] === currentExercise.answer ? "true" : "false"}">${array[1]}</button>
        <button class="${array[2] === currentExercise.answer ? "true" : "false"}">${array[2]}</button>
        <button class="${array[3] === currentExercise.answer ? "true" : "false"}">${array[3]}</button>
        `
        document.querySelector('.true').addEventListener('click', rightAnswer)
        document.querySelectorAll('.false').forEach((button)=>{button.addEventListener('click', wrongAnswer)})
        break
    case 3:
        div.innerHTML = `
        <h1>Exercise #${currentExercise.id}</h1>
        <p>${currentExercise.question}</p>
        `
        let questionArray = currentExercise.question_text.split('')
        questionArray.forEach((letter)=>{
            if (letter=='_') {
                div.innerHTML +=`<input value="" class="input-hide" maxlength="1" style="width: 15px; padding: 0px; text-align: center; border:0px; border-bottom: 1px solid #fff; background-color: rgba(255,255,255,0); color: #fff; margin: 0px 1px">`
            } else {
                div.innerHTML +=`${letter}`
            }
        })

        div.innerHTML += `<button id="submit">Submit</button>`
        document.querySelector('#submit').addEventListener('click',()=>{
            let answers_user = []
            document.querySelectorAll('.input-hide').forEach((input)=>{
                answers_user.push(input.value)
            })
            answers_user = answers_user.join()
            if (answers_user === currentExercise.answer)alert("good job")
            else alert("bad job")
        })

}

function rightAnswer() {
    alert('Good job!')
}

function wrongAnswer() {
    alert('You need to study more')
}