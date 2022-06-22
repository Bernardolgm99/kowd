let current_lesson = document.querySelector('#current-lesson')
let achievements = document.querySelector('#achievements')
let leaderboard = document.querySelector('#leaderboard')
/* 
currentUser.easteregg = [0]
localStorage.setItem('currentUser', JSON.stringify(currentUser)) */

//Tutorial Region
current_lesson.querySelector('.lesson-div').innerHTML = `
<span class="lesson-text">
${currentUser.currentExercise % 10 == 0 ?
        `function current(){<br>Lesson = ${Math.trunc(currentUser.currentExercise/10)%10};<br>}` :
        `function current(){<br>Lesson = ${Math.trunc(currentUser.currentExercise/10)%10};<br>Exercise = ${currentUser.currentExercise % 10};<br>}`
    }
</span>
`
current_lesson.querySelector('.lesson-div').addEventListener('click', () =>{
    if (current_lesson.querySelector('.lesson-div').innerText.search(/Exercise/)>0){
        let currentExercise = JSON.parse(localStorage.getItem('exercises')).find(exercise => exercise.id == currentUser.currentExercise%10)
        localStorage.setItem('currentExercise', JSON.stringify(currentExercise))
        window.location.href = "/html/exercise.html"
    } else {
        let currentLesson = JSON.parse(localStorage.getItem('lessons')).filter(lesson => lesson.idModule == Math.trunc(currentUser.currentExercise/100))
        currentLesson = currentLesson[Math.trunc(currentUser.currentExercise/10)%10-1]
        localStorage.setItem('currentLesson', JSON.stringify(currentLesson))
        window.location.href = "/html/lesson.html"
    }
})



// Achivement Region
let achievementList = [1, 2, 3, 4, 5, 6]
achievementList.forEach(achievement => {
    if (!currentUser.achievements.find(achieveMent => achieveMent == achievement)) {
        achievements.querySelector('.achievements-list').innerHTML += `
        <div class="achievement mx-2">
            <button class="achievement-img">
                <img src="../media/img/achivement${achievement}.png" height="200px" width="200px">
            </button>
            <div class="block"><span class="material-symbols-outlined">lock</span></div>
        </div>
        `
    } else {
        achievements.querySelector('.achievements-list').innerHTML += `
        <div class="achievement mx-2">
            <button class="achievement-img" id="${achievement}">
                <img src="../media/img/achivement${achievement}.png" height="200px" width="200px">
            </button>
        </div>
        `
    }
})
document.querySelectorAll('.achievement-img').forEach(achievement => {
    achievement.addEventListener('click', () => {
        document.querySelector('.fullscreen').style.display = 'block'
        document.querySelector('.fullscreen').querySelector('img').src = achievement.querySelector('img').src
        document.querySelector('.fullscreen')
    })
})
document.querySelector('.fullscreen').querySelector('button').addEventListener('click',()=> {
    document.querySelector('.fullscreen').style.display = 'none'
})
achievements.querySelector('#info1').innerHTML = currentUser.achievements.length
achievements.querySelector('#info2').innerHTML = achievementList.length - currentUser.achievements.length 
achievements.querySelector('#info3').innerHTML = `${(currentUser.achievements.length/achievementList.length*100).toFixed(1)}%` 



// Leaderboard Region
let users = JSON.parse(localStorage.getItem('users'))
users.sort((userA, userB) => {
    return userB.point - userA.point
})
users = users.filter(user => user.type == 0)
let max_point = users[0].point
users.forEach((user,i) => {
    leaderboard.querySelector('tbody').innerHTML += `
    <tr>
    <td>${i+1}</td>
    <td><img src="${user.img}"></td>
    <td>${user.first_name} ${user.last_name}</td>
    <td class="score"><span class="point-bar" style="width:${user.point/max_point*80}%"></span><span class="point_score">${user.point}</span></td>
    </tr>
    `
})