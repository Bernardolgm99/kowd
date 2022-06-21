export function createLessonOnStorage(nameModule, nameLesson, urlLesson, description, timestamps = []) {
    let lessons = []
    let idLesson = 1
    if (!nameModule || nameModule.toLowerCase() == 'module') throw Error ("Select a Module")
    if (!nameLesson) throw Error ("Input lesson name")
    if (!urlLesson) throw Error ("Select video file")
    // get modules in localStorage and get the Id
    /* if don't have a module in localStorage yet, will do a error*/
    let modules = JSON.parse(localStorage.getItem('modules'))
    let idModule = (modules.find(module => { if (module.name == nameModule) return nameModule })).id

    // get the last lesson in localStorage if exist someone, and create a Id for a new lesson
    if (localStorage.getItem("lessons")) {
        lessons = JSON.parse(localStorage.getItem("lessons"))
        idLesson = lessons[lessons.length - 1].id + 1
    }


    // tranforme timestamps to seconds
    console.log(timestamps);
    if (timestamps.length != 0) {
        timestamps.forEach((timestamp, i) => {
            let timestamp_att = 0
            timestamp[1].split(':').forEach((time, j, times) => {
                timestamp_att += time * (Math.pow(60, (times.length - j - 1)))
            })
            timestamps[i][1] = timestamp_att
        })
    }

    // verify if lesson exist, if doesn't exist, create a new Lesson and append on lessons
    if (!lessons.filter(lesson => { if (lesson.name == nameLesson) return true; else return false }).length) lessons.push(new Lesson(idLesson, nameLesson, urlLesson, idModule, description, timestamps))
    else throw Error('This lesson aready exist')

    // storage the list of lessons again
    localStorage.setItem("lessons", JSON.stringify(lessons))

    location.reload();
}

export function attLesson(currentLesson) {
    let lessons = JSON.parse(localStorage.getItem("lessons"))
    lessons[lessons.findIndex(lesson => lesson.id === currentLesson.id)] = currentLesson
    localStorage.setItem("lessons", JSON.stringify(lessons))
    localStorage.setItem("currentLesson", JSON.stringify(currentLesson))
    return currentLesson
}

class Lesson {
    id = 0
    name = ''
    url = ''
    popularity = [[], []] // like/dislike
    idModule = 0
    description = ''
    timestamps = ['', 0]
    constructor(id, name, url, idModule, description, timestamps) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.idModule = idModule;
        this.description = description;
        this.timestamps = timestamps;
    }
}