export function createLessonOnStorage(nameModule,nameLesson, urlLesson, description) {
    let lessons = []
    let idLesson = 1
    let modules = JSON.parse(localStorage.getItem('modules'))
    let idModule = (modules.filter(module => {if (module.name == nameModule) return true; else return false})[0].id)

    if (localStorage.getItem("lessons")) {
        lessons = JSON.parse(localStorage.getItem("lessons"))
        idLesson = lessons[lessons.length - 1].id + 1
    }


    if(!lessons.filter(lesson => {if (lesson.name == nameLesson) return true; else return false}).length) lessons.push(new Lesson(idLesson, nameLesson, urlLesson, idModule, description))

    localStorage.setItem("lessons", JSON.stringify(lessons))
    location.reload();
}


class Lesson {
    id = 0
    name = ''
    url = ''
    popularity = 0
    idModule = 0
    description = ''

    constructor(id,name,url,idModule,description) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.idModule = idModule;
        this.description = description;
    }
}