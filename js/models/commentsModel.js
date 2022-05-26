export default class Comments {
    #id = 0
    userName = ''
    comment = ''
    dateHour = ''
    constructor(id, userName, comment, dateHour) {
        this.#id = id;
        this.userName = userName;
        this.comment = comment;
        this.dateHour = dateHour;
    }
    get getUserName() { return this.userName; }
    get getComment() { return this.comment; }
    get getDateHour() { return this.dateHour; }
    get getId() { return this.id; }
}