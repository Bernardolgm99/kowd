import * as User from "../models/userModel.js";

let currentUser = JSON.parse(localStorage.getItem('currentUser'))
let items = JSON.parse(localStorage.getItem('items'))
let currentModule = JSON.parse(localStorage.getItem('currentModule'));

//VARIABLES
let audioPlayer
let i = 0
let healthBoss = 100
let healthUser = 100
let amountOfHealthBoss = 100 / currentModule.boss_question.length
let amountOfHealthUser = 100 / currentModule.boss_question.length
let bag = []

//QUOTES
let quotes = [`You dare to aproach me, you miserable mortal?                Come then and face the wrath of a God!`, 
`Come for a fight?               Oh, you should have dressed for a funeral.`, 
`A God chooses, a slave obeys.               Now would you kindly?`, 
`Your entire life has been a mathematical error...       A mathematical error I'm about to correct!`,  
`It could only ever come to this.`,
`I know who your master once was...           Daniel was his name...               our battle will be legendary!`,
`Foolish human! You dare to oppose me?             I am a force far greater than you could imagine!            The cosmos themselves bend to my will!             Feel their wrath, pathetic insect!`,
`I used to be an adventurer like you             , until I took an arrow to the knee.`,
`Sometimes I cried with my best friend Mario....        I miss coding with you, every single day of my life...`,
`Oh! You're aproaching me.`]

//RESPONSE TO QUOTES
let quoteAnswers = [
    `Let's see what you got.`, 
    `I don't know about that one chief...`, 
    ``,
    `What the hell are you talking about?           I didn't even passed math.`,
    `Not if you give me the answers`,
    `Legendary is his name!`,
    `Just shut up already.`,
    ``,
    `You don't deserve his friendship.`,
    `DIOOOOOOOOOOOOO!`
]

//DISCLAIMER:
//WE DON'T OWN ANY SONG, MOST OF THE SONGS BELONG TO TOBY FOX, PLEASE GO AND SUPPORT HIM
let songs = [`Bad Time Piggies`, `Ghost Fight`, `Spider Dance`, `Undertale - Megalovania`, `Undertale Game Over`, `Final Fantasy Victory Fanfare - Sound Effect`]

//BOSS IMAGES
let img = [`/media/img/queen_boss.png`, `/media/img/mage_boss.png`, `/media/img/white_dragon.png`]

//BOSS NAMES
let names = [`White Claw`, `Osmond`, `Valtan`]

//RANDOM NUMBERS FOR THE BOSSES "SPAWN" PROBABILITIES
let randomNumberQuote = parseInt((Math.random() * 10)) 
let randomNumberBossAndSong = parseInt((Math.random() * 3))
let randomNumberEasterEgg = parseInt((Math.random() * 100) + 1)

//EASTER EGG, IF YOUR NAME IS PAPYRUS THE BOSS WILL BE, AUTOMATICALLY, SANS
if((currentUser.first_name).toLowerCase() == 'papyrus'){
    randomNumberEasterEgg = 42
}

//IF CICLE FOR THE BOSS "SPAWN" PROBABILITIES
if(randomNumberEasterEgg != 42){
    document.querySelector('#bossImg').src = img[randomNumberBossAndSong]
    document.querySelector('#bossName').innerHTML = names[randomNumberBossAndSong]
    audio(randomNumberBossAndSong)

    document.querySelector('#txtBossMessage').innerHTML = quotes[randomNumberQuote]
    document.querySelector('#txtUserMessage').innerHTML = quoteAnswers[randomNumberQuote]
    writer(document.querySelector('#txtBossMessage'), document.querySelector('#txtUserMessage'))

} else {
    document.querySelector('#bossImg').src = '/media/img/sans.webp'
    document.querySelector('#bossName').innerHTML = 'SANS'
    audio(3)

    document.querySelector('#txtBossMessage').innerHTML = 'HEH  HEH  HEH,     hello kiddo.            '
    document.querySelector('#txtUserMessage').innerHTML = 'S-SANS???'
    writer(document.querySelector('#txtBossMessage'), document.querySelector('#txtUserMessage'))
}

//FUNCTION TO PLAY AUDIO
function audio(randomNumberSong) {

    audioPlayer = new Audio(`/media/audio/${songs[randomNumberSong]}.mp3`);
    audioPlayer.play();
    audioPlayer.volume = 0.05
    audioPlayer.loop = true
    
}

//FUNCTION TO WRITE A SINGLE LETTER PER WORD
function writer(element, element2) {
    const textArray = element.innerHTML.split('');
    const textArray2 = element2.innerHTML.split('');
    element.innerHTML = ''
    let i = 0
    textArray.forEach((letter) => {
        setTimeout(() =>{
            element.innerHTML += letter
        }, 75*i++)
    })
    element2.innerHTML = ''
    textArray2.forEach((letter) => {
        setTimeout(() =>{
            element2.innerHTML += letter
        }, 75*i++)
    })
    setTimeout(() => {document.querySelector('#skip').style.display = 'block'}, 83*i)
}

