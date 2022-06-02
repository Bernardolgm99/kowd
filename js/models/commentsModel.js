export function createCommentOnStorage(idLessonReference, userName, comment) {
    let comments = []

    if (localStorage.getItem("comments")) {
        comments = JSON.parse(localStorage.getItem("comments"))
    }

    let date = new Date()

    let dateHour = `${date.toString().substr(16, 5)} ${padTo2Digits(date.getDate())}/${padTo2Digits(date.getMonth() + 1)}/${date.getFullYear()}`

    comments.push(new Comments(idLessonReference, userName, comment, dateHour))

    localStorage.setItem("comments", JSON.stringify(comments))
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

class Comments {
    idLessonReference = 0
    userName = ''
    comment = ''
    dateHour = ''
    constructor(idLessonReference, userName, comment, dateHour) {
        this.idLessonReference = idLessonReference;
        this.userName = userName;
        this.comment = comment;
        this.dateHour = dateHour;
    }
}