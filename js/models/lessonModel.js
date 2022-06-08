export function createLessonOnStorage(nameModule,nameLesson, urlLesson, description) {
    let lessons = []
    let idLesson = 1
    
    // get modules in localStorage and get the Id
    /* if don't have a module in localStorage yet, will do a error*/
    let modules = JSON.parse(localStorage.getItem('modules'))
    let idModule = (modules.find(module => { if (module.name == nameModule) return nameModule })).id

    // get the last lesson in localStorage if exist someone, and create a Id for a new lesson
    if (localStorage.getItem("lessons")) {
        lessons = JSON.parse(localStorage.getItem("lessons"))
        idLesson = lessons[lessons.length - 1].id + 1
    }

    // verify if lesson exist, if doesn't exist, create a new Lesson and append on lessons
    if(!lessons.filter(lesson => {if (lesson.name == nameLesson) return true; else return false}).length) lessons.push(new Lesson(idLesson, nameLesson, urlLesson, idModule, description))

    // storage the list of lessons again
    localStorage.setItem("lessons", JSON.stringify(lessons))
    
    // do a reload on page but i don't remeber why. (but is important i think)
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