//PLAYER NAME
document.querySelector('#userName').innerHTML = currentUser.first_name + " " + currentUser.last_name

//CREATE "BAG" TO SHOW THE ITEMS
currentUser.bag.forEach(userItem => {
    let userItems = items.find(item => item.id == userItem) 
    if(userItems != undefined){
        bag.push(userItems)
    }
})

console.log(bag)

bag.forEach(item => {
    document.querySelector('#items').innerHTML += `<div class="itemRow row my-5" id="itemRow${item.id}">
    <div class="itemImg col-2"><img src="${item.img}" width="80"></div>
    <div class="itemName col-2">${item.name}</div>
    <div class="itemDescription col-7">${item.description}</div>
    </div>`
})


//FUNCTION THAT OPENS THE ITEM BAG
document.querySelector('#btnBag').addEventListener('click', () => {
    document.querySelector('#bagItems').style.display = 'block'
})

//FUNCTION THAT CLOSES THE ITEM BAG
document.querySelector('#closeBtn').addEventListener('click', () => {
    document.querySelector('#bagItems').style.display = 'none'
})

//FUNCTION TO SKIP
document.querySelector('#skipBtn').addEventListener('click', () => {

    bossQuestions(0)

})

//FUNCTION THAT MAKES THE QUESTION 
function bossQuestions(length){
    document.querySelector('#skip').innerHTML = ''
    
    document.querySelector('#txtBossMessage').innerHTML = ""
    
    document.querySelector('#txtUserMessage').innerHTML = `<input type="text" id="txtInputUser">`
    document.querySelector('#txtUserMessage').innerHTML += `<button id="btnInputUser">ANSWER</button>`

    document.querySelector('#txtBossMessage').innerHTML = currentModule.boss_question[length][0].replace(/\n/g,"<br>")
    
    eventCreate()
}

//REPLAY ON AUDIO
function audioEnd(randomNumberSong) {

    audioPlayer.pause();
    let audio = new Audio(`/media/audio/${songs[randomNumberSong]}.mp3`);
    audio.play();
    audio.volume = 0.05
    audio.loop = true
}

//FUCNTON TO REDUCE THE HEALTH BAR
function eventCreate(){
    document.querySelector('#btnInputUser').addEventListener('click', () => {
        
        //CICLE THAT WILL REPEAT UNTIL THE CODE IS OUT OF QUESTIONS
        if(document.querySelector('#txtInputUser').value == currentModule.boss_question[i][1]){
            healthBoss = healthBoss - amountOfHealthBoss
            document.querySelector('#healthBossNormal').style.width = `${healthBoss}%`
            i++
            //IF THE CICLE IS LOWER THAN THE QUESTIONS, IT WILL REPEAT THE CICLE, ELSE, IT ENDS
            if(i < (currentModule.boss_question.length)){
                bossQuestions(i)
            //IF THE BOSS HEALTH IS AT 0, THE USER WILL GAIN POINTS    
            } else {
                document.querySelector('#skip').innerHTML = 'YOU WON! YOU WILL GAIN 1000 POINTS'
                document.getElementById('skip').style.animation = 'RGB 1s linear infinite'
                audioEnd(5)
                currentUser.point += 1000
                if (!currentUser.achievements.find(egg => egg == 6)) {
                    currentUser.achievements.push(6)
                }
                User.attUserOnStorage(currentUser)
                localStorage.setItem('currentUser', JSON.stringify(currentUser))
                setTimeout(() => {window.location.href = "./tutorial.html"},5000)
            }
        } else {
            healthUser = healthUser - amountOfHealthUser
            document.querySelector('#healthUserNormal').style.width = `${healthUser}%`
            //IF THE USER HEALTH IS AT 0, THE USER WILL LOSE POINTS
            if(document.querySelector('#healthUserNormal').style.width == '0%'){

                document.querySelector('#skip').innerText = 'YOU L      O      S      T! YOU WILL LOSE 100 POINTS'
                document.querySelector('#skip').style.color = 'red'
                audioEnd(4)
                currentUser.point -= 100
                setTimeout(() => {window.location.href = "./tutorial.html"},5000)
            }
        }
    })
}

//ITEM SECTION 
bag.forEach(item => {

    //USER TAKES LESS DAMAGE
    if(item.id == 1){
        amountOfHealthUser = amountOfHealthUser / 2

    //USER STARTS HALF HP BUT CAN KILL THE BOSS IN ONE-HIT
    } else if(item.id == 2){
        amountOfHealthBoss = amountOfHealthBoss
        healthUser = 50
        document.querySelector('#healthUserNormal').style.width = `${healthUser}%`

    //USER DEALS MORE DAMAGE
    } else if(item.id == 3){
        amountOfHealthBoss = amountOfHealthBoss * 1.5

    //BOSS STARTS WITH HALF OF IT'S HEALTH
    } else {
        healthBoss = 50
        document.querySelector('#healthBossNormal').style.width = `${healthBoss}%`
    }
})
