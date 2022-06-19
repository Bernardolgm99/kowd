let randomNumber = parseInt((Math.random() * 3)+1) 
randomNumber = 1
console.log(randomNumber)

if(randomNumber == 1){
    document.querySelector('#txtmessage').innerHTML = `You dare to aproach me, you miserable mortal? ADBADJASBDKJBAKSDBALKDBASBDSDFGHFDSHDFHCome then and face the wrath of a God`
    writer(document.querySelector('#txtmessage')) 
}

audio()

function audio() {
    let audio = new Audio('/media/audio/Caravan Palace - Wonderland.mp3');
     audio.play();
    audio.volume = 0.05
}

function writer(element) {
    const textArray = element.innerHTML.split('');
    element.innerHTML = ''
    textArray.forEach((letter, i) => {
        setTimeout(() =>{
            element.innerHTML += letter
        }, 75*i)
    })
}

