function typeWriter(element){
    const textArray = element.innerHTML.split('');
    element.innerHTML = ''
    textArray.forEach((letter, i) => {
        setTimeout(() =>{
            element.innerHTML += letter
        }, 75*i)
    })
}

let title = document.querySelector('.type-writer')

console.log(title.parentNode);
console.log(title.parentNode.offsetHeight);

title.parentNode.height = title.parentNode.offsetHeight;

typeWriter(title)