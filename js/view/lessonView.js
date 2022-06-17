import * as Comments from "../models/commentsModel.js"
import * as Lesson from "../models/lessonModel.js"

let currentLesson = JSON.parse(localStorage.getItem('currentLesson'))
let currentUser = JSON.parse(localStorage.getItem('currentUser'))

/* Comments.createCommentOnStorage(10, 'ahh_theuser','bernardo é foda')
Comments.createCommentOnStorage(10, 'niggaMen','COMO?')
Comments.createCommentOnStorage(20, 'PILAS','OLA OVELINHAS')
Comments.createCommentOnStorage(10, 'pernas_sao_fixes','VA EU DIGO KINDER VOCES DIZEM BUENO, KINDER ... KINDER ... KinDeR? vai te fuder...')
Comments.createCommentOnStorage(20, 'ahh_theuser','Uwu')
Comments.createCommentOnStorage(10, 'alves=tomHoland','DAs Me DiNHEiRo!? e um beijo? (,,0o0,,)') */
let comments = JSON.parse(localStorage.getItem('comments')).filter(comment => comment.idLessonReference === currentLesson.id)
comments.forEach(comment => {
    document.querySelector('#comments-list').querySelector('.comments').innerHTML += `
    <div class="d-flex my-3 justify-content-center" style="padding:0px">
        <div class="px-2"><img src="${comment.img}" style="width:80px; border-radius:50%;"></div>
        <div class="w-100 px-3 row" style="padding:0px">
            <div class="col-12 mb-2"><span class="user-name" style="color:${getRandomColor()}; font-weight:bold;">${comment.userName}</span> &nbsp;<span class="time-ago" style="color: #888">${timeAgo(comment.date)}</span></div>
            <div class="h-100 col-12">${comment.comment}</div>
        </div>
    </div>`
})

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
    let color = getRandomNumber(0, 359)
    return `hsl(${color},100%,50%)`
}

function timeAgo(time) {
    let timeNow = new Date().getTime();
    let ago = timeNow - time
    if (ago / 1000 < 60) ago = `${Math.trunc(ago / 1000)} seconds ago`
    else if (ago / 1000 / 60 < 60) ago = `${Math.trunc(ago / 1000 / 60)} minutes ago`
    else if (ago / 1000 / 60 / 60 < 24) ago = `${Math.trunc(ago / 1000 / 60 / 60)} hours ago`
    else if (ago / 1000 / 60 / 60 / 24 < 7) ago = `${Math.trunc(ago / 1000 / 60 / 60 / 24)} days ago`
    else if (ago / 1000 / 60 / 60 / 24 / 7 < 52) ago = `${Math.trunc(ago / 1000 / 60 / 60 / 24 / 7)} weeks ago`
    else ago = `${Math.trunc(ago / 1000 / 60 / 60 / 24 / 7 / 52)} years ago`
    return ago
}




document.querySelector('#title').innerHTML = `${currentLesson.name}`
document.querySelector('#description').innerHTML = `${currentLesson.description}`

currentLesson.timestamps.forEach(timestamp => {
    document.querySelector('#timestamp').innerHTML += `
    <div class="d-flex py-3 clickable" value="${timestamp[1]}">
        <canvas class="timestamp-screen"></canvas>
        <div class="d-flex flex-column justify-content-center ps-3">
            <span class="timestamp-title fs-5">${timestamp[0].lenght > 17 ? timestamp[0].substr(1, 14) : timestamp[0]}</span>
            <span class="timestamp-time fs-6">${Math.trunc(timestamp[1] / 60) < 10 ? (Math.trunc(timestamp[1] % 60) < 10 ? `0${Math.trunc(timestamp[1] / 60)}:0${Math.trunc(timestamp[1] % 60)}` : `0${Math.trunc(timestamp[1] / 60)}:${Math.trunc(timestamp[1] % 60)}`) : (Math.trunc(timestamp[1] % 60) < 10 ? `${Math.trunc(timestamp[1] / 60)}:0${Math.trunc(timestamp[1] % 60)}` : `${Math.trunc(timestamp[1] / 60)}:${Math.trunc(timestamp[1] % 60)}`)}</span>
        </div>
    </div>
    `
})

