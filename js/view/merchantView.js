import * as User from "../models/userModel.js"
import * as Base from "../base.js"
let currentUser = JSON.parse(localStorage.getItem('currentUser'))
let itemArray = JSON.parse(localStorage.getItem('items'))
if (!(localStorage.getItem('currentUser'))) window.location.href = "../../html/login.html"

/* text wright missing */

//render points
function renderPoints() {
    let pointPlace = document.querySelector('.points')
    pointPlace.innerHTML = `<p>${currentUser.point} points</p>`
}

//merchantLines
function typeWriter(element){
    const textArray = element.innerText.split('');
    element.innerHTML = ''
    textArray.forEach((letter, i) => {
        setTimeout(() =>{
            element.innerHTML += letter
        }, 75*i)
    })
}

function merchantLines(value){
    let merchantLinePlace = document.querySelector('.merchantLines')
    if (value == 0) {
        let linesArray = [`Hello ${currentUser.first_name}, you can take anything as long as you have enough coins.`,`I see that you are interesed in my wares`,`Welcome back ${currentUser.first_name}, I'm glad to see you well once more, please take anything you want.`]
            merchantLinePlace.innerHTML = `<p>${linesArray[Math.floor(Math.random() * linesArray.length)]}</p>`
    } else if(value == 1){
        merchantLinePlace.innerHTML = `<p>Come on, you and I both know you don't have enougth coins for that</p>`
    } else if(value == 2){
        merchantLinePlace.innerHTML = `<p>Come on... You already have that item in the bag, didn't you notice?</p>`
    } else {
        merchantLinePlace.innerHTML = `<p>What a great purchase you made today, buy anything that you want</p>`
    }
    typeWriter(document.querySelector('.merchantLines'))

}
merchantLines(0)
//create list
renderShop()
function renderShop() {
    let shop = document.querySelector('.shop')
    shop.innerHTML = ``
    if ((currentUser.bag).length > 0) {
        for (let itens of itemArray) {
            find: {
                for(let item of currentUser.bag){
                    if (item == itens.id) {
                        shop.innerHTML += `
                            <div class="row shopItem mb-3">
                                <div class="col-2 img"><img src="${itens.img}"></div>
                                <div class="col-7 d-flex flex-column txt">
                                    <p class="txt-large">${itens.name}</p>
                                    <p class="txt-small">${itens.description}</p>
                                </div>
                                <div class="col-3 butao"><button class="item sold txt-small" id="${itens.id}">SOLD!</button></div>     
                                </div>
                                <div class="hr"></div>
                            `
                        break find
                    }
                }
                console.log(itens.img)
                shop.innerHTML += `
                <div class="row shopItem mb-3">
                    <div class="col-2 img"><img src="${itens.img}"></div>
                    <div class="col-7 d-flex flex-column txt">
                        <p class="txt-large">${itens.name}</p>
                        <p class="txt-small">${itens.description}</p>
                    </div>
                    <div class="col-3 butao"><button class="item sold txt-small" id="${itens.id}">${itens.value} | Buy</button></div>
                    </div>
                    <div class="hr"></div>
                `
            }
        }
    }

    else {
        for (let itens of itemArray) {
            shop.innerHTML += `
                <div class="row shopItem mb-3">
                    <div class="col-2 img"><img src="${itens.img}"></div>
                    <div class="col-7 d-flex flex-column txt">
                        <p class="txt-large">${itens.name}</p>
                        <p class="txt-small">${itens.description}</p>
                    </div>
                    <div class="col-3 butao"><button class="item sold txt-small" id="${itens.id}">${itens.value} | Buy</button></div>
                    </div>
                    <div class="hr"></div>
                `
        }

    }
    renderBtn()
    renderPoints()
}

function renderBtn() {
    let btns = document.querySelectorAll('.item')
    btns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault()
            let itemShop = itemArray[event.target.id - 1]
            //console.log(itemShop)
            //check bought
            //console.log((currentUser.bag).length)
            if ((currentUser.bag).length > 0) {
                console.log(currentUser.point)
                if ((currentUser.bag.find(item => item == itemShop.id)) == undefined && currentUser.point >= itemShop.value) {
                    (currentUser.bag).push(itemShop.id)
                    currentUser.point = currentUser.point - itemShop.value
                    merchantLines(3)
                    
                    //update inlocalstorage UserBag
                } else if((currentUser.bag.find(item => item == itemShop.id))) {
                    merchantLines(2)
                } else {
                    merchantLines(1)
                }
            } else {
                if(currentUser.point >= itemShop.value){
                    (currentUser.bag).push(itemShop.id)
                } else {
                    merchantLines(1)
                }
            }
            //organiza e atualiza no currentUser e na lista de Users as compras feitas
            (currentUser.bag).sort()
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
            User.attUserOnStorage(currentUser)
            renderShop()
            renderPoints()
        })
    })
}