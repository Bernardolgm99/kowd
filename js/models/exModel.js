export default class Exercise1{
    question = ''
    answer = ''
    options = ''

    constructor(question, answer, options){
        this.question = question
        this.answer = answer
        this.options = options
    }
    
    get question(){
        return this.question
    }

    get answer(){
        return this.answer
    }

    get options(){
        return this.options
    }

}

export default class Exercise2{
    phrase = ''
    answers = ''
    
    constructor(phrase, answers){
        this.phrase = phrase
        this.answers = answers
    }

    get phrase(){   
        return this.phrase
    }

    get answers(){
        return this.answers
    }
}

export default class Exercise3{ 
    
}