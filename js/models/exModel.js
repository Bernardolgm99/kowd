export default class Exercise{
    #question = ''
    #answer = ''
    #options = ''
    #id = 0
    #title = ''
    #lessonId = 0

    constructor(question, answer, options, id, title, lessonId) {
        this.#question = question
        this.#answer = answer
        this.#options = options
        this.#id = id
        this.#title = title
        this.#lessonId = lessonId
    }
    
    get getQuestion(){
        return this.#question
    }

    get getAnswer(){
        return this.#answer
    }

    get getOptions(){
        return this.#options
    }

    get getId(){
        return this.#id
    }

    get getTitle(){
        return this.#title
    }

    get getLessonId(){
        return this.#lessonId
    }
}