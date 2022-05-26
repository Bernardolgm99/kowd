export default class Lesson {
    #id = 0
    #name = ''
    #url = ''
    #popularity = 0
    #moduleId = 0
    #commentId = 0

    constructor(id,name,url,moduleId,commentId) {
        this.#id = id;
        this.#name = name;
        this.#url = url;
        this.#moduleId = moduleId;
        this.#commentId = commentId;
    }

    get getId(){return this.#id}
    get getName(){return this.#name}
    get getUrl(){return this.#url}
    get getPopularity(){return this.#popularity}
    get getModuleId(){return this.#moduleId}
    get getCommentId(){return this.#commentId}

    set setId(id){this.#id = id}
    set setName(name){this.#name = name}
    set setUrl(url){this.#url = url}
    set setPopularity(popularity){this.#popularity = popularity}
    set setModuleId(moduleId){this.#moduleId = moduleId}
    set setCommentId(commentId){this.#commentId = commentId}
}