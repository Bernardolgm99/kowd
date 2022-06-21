import * as Comments from "../models/commentsModel.js"
import * as Lesson from "../models/lessonModel.js"
import * as User from "../models/userModel.js"

let currentUser = JSON.parse(localStorage.getItem('currentUser'))
let currentLesson = JSON.parse(localStorage.getItem('lessons')).find(lesson => lesson.id == Math.trunc(currentUser.currentExercise / 10) % 10)

let comments = []
if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments')).filter(comment => comment.idLessonReference === currentLesson.id)
comments.forEach(comment => {
    document.querySelector('#comments-list').querySelector('.comments').innerHTML += `
    <div class="d-flex my-3 justify-content-center" style="padding:0px">
        <div class="px-2"><img src="${comment.imgUser}" style="width:80px; border-radius:50%;"></div>
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
document.querySelector('#description').innerHTML = `Description:<br><br>${currentLesson.description}`

currentLesson.timestamps.forEach(timestamp => {
    document.querySelector('#timestamp').innerHTML += `
    <div class="d-flex py-3 clickable" value="${timestamp[1]}">
        <canvas class="timestamp-screen m-auto"></canvas>
        <div class="flex-grow-1 d-flex flex-column justify-content-center ps-3">
            <span class="timestamp-title fs-6">${timestamp[0].length > 40 ? `${timestamp[0].substr(0, 40).trim()}...` : timestamp[0]}</span>
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
document.querySelector('#like').style.color = currentLesson.popularity[0].find(like => like == currentUser.id) ? '#0781BC' : "#fff"
document.querySelector('#dislike').style.color = currentLesson.popularity[1].find(dislike => dislike == currentUser.id) ? '#C350DC' : "#fff"
document.querySelector('#like').addEventListener('click', doLike)
document.querySelector('#dislike').addEventListener('click', doDislike)
function doLike() {
    if (currentLesson.popularity[0].find(like => like = currentUser.id)) {
        currentLesson.popularity[0].splice(currentLesson.popularity.findIndex(like => like = currentUser.id), 1)
        this.style.color = "#fff"
        currentLesson = Lesson.attLesson(currentLesson)
    } else if (currentLesson.popularity[1].find(dislike => dislike = currentUser.id)) {
        currentLesson.popularity[1].splice(currentLesson.popularity.findIndex(dislike => dislike = currentUser.id), 1)
        this.style.color = "#0781BC"
        document.querySelector('#dislike').style.color = "#fff"
        currentLesson.popularity[0].push(currentUser.id)
        currentLesson = Lesson.attLesson(currentLesson)
    } else {
        this.style.color = "#0781BC"
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
        this.style.color = "#C350DC"
        document.querySelector('#like').style.color = "#fff"
        currentLesson.popularity[1].push(currentUser.id)
        currentLesson = Lesson.attLesson(currentLesson)
    } else {
        this.style.color = "#C350DC"
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
if (currentLesson.timestamps.length) {
    let canvasList = document.querySelectorAll(".timestamp-screen");
    let video = document.querySelector('#video');
    video.currentTime = currentLesson.timestamps[0][1]
    let loadingTime = 1
    canvasList.forEach((canvas, i) => {
        setTimeout(() => {
            video.currentTime = currentLesson.timestamps[i][1]
            canvas.width = 160;
            canvas.height = 90;
            setTimeout(() => {
                canvas.getContext('2d').drawImage(video, 0, 0, 160, 90);
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
} else {
    document.querySelector('.load-screen').remove()
    document.querySelector('#timestamp').remove()
    document.querySelector('#videoDiv').parentNode.className = "col-xl-12 col-lg-12"
}


document.querySelector('.go_exercise').addEventListener('click', () => {
    if (JSON.parse(localStorage.exercises).find(exercise => exercise.lessonId == currentLesson.id)) {
        localStorage.setItem('currentExercise',JSON.parse(localStorage.exercises).find(exercise => exercise.lessonId == currentLesson.id))
        window.location.href = "/html/exercise.html"
    } else {
        window.location.href = "/html/tutorial.html"
    }
})

document.querySelector('.hide_element').addEventListener('click', () => {
    document.querySelector('.hide_element').parentNode.parentNode.style.display = 'none'
})


// Everything about video player
const timer = document.querySelector('.timer')
const volume_slider = document.querySelector('#volumeSlider')
const volume = document.querySelector("#volume")
const play = document.querySelector('#play')
const fullscreen = document.querySelector('#fullscreen')
const speed = document.querySelector('#speed')
const timer_text = document.querySelector('#timer-text')
const timer_slider_text = document.querySelector('#timer-slider-text')
video.width = 600
const original_width_video = video.width
const video_div = document.querySelector("#videoDiv");
const controler = document.querySelector("#controler")
let video_status = false
const array_speeds = ["1", "1.0", "1.5", "2.0", "0.5", "0.75"]
let duration = ""


//Preload for take some informations
window.addEventListener('load', function () {
    timer.max = `${video.duration * 100}`
    duration = Math.trunc(video.duration / 60) < 10 ? (Math.trunc(video.duration % 60) < 10 ? `0${Math.trunc(video.duration / 60)}:0${Math.trunc(video.duration % 60)}` : `0${Math.trunc(video.duration / 60)}:${Math.trunc(video.duration % 60)}`) : (Math.trunc(video.duration % 60) < 10 ? `${Math.trunc(video.duration / 60)}:0${Math.trunc(video.duration % 60)}` : `${Math.trunc(video.duration / 60)}:${Math.trunc(video.duration % 60)}`)
    timer_text.innerHTML = `00:00/${duration}`
})

// Verify mouse click
let mouseDown = 0;
window.onmousedown = () => {
    ++mouseDown;
}
window.onmouseup = () => {
    --mouseDown;
}

// Update color while playing
video.ontimeupdate = () => {
    if (video.currentTime == video.duration) {
        document.querySelector('.overlay-end').style.display = 'block'
    }
    let x = parseFloat((video.currentTime * 100 / video.duration))
    let color = `linear-gradient(90deg, rgba(255, 136, 0, 1) ${x}%, rgba(0, 0, 0, 0.6) ${x}%)`
    timer.style.background = color
    timer.value = video.currentTime * 100
    let att_timer_text = Math.trunc(video.currentTime / 60) < 10 ? (Math.trunc(video.currentTime % 60) < 10 ? `0${Math.trunc(video.currentTime / 60)}:0${Math.trunc(video.currentTime % 60)}` : `0${Math.trunc(video.currentTime / 60)}:${Math.trunc(video.currentTime % 60)}`) : (Math.trunc(video.currentTime % 60) < 10 ? `${Math.trunc(video.currentTime / 60)}:0${Math.trunc(video.currentTime % 60)}` : `${Math.trunc(video.currentTime / 60)}:${Math.trunc(video.currentTime % 60)}`)
    timer_text.innerHTML = `${att_timer_text}/${duration}`

}

// Timer Slider Functions
timer.addEventListener('mousemove', timerSliderColor)
timer.addEventListener('mouseup', playVideoAfterSlide)
function timerSliderColor() {
    if (mouseDown) {
        let x = parseFloat((timer.value / video.duration))
        let color = `linear-gradient(90deg, rgba(255, 136, 0, 1) ${x}%, rgba(0, 0, 0, 0.6) ${x}%)`
        timer.style.background = color
        video.pause()
    }
}
function playVideoAfterSlide() {
    video.currentTime = timer.value / 100
    if (video_status == true) video.play()
}

// Play Button Functions
video.addEventListener('click', playPause)
play.addEventListener('click', playPause)
function playPause() {
    if (play.innerHTML == 'play_arrow') {
        play.innerText = 'pause';
        video.play();
        video_status = true
    }
    else {
        play.innerText = 'play_arrow';
        video.pause();
        video_status = false
    }
}

// Mute Button Functions
volume.addEventListener('click', muteUnmute)
function muteUnmute() {
    if (volume.innerText == 'volume_up') {
        volume.innerText = 'volume_off';
        video.muted = true;
    }
    else {
        volume.innerText = 'volume_up';
        video.muted = false;
    }
}

// Volume Slider Functions
volume_slider.addEventListener('mousemove', volumeSliderColor)
volume_slider.addEventListener('input', volumeSlider)
function volumeSliderColor() {
    let x = volume_slider.value
    let color = `linear-gradient(90deg, rgba(255, 136, 0, 1) ${x}%, rgba(0, 0, 0, 0.6) ${x}%)`
    volume_slider.style.background = color
}
function volumeSlider() {
    if (video.muted) {
        volume.innerText = 'volume_up'
        video.muted = false
    }
    video.volume = (volume_slider.value / 100)
}

// Speed Button Functions
speed.addEventListener('click', speedChange)
function speedChange() {
    find: {
        for (const num_speed of array_speeds) {
            if (num_speed.substring(0, 3) == speed.innerText.substring(0, 3) && +array_speeds[0] < (array_speeds.length - 1)) {
                speed.innerText = `${array_speeds[+array_speeds[0] + 1]}X`
                video.playbackRate = +array_speeds[+array_speeds[0] + 1]
                array_speeds[0] = `${+array_speeds[0] + 1}`

                break find;
            }
        } // else part after the loop:
        video.playbackRate = +array_speeds[1]
        speed.innerText = `${array_speeds[1]}X`
        array_speeds[0] = "1"
    }
}

// Fullscreen Button Functions
fullscreen.addEventListener('click', openFullscreen)
function openFullscreen() {
    if (fullscreen.innerHTML == "fullscreen") {
        video.width = screen.width
        fullscreen.innerHTML = "fullscreen_exit"
        if (video_div.requestFullscreen) {
            video_div.requestFullscreen();
        } else if (video_div.webkitRequestFullscreen) { /* Safari */
            video_div.webkitRequestFullscreen();
        } else if (video_div.msRequestFullscreen) { /* IE11 */
            video_div.msRequestFullscreen();
        }
    }
    else {
        video.width = original_width_video
        fullscreen.innerHTML = "fullscreen"
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (video_div.webkitCancelFullScreen) { /* Safari */
            video_div.webkitCancelFullScreen();
        } else if (video_div.mozCancelFullScreen) { /* IE11 */
            video_div.mozCancelFullScreen();
        }
    }
}

// Hidde Bar Functions
let timeout_id = 0
video_div.addEventListener('mousemove', appearBar)
video_div.addEventListener('mouseleave', disappearBar)
function appearBar() {
    if (timeout_id) {
        clearTimeout(timeout_id)
        timeout_id = 0
    }
    controler.className = "controler-appear"
    timeout_id = setTimeout(disappearBar, 3000)
}
function disappearBar() {
    controler.className = "controler"
}

// Timeline Timer Text Function
timer.addEventListener('mousemove', textTimeline)
timer.addEventListener('mouseleave', textTimelineHide)
function textTimeline(e) {
    timer_slider_text.style.display = "block"
    let mousePostion = e.pageX - video_div.offsetLeft;
    let percentDiv = mousePostion / video_div.offsetWidth
    let seconds = video.duration * percentDiv
    let att_timer_text = Math.trunc(seconds / 60) < 10 ? (Math.trunc(seconds % 60) < 10 ? `0${Math.trunc(seconds / 60)}:0${Math.trunc(seconds % 60)}` : `0${Math.trunc(seconds / 60)}:${Math.trunc(seconds % 60)}`) : (Math.trunc(seconds % 60) < 10 ? `${Math.trunc(seconds / 60)}:0${Math.trunc(seconds % 60)}` : `${Math.trunc(seconds / 60)}:${Math.trunc(seconds % 60)}`)
    timer_slider_text.innerHTML = `${att_timer_text}`
    timer_slider_text.style.left = mousePostion < (video_div.offsetWidth - 20) ?
        (mousePostion > 19 ? `${mousePostion - (timer_slider_text.offsetWidth / 2)}px` : `8px`) : `${video_div.offsetWidth - 30}px`

}
function textTimelineHide() {
    timer_slider_text.style.display = "none"
}

// Keyboard Functions
document.addEventListener('keydown', e => {
    const tag_name = document.activeElement.tagName.toLowerCase()
    if (tag_name === 'textarea' || tag_name === 'input') return

    switch (e.key.toLowerCase()) {
        case " ":
            if (tag_name === 'button') return
        case "k":
            playPause()
            break
        case "f":
            openFullscreen()
            break
        case "m":
            muteUnmute()
            break
        case "d":
            speedChange()
            break
        case "j":
            return10Second()
            break
        case "arrowleft":
            return5Second()
            break
        case "l":
            jump10Second()
            break
        case "arrowright":
            jump5Second()
            break
    }
})

// Jumps Functions
function jump10Second() {
    appearBar()
    video.currentTime += 10
}
function return10Second() {
    appearBar()
    video.currentTime -= 10
}
function jump5Second() {
    appearBar()
    video.currentTime += 5
}
function return5Second() {
    appearBar()
    video.currentTime -= 5
}