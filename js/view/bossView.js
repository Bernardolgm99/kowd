let currentUser = JSON.parse(localStorage.getItem('currentUser'))

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
let songs = [`Bad Time Piggies`, `Ghost Fight`, `Spider Dance`, `Undertale - Megalovania`]

//BOSS IMAGES
let img = [`/media/img/queen_boss.png`, `/media/img/mage_boss.png`, `/media/img/white_dragon.png`]

//BOSS NAMES
let names = [`White Claw`, `Osmond`, `Valtan`]


let randomNumberQuote = parseInt((Math.random() * 10)) 
let randomNumberBossAndSong = parseInt((Math.random() * 3))
let randomNumberEasterEgg = parseInt((Math.random() * 100) + 1)
if((currentUser.first_name).toLowerCase() == 'papyrus'){
    randomNumberEasterEgg = 42
}

if(randomNumberBossAndSong == 0){
    document.querySelector('#bossImg').height = '300' 
}

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

function audio(randomNumberSong) {
    let audio = new Audio(`/media/audio/${songs[randomNumberSong]}.mp3`);
     audio.play();
    audio.volume = 0.05
    audio.loop = true
}

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
}

document.querySelector('#btnBag').addEventListener('click', () => {
    document.querySelector('#bagItems').style.display = 'block'
})

document.querySelector('.material-symbols-outlined').addEventListener('click', () => {
    document.querySelector('#bagItems').style.display = 'none'
})
