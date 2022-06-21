//DATA FROM THE LOCAL STORAGE
let modules = JSON.parse(localStorage.getItem('modules'))
let lessons = JSON.parse(localStorage.getItem('lessons'))
let exercises = JSON.parse(localStorage.getItem('exercises'))

//VARIABLES
let mainDiv = document.querySelector('#tutorialModules').querySelector('.row')

let cont = 1   
let secondCont = 1

//CREATION OF ACCORDION FOR THE PAGE
modules.forEach(module => {
    console.log("bom dia");
    mainDiv.innerHTML += `<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="${module.id}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#module${module.id}" aria-expanded="false" aria-controls="module${module.id}">
        Module ${module.id} - ${module.name}
      </button>
    </h2>
    <div id="module${module.id}" class="accordion-collapse collapse" aria-labelledby="${module.id}" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong id="txt${module.id}">
      </div>
    </div>
  </div>
  `

//FUNCTION TO CREATE NEW DIVS FOLLOWING THE NUMBER OF LESSONS AND EXERCISES
  lessons.forEach(lesson => {
      if(lesson.idModule == module.id) {
          document.querySelector(`#txt${module.id}`).innerHTML +=`<a href="lesson.html" class="lessons" id="${lesson.id}">LESSSON ${cont} - ${lesson.name}</a>`
            cont +=1 
          exercises.forEach(exercise => {
                if(exercise.lessonId == lesson.id){
                    document.querySelector(`#txt${module.id}`).innerHTML += `<a href="exercise.html" class="exercises my-3" id="${exercise.id}"> EXERCISE ${secondCont} </a>`
                    secondCont +=1
                }       
            })
        }
  })
})

//FUNCTION TO SWITCH TO THE RESPECTIVE LESSON PAGE (VIDEO TUTORIAL)
document.querySelectorAll('.lessons').forEach(lesson => {
    lesson.addEventListener('click', () => {
        let currentLesson = lessons.find(lessonFinder => lessonFinder.id == document.getElementById(`${lesson.id}`).id)
        localStorage.setItem('currentLesson', JSON.stringify(currentLesson))
    })
})

//FUNCTION TO SWITCH TO THE RESPECTIVE EXERCISE PAGE
document.querySelectorAll('.exercises').forEach(exercise => {
    exercise.addEventListener('click', () => {
        let currentExercise = exercises.find(exerciseFinder => exerciseFinder.id == document.getElementById(`${exercise.id}`).id)
        localStorage.setItem('currentExercise', JSON.stringify(currentExercise))
    })
})