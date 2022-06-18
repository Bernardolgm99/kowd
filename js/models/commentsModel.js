export function createCommentOnStorage(idLessonReference, userName, imgUser, comment) {
    let comments = []

    if (localStorage.getItem("comments")) {
        comments = JSON.parse(localStorage.getItem("comments"))
    }

    let date = new Date().getTime()

    comments.unshift(new Comments(idLessonReference, userName, imgUser, comment, date))

    localStorage.setItem("comments", JSON.stringify(comments))
}

class Comments {
    constructor(idLessonReference, userName, imgUser, comment, date) {
        this.idLessonReference = idLessonReference;
        this.userName = userName;
        this.comment = comment;
        this.date = date;
        this.imgUser = imgUser;
    }
}