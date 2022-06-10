const timer = document.querySelector('.timer')
const volume_slider = document.querySelector('#volumeSlider')
const volume = document.querySelector("#volume")
const play = document.querySelector('#play')
const fullscreen = document.querySelector('#fullscreen')
const speed = document.querySelector('#speed')
const video = document.querySelector("#video");
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
    let spots = video_div.offsetWidth / video.duration
    let seconds = Math.trunc(mousePostion / spots)
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
    console.log(e.key);
    if (tag_name === 'input') return

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