document.querySelector('#timestamp').querySelectorAll('.clickable').forEach((timestamp) => {
    timestamp.addEventListener('click', () => {
        video.currentTime = +timestamp.getAttribute('value')
    })
})
//
// Functions to do likes and dislikes
document.querySelector('#like').style.color = currentLesson.popularity[0].find(like => like == currentUser.id) ? '#0f0' : "#fff"
document.querySelector('#dislike').style.color = currentLesson.popularity[1].find(dislike => dislike == currentUser.id) ? '#f00' : "#fff"
document.querySelector('#like').addEventListener('click', doLike)
document.querySelector('#dislike').addEventListener('click', doDislike)
function doLike() {
    if (currentLesson.popularity[0].find(like => like = currentUser.id)) {
        currentLesson.popularity[0].splice(currentLesson.popularity.findIndex(like => like = currentUser.id), 1)
        this.style.color = "#fff"
        currentLesson = Lesson.attLesson(currentLesson)
    } else if (currentLesson.popularity[1].find(dislike => dislike = currentUser.id)) {
        currentLesson.popularity[1].splice(currentLesson.popularity.findIndex(dislike => dislike = currentUser.id), 1)
        this.style.color = "#0f0"
        document.querySelector('#dislike').style.color = "#fff"
        currentLesson.popularity[0].push(currentUser.id)
        currentLesson = Lesson.attLesson(currentLesson)
    } else {
        this.style.color = "#0f0"
        currentLesson.popularity[0].push(currentUser.id)
        currentLesson = Lesson.attLesson(currentLesson)
    }
}
function doDislike() {
    if (currentLesson.popularity[1].find(dislike => dislike = currentUser.id)) {
        currentLesson.popularity[1].splice(currentLesson.popularity.findIndex(dislike => dislike = currentUser.id), 1)
        this.style.color = "#fff"
        currentLesson = Lesson.attLesson(currentLesson)
    } else if (currentLesson.popularity[0].find(like => like = currentUser.id)) {
        currentLesson.popularity[0].splice(currentLesson.popularity.findIndex(like => like = currentUser.id), 1)
        this.style.color = "#f00"
        document.querySelector('#like').style.color = "#fff"
        currentLesson.popularity[1].push(currentUser.id)
        currentLesson = Lesson.attLesson(currentLesson)
    } else {
        this.style.color = "#f00"
        currentLesson.popularity[1].push(currentUser.id)
        currentLesson = Lesson.attLesson(currentLesson)
    }
}


document.querySelector('#send-comment').addEventListener('click', () => {
    let comment = document.querySelector('#input-comment').value
    Comments.createCommentOnStorage(currentLesson.id, `${currentUser.first_name} ${currentUser.last_name}`, currentUser.img, comment)
    let div = document.createElement('div')
    div.style.padding = "0px"
    div.className = 'd-flex my-3 justify-content-center'
    div.innerHTML = `
    <div class="px-2"><img src="${currentUser.img}" style="width:80px; border-radius:50%;"></div>
    <div class="w-100 px-3 row" style="padding:0px">
        <div class="col-12 mb-2"><span class="user-name" style="color:#2412ac; font-weight:bold;">${currentUser.first_name} ${currentUser.last_name}</span> &nbsp;<span class="time-ago" style="color: #888">Now</span></div>
        <div class="h-100 col-12">${comment}</div>
    </div>`
    document.querySelector('#comments-list').querySelector('.comments').insertBefore(div, document.querySelector('#comments-list').querySelector('.comments').firstChild);
})







/* Don't work really well, but I don't know how to do better. Because Canvas have some problem when generaty timestamp screens */
let canvasList = document.querySelectorAll(".timestamp-screen");
let video = document.querySelector('#video');
video.currentTime = currentLesson.timestamps[0][1]
let loadingTime = 1
canvasList.forEach((canvas, i) => {
    setTimeout(() => {
        video.currentTime = currentLesson.timestamps[i][1]
        canvas.width = 320;
        canvas.height = 180;
        setTimeout(() => {
            canvas.getContext('2d').drawImage(video, 0, 0, 320, 180);
        }, 100)
    }, 100 * ++loadingTime)
})
window.addEventListener('load', () => {
    setTimeout(() => {
        video.currentTime = 0
        document.querySelector('.load-screen').className += ' fade-out'
        setTimeout(() => {
            document.querySelector('.load-screen').remove()
        }, 500)
    }, 200 * loadingTime)
})
