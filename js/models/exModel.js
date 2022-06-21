// create a class of first type of exercise in localStorage
export function createExerciseType1OnStorage(question, answer, nameLesson) {
    let exercises = []
    let idExercise = 1

    if (!nameLesson || nameLesson.toLowerCase() == 'lesson') throw Error('Select a lesson')
    if (!question) throw Error('Input text question')
    if (!answer) throw Error('Need to select the answer')

    // get lessons in localStorage
    /* if the lesson isn't in storage yet, will appear a error */
    let lessons = JSON.parse(localStorage.getItem('lessons'))
    let idLesson = (lessons.find(lesson => { if (lesson.name == nameLesson) return nameLesson })).id

    // get exercises if they aready exist for create a id for new exercises
    if (localStorage.getItem("exercises")) {
        exercises = JSON.parse(localStorage.getItem("exercises"))
        idExercise = exercises[exercises.length - 1].id + 1
    }
    // if the question isn't aready exist create a class Exercise and do a push
    if (!exercises.filter(exercise => { if (exercise.question == question) return true; else return false }).length) exercises.push(new Exercise(idExercise, 1, question, answer, idLesson))

    // storage the list again
    localStorage.setItem("exercises", JSON.stringify(exercises))
}

// create a class of second type of exercise in localStorage
export function createExerciseType2OnStorage(question, answer, wrong_answers, nameLesson) {
    let exercises = []
    let idExercise = 1

    if (!nameLesson || nameLesson.toLowerCase() == 'lesson') throw Error('Select a lesson')
    if (!question) throw Error('Input text question')
    if (!answer) throw Error('Need to select the answer')
    if (!wrong_answers[0] && !wrong_answers[1] && !wrong_answers[2]) throw Error('Need to input all wrong ')

    // get lessons in localStorage
    /* if the lesson isn't in storage yet, will appear a error */
    let lessons = JSON.parse(localStorage.getItem('lessons'))
    let idLesson = (lessons.find(lesson => { if (lesson.name == nameLesson) return nameLesson })).id

    // get exercises if they aready exist for create a id for new exercises
    if (localStorage.getItem("exercises")) {
        exercises = JSON.parse(localStorage.getItem("exercises"))
        idExercise = exercises[exercises.length - 1].id + 1
    }

    // if the question isn't aready exist create a class Exercise and do a push
    if (!exercises.filter(exercise => { if (exercise.question == question) return true; else return false }).length) exercises.push(new Type2Exercise(idExercise, 2, question, answer, idLesson, wrong_answers))

    // storage the list again
    localStorage.setItem("exercises", JSON.stringify(exercises))
}

// create a class of third type of exercise in localStorage
export function createExerciseType3OnStorage(question, answer, nameLesson, question_text) {
    let exercises = []
    let idExercise = 1

    if (!nameLesson || nameLesson.toLowerCase() == 'lesson') throw Error('Select a lesson')
    if (!question) throw Error('Input text question')
    if (!answer) throw Error('Need to select the answer')
    if (!question_text) throw Error('Need to input text for the question')

    // get lessons in localStorage
    /* if the lesson isn't in storage yet, will appear a error */
    let lessons = JSON.parse(localStorage.getItem('lessons'))
    let idLesson = (lessons.find(lesson => { if (lesson.name == nameLesson) return nameLesson }).id)

    // get exercises if they aready exist for create a id for new exercises
    if (localStorage.getItem("exercises")) {
        exercises = JSON.parse(localStorage.getItem("exercises"))
        idExercise = exercises[exercises.length - 1].id + 1
    }

    // correcting the answer for reading easily with code
    answer = answer.replace(/,/g, '').split('').join(',')

    // if the question isn't aready exist create a class Exercise and do a push
    if (!exercises.filter(exercise => { if (exercise.question == question) return true; else return false }).length) exercises.push(new Type3Exercise(idExercise, 3, question, answer, idLesson, question_text))
    else throw Error('This exercise aready exist')
    // storage the list again
    localStorage.setItem("exercises", JSON.stringify(exercises))
}


// class and extends how needs for other types of exercises
class Exercise {
    constructor(id, type, question, answer, lessonId) {
        this.id = id
        this.type = type // 1, 2, 3
        this.question = question
        this.answer = answer
        this.lessonId = lessonId
    }
}
class Type2Exercise extends Exercise {
    constructor(id, type, question, answer, lessonId, wrong_answers) {
        super(id, type, question, answer, lessonId)
        this.wrong_answers = wrong_answers
    }
}
class Type3Exercise extends Exercise {
    constructor(id, type, question, answer, lessonId, question_text) {
        super(id, type, question, answer, lessonId)
        this.question_text = question_text
    }